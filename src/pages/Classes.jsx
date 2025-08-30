import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecordings } from '../context/RecordingsContext';
import './Classes.css';

const Classes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('upcoming');
  const { addRecording } = useRecordings();

  const handleJoin = (classData) => {
    // Add to recordings
    addRecording(classData);
    // Navigate to recordings page
    navigate('/recordings');
  };

  // Mock data for upcoming classes
  const [upcomingClasses] = useState([
    {
      id: 1,
      subject: 'Artificial Intelligence',
      topic: 'Next.js and OpenAI Integration',
      date: '2025-08-30',
      time: '2:00 PM',
      teacher: 'JavaScript Mastery',
      duration: '2 hours',
      joinLink: '#',
      videoPreview: {
        thumbnailUrl: 'https://img.youtube.com/vi/JMUxmLyrhSk/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/JMUxmLyrhSk',
        videoId: 'JMUxmLyrhSk'
      },
      description: 'Learn how to integrate AI capabilities into web applications. Build an AI-powered Next.js application with OpenAI integration, chatbots, and intelligent features.'
    },
    {
      id: 2,
      subject: 'Machine Learning',
      topic: 'Machine Learning with Python',
      date: '2025-08-31',
      time: '2:00 PM',
      teacher: '6 Pack Programmer',
      duration: '2 hours',
      joinLink: '#',
      videoPreview: {
        thumbnailUrl: 'https://img.youtube.com/vi/i_LwzRVP7bg/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg',
        videoId: 'i_LwzRVP7bg'
      },
      description: 'Dive into Machine Learning with Python. Learn data preprocessing, model training, evaluation, and implement popular ML algorithms for real-world applications.'
    },
    {
      id: 3,
      subject: 'Node.js',
      topic: 'Complete Node.js Backend Development',
      date: '2025-09-01',
      time: '2:00 PM',
      teacher: 'JavaScript Mastery',
      duration: '3 hours',
      joinLink: '#',
      videoPreview: {
        thumbnailUrl: 'https://img.youtube.com/vi/f2EqECiTBL8/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/f2EqECiTBL8',
        videoId: 'f2EqECiTBL8'
      },
      description: 'Master Node.js from basics to advanced concepts. Learn about modules, file system, streams, and building scalable backend applications.'
    },
    {
      id: 4,
      subject: 'Express.js',
      topic: 'Express.js Crash Course',
      date: '2025-09-02',
      time: '10:00 AM',
      teacher: 'Traversy Media',
      duration: '2.5 hours',
      joinLink: '#',
      videoPreview: {
        thumbnailUrl: 'https://img.youtube.com/vi/SccSCuHhOw0/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/SccSCuHhOw0',
        videoId: 'SccSCuHhOw0'
      },
      description: 'Learn Express.js framework for building web applications and APIs. Cover routing, middleware, error handling, and MongoDB integration.'
    },
    {
      id: 5,
      subject: 'MERN Stack',
      topic: 'Full Stack Development with MERN',
      date: '2025-09-03',
      time: '2:00 PM',
      teacher: 'Coding with Basir',
      duration: '2.5 hours',
      joinLink: '#',
      videoPreview: {
        thumbnailUrl: 'https://img.youtube.com/vi/k4mjF4sPITE/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/k4mjF4sPITE',
        videoId: 'k4mjF4sPITE'
      },
      description: 'Build a complete web application using MongoDB, Express.js, React, and Node.js. Learn full-stack development with real-world projects.'
    },
    {
      id: 4,
      subject: 'Data Structures',
      topic: 'Binary Search Trees',
      date: '2025-09-02',
      time: '11:00 AM',
      teacher: 'Dr. Emily Brown',
      duration: '1.5 hours',
      joinLink: '#'
    }
  ]);

  // Mock data for past classes
  const [pastClasses] = useState([
    {
      id: 1,
      subject: 'React Fundamentals',
      topic: 'Component Lifecycle',
      date: '2025-08-28',
      teacher: 'Dr. Sarah Johnson',
      recordingId: 'rec123'
    },
    {
      id: 2,
      subject: 'Web Development',
      topic: 'Authentication & Authorization',
      date: '2025-08-27',
      teacher: 'Prof. Michael Chen',
      recordingId: 'rec456'
    },
    {
      id: 3,
      subject: 'Data Structures',
      topic: 'Hash Tables',
      date: '2025-08-26',
      teacher: 'Dr. Emily Brown',
      recordingId: 'rec789'
    }
  ]);

  // Filter classes based on search term
  const filteredUpcomingClasses = upcomingClasses.filter(cls =>
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPastClasses = pastClasses.filter(cls =>
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date to readable string
  const formatDate = (date, includeTime = false) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return includeTime ? `${formattedDate}` : formattedDate;
  };

  return (
    <div className="classes-container">
      <header className="classes-header">
        <div className="header-content">
          <h1>Classes</h1>
          <p>Join live classes and access past sessions</p>
        </div>
      </header>

      <div className="classes-controls">
        <input
          type="text"
          placeholder="Search by subject or teacher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="upcoming">Upcoming Classes</option>
          <option value="past">Past Classes</option>
        </select>
      </div>

      {filter === 'upcoming' && (
        <div className="classes-section">
          <h2>Upcoming Classes</h2>
          <div className="classes-grid">
            {filteredUpcomingClasses.map((cls, idx) => (
              <div key={cls.id + '-' + idx} className="class-card upcoming">
                {cls.videoPreview && (
                  <div className="class-preview">
                    <img 
                      src={cls.videoPreview.thumbnailUrl} 
                      alt={cls.topic}
                      className="preview-thumbnail"
                    />
                    <div className="preview-overlay">
                      <i className="fas fa-play-circle"></i>
                    </div>
                  </div>
                )}
                <div className="class-header">
                  <h3>{cls.subject}</h3>
                  <span className="duration">{cls.duration}</span>
                </div>
                <div className="class-details">
                  <p className="topic">{cls.topic}</p>
                  <p className="date-time">
                    <strong>When:</strong> {formatDate(cls.date)} at {cls.time}
                  </p>
                  <p className="teacher">
                    <strong>Teacher:</strong> {cls.teacher}
                  </p>
                  {cls.description && (
                    <p className="description">{cls.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleJoin(cls)}
                  className="join-button"
                >
                  Join Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {filter === 'past' && (
        <div className="classes-section">
          <h2>Past Classes</h2>
          <div className="classes-grid">
            {filteredPastClasses.map((cls, idx) => (
              <div key={cls.id + '-' + idx} className="class-card past">
                <div className="class-header">
                  <h3>{cls.subject}</h3>
                </div>
                <div className="class-details">
                  <p className="topic">{cls.topic}</p>
                  <p className="date">
                    <strong>Date:</strong> {formatDate(cls.date)}
                  </p>
                  <p className="teacher">
                    <strong>Teacher:</strong> {cls.teacher}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/recordings?id=${cls.recordingId}`)}
                  className="watch-button"
                >
                  Watch Recording
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
