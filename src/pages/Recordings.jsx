import { useState } from 'react';
import { useRecordings } from '../context/RecordingsContext';
import './Recordings.css';
import './RecordingsExtras.css';

const Recordings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const { recordings, setRecordings, removeRecording } = useRecordings();

  // Subject options for filtering
  const subjects = ['all', 'Artificial Intelligence', 'Python Programming', 'Machine Learning', 'Data Science'];

  // Handle adding new recording
  const handleAddRecording = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Get form values
    const videoUrl = formData.get('videoUrl');
    let thumbnailUrl = "https://placehold.co/600x400/png";
    let videoId = null;
    let isYouTube = false;
    
    // Check if it's a YouTube URL and extract video ID and thumbnail
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = videoUrl.match(youtubeRegex);
    
    if (match && match[1]) {
      videoId = match[1];
      thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      isYouTube = true;
    }
    
    const newRecording = {
      id: Date.now(), // More unique than incrementing length
      title: formData.get('title'),
      subject: formData.get('subject'),
      duration: formData.get('duration'),
      instructor: formData.get('instructor'),
      date: new Date().toISOString().split('T')[0],
      description: formData.get('description'),
      thumbnailUrl: thumbnailUrl,
      videoUrl: isYouTube ? `https://www.youtube.com/embed/${videoId}` : videoUrl,
      videoId: videoId,
      isYouTube: isYouTube,
      downloads: 0,
      views: 0
    };
    
    setRecordings([...recordings, newRecording]);
    setShowAddForm(false);
  };

  // Handle video playback
  const handlePlayVideo = (recording) => {
    setSelectedVideo(recording);
    // Update views count
    const updatedRecordings = recordings.map(r => {
      if (r.id === recording.id) {
        return { ...r, views: r.views + 1 };
      }
      return r;
    });
    setRecordings(updatedRecordings);
  };

  // Handle video download
  const handleDownload = (recording) => {
    // Check if it's a YouTube video
    if (recording.isYouTube) {
      // For YouTube videos, we direct to a download service or show a message
      alert(`For YouTube videos, please use a YouTube download service or watch online.`);
      return;
    }
    
    try {
      // For direct video URLs
      console.log(`Downloading: ${recording.title}`);
      const link = document.createElement('a');
      link.href = recording.videoUrl;
      link.download = `${recording.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Update download count
      const updatedRecordings = recordings.map(r => {
        if (r.id === recording.id) {
          return { ...r, downloads: r.downloads + 1 };
        }
        return r;
      });
      setRecordings(updatedRecordings);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download the video. Please try again later.");
    }
  };

  // Filter recordings based on search term and selected subject
  const filteredRecordings = recordings.filter(recording => {
    // Case-insensitive search in title, description and instructor
    const matchesSearch = searchTerm === '' || 
                          recording.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recording.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recording.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Match subject filter
    const matchesSubject = selectedSubject === 'all' || 
                          recording.subject.toLowerCase() === selectedSubject.toLowerCase();
    
    return matchesSearch && matchesSubject;
  });

  // Format duration for display
  const formatDuration = (duration) => {
    if (!duration) return "00:00";
    
    // If already in HH:MM:SS format, return as is
    if (/^\d+:\d{2}:\d{2}$/.test(duration)) {
      return duration;
    }
    
    // If it's in seconds, convert to HH:MM:SS
    try {
      if (typeof duration === 'number' || !isNaN(Number(duration))) {
        const totalSeconds = Number(duration);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);
        
        return [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0')
        ].join(':');
      }
    } catch (e) {
      console.error("Error formatting duration:", e);
    }
    
    // If all else fails, return as is
    return duration;
  };

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="recordings-container">
      <div className="recordings-header">
        <div className="header-content">
          <h1>Class Recordings</h1>
          <p>Access all recorded lectures and sessions</p>
        </div>
        <button 
          className="add-recording-btn"
          onClick={() => setShowAddForm(true)}
        >
          <i className="fas fa-plus"></i> Add Recording
        </button>
      </div>

      <div className="recordings-tabs">
        <button 
          className="tab active"
        >
          All Recordings
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search recordings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="subject-filter"
        >
          {subjects.map(subject => (
            <option key={subject} value={subject}>
              {subject === 'all' ? 'All Subjects' : subject}
            </option>
          ))}
        </select>
      </div>

      {filteredRecordings.length > 0 ? (
        <div className="recordings-grid">
          {filteredRecordings.map(recording => (
            <div key={recording.id} className="recording-card">
              <div className="recording-thumbnail">
                <img src={recording.thumbnailUrl} alt={recording.title} />
                <span className="duration">{formatDuration(recording.duration)}</span>
              </div>
              <div className="recording-content">
                <h3>{recording.title}</h3>
                <p className="description">{recording.description}</p>
                <div className="recording-meta">
                  <span><i className="fas fa-user"></i> {recording.instructor}</span>
                  <span><i className="fas fa-calendar"></i> {formatDate(recording.date)}</span>
                  <span><i className="fas fa-tag"></i> {recording.subject}</span>
                </div>
                <div className="recording-stats">
                  <span><i className="fas fa-eye"></i> {recording.views} views</span>
                  <span><i className="fas fa-download"></i> {recording.downloads} downloads</span>
                </div>
                <div className="recording-actions">
                  <button 
                    className="action-btn watch-btn"
                    onClick={() => handlePlayVideo(recording)}
                  >
                    <i className="fas fa-play"></i> Watch Now
                  </button>
                  <button 
                    className="action-btn download-btn"
                    onClick={() => handleDownload(recording)}
                  >
                    <i className="fas fa-download"></i> Download
                  </button>
                  <button 
                    className="action-btn remove-btn"
                    onClick={() => setShowConfirmDelete(recording)}
                  >
                    <i className="fas fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-recordings">
          <h3>No recordings found</h3>
          {selectedSubject !== 'all' || searchTerm !== '' ? (
            <p>Try changing your search or filter settings</p>
          ) : (
            <p>Start by adding your first class recording</p>
          )}
          <button 
            className="add-first-recording" 
            onClick={() => setShowAddForm(true)}
          >
            <i className="fas fa-plus"></i> Add New Recording
          </button>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showConfirmDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Confirm Removal</h2>
              <button 
                className="close-btn"
                onClick={() => setShowConfirmDelete(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to remove "{showConfirmDelete.title}" from your recordings?</p>
              <div className="modal-actions">
                <button 
                  className="confirm-btn"
                  onClick={() => {
                    removeRecording(showConfirmDelete.id);
                    setShowConfirmDelete(null);
                  }}
                >
                  Remove Recording
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => setShowConfirmDelete(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Recording Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Recording</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddRecording}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter recording title"
                  required
                  minLength="3"
                  maxLength="100"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject" required defaultValue="">
                  <option value="" disabled>Select a subject</option>
                  {subjects.filter(subject => subject !== 'all').map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  placeholder="HH:MM:SS"
                  required
                  pattern="[0-9]+:[0-5][0-9]:[0-5][0-9]"
                  title="Please use format HH:MM:SS (e.g., 01:30:45)"
                />
                <small className="form-hint">Format: hours:minutes:seconds (e.g., 01:30:45)</small>
              </div>
              <div className="form-group">
                <label htmlFor="instructor">Instructor</label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  placeholder="Enter instructor name"
                  required
                  minLength="2"
                  maxLength="50"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter recording description"
                  required
                  minLength="10"
                  maxLength="500"
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label htmlFor="videoUrl">Video URL</label>
                <input
                  type="url"
                  id="videoUrl"
                  name="videoUrl"
                  placeholder="Enter YouTube or direct video URL"
                  required
                />
                <small className="form-hint">Paste a YouTube or direct MP4 video URL</small>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Add Recording
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="video-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedVideo.title}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedVideo(null)}
              >
                ×
              </button>
            </div>
            <div className="video-container">
              {selectedVideo.isYouTube ? (
                <iframe
                  width="100%"
                  height="500"
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  width="100%"
                  height="500"
                  controls
                  autoPlay
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div className="video-info">
              <p className="video-description">{selectedVideo.description}</p>
              <div className="video-meta">
                <span><i className="fas fa-user"></i> {selectedVideo.instructor}</span>
                <span><i className="fas fa-eye"></i> {selectedVideo.views} views</span>
                <span><i className="fas fa-download"></i> {selectedVideo.downloads} downloads</span>
                <span><i className="fas fa-tag"></i> {selectedVideo.subject}</span>
              </div>
              <div className="video-actions">
                <button 
                  className="action-btn download-btn"
                  onClick={() => {
                    handleDownload(selectedVideo);
                  }}
                >
                  <i className="fas fa-download"></i> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recordings;
