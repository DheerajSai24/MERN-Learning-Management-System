import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Discussions.css';

const Discussions = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    course: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [userRole, setUserRole] = useState('student'); // In a real app, get this from auth

  // Sample discussions data - in a real app this would come from API
  const mockDiscussions = [
    {
      id: 1,
      title: "How to approach React state management?",
      author: "Harsh",
      avatar: "https://placehold.co/40",
      course: "React",
      content: "I'm struggling with state management in my React application. Should I use Redux, Context API, or something else?",
      replies: 12,
      lastActive: "2h ago",
      createdAt: "2023-07-15T10:30:00Z"
    },
    {
      id: 2,
      title: "Best resources for DSA practice",
      author: "Anjali",
      avatar: "https://placehold.co/40",
      course: "DSA",
      content: "I'm preparing for coding interviews and need good resources for Data Structures and Algorithms.",
      replies: 8,
      lastActive: "1d ago",
      createdAt: "2023-07-14T15:20:00Z"
    },
    {
      id: 3,
      title: "UX design tools recommendation",
      author: "Rahul",
      avatar: "https://placehold.co/40",
      course: "UI/UX",
      content: "I'm exploring UX design tools. What do you all recommend between Figma, Adobe XD, and Sketch?",
      replies: 3,
      lastActive: "5h ago",
      createdAt: "2023-07-15T08:45:00Z"
    },
    {
      id: 4,
      title: "Help with JavaScript Promises",
      author: "Priya",
      avatar: "https://placehold.co/40",
      course: "JavaScript",
      content: "I'm having trouble understanding how to chain promises properly in JavaScript.",
      replies: 5,
      lastActive: "3h ago",
      createdAt: "2023-07-15T11:10:00Z"
    },
    {
      id: 5,
      title: "MongoDB vs PostgreSQL for web apps",
      author: "Akash",
      avatar: "https://placehold.co/40",
      course: "Backend Development",
      content: "I'm designing a new web application and trying to decide between MongoDB and PostgreSQL.",
      replies: 0,
      lastActive: "Just now",
      createdAt: "2023-07-15T14:30:00Z"
    }
  ];

  // Sample courses for the dropdown
  const courses = ["React", "DSA", "UI/UX", "JavaScript", "Backend Development", "Python", "Web Development"];

  // Simulate loading data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchDiscussions = async () => {
      setIsLoading(true);
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setDiscussions(mockDiscussions);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  // Filter discussions based on active filter and search term
  useEffect(() => {
    let filtered = [...discussions];
    
    // Apply filter
    if (activeFilter === 'my-posts') {
      // In a real app, filter by current user's ID
      filtered = filtered.filter(discussion => discussion.author === "Harsh");
    } else if (activeFilter === 'unanswered') {
      filtered = filtered.filter(discussion => discussion.replies === 0);
    } else if (activeFilter === 'recent') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    // Apply search
    if (searchTerm.trim() !== '') {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(discussion => 
        discussion.title.toLowerCase().includes(lowercaseSearch) || 
        discussion.course.toLowerCase().includes(lowercaseSearch) ||
        discussion.content.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    setFilteredDiscussions(filtered);
  }, [discussions, activeFilter, searchTerm]);

  const handleNewDiscussionSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    try {
      // Create a new discussion object
      const newDiscussionObj = {
        id: discussions.length + 1,
        title: newDiscussion.title,
        course: newDiscussion.course,
        content: newDiscussion.description,
        author: "Harsh", // In a real app, get from current user
        avatar: "https://placehold.co/40",
        replies: 0,
        lastActive: "Just now",
        createdAt: new Date().toISOString()
      };
      
      // Add to discussions state
      setDiscussions(prev => [newDiscussionObj, ...prev]);
      
      // Reset form
      setShowNewDiscussionForm(false);
      setNewDiscussion({ title: '', course: '', description: '' });
    } catch (error) {
      console.error('Error creating discussion:', error);
      // Show error message
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const navigateToDiscussion = (discussionId) => {
    navigate(`/discussions/${discussionId}`);
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    
    // Convert to minutes
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) {
      return "Just now";
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffMins < 24 * 60) {
      const hours = Math.floor(diffMins / 60);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffMins / (60 * 24));
      return `${days}d ago`;
    }
  };

  return (
    <div className="discussions-container">
      {/* Header */}
      <div className="discussions-header">
        <div className="header-content">
          <h1>Discussions</h1>
          <p>Engage in course discussions, ask questions, and share ideas</p>
        </div>
        <button 
          className="new-discussion-btn"
          onClick={() => setShowNewDiscussionForm(true)}
        >
          + New Discussion
        </button>
      </div>

      {/* Filters and Search */}
      <div className="discussions-filters">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Discussions
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'my-posts' ? 'active' : ''}`}
            onClick={() => setActiveFilter('my-posts')}
          >
            My Posts
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'unanswered' ? 'active' : ''}`}
            onClick={() => setActiveFilter('unanswered')}
          >
            Unanswered
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'recent' ? 'active' : ''}`}
            onClick={() => setActiveFilter('recent')}
          >
            Recent
          </button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Discussion Threads */}
      <div className="discussion-threads">
        {isLoading ? (
          // Loading skeleton
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading discussions...</p>
          </div>
        ) : filteredDiscussions.length > 0 ? (
          filteredDiscussions.map(thread => (
            <div 
              key={thread.id} 
              className="discussion-card"
              onClick={() => navigateToDiscussion(thread.id)}
            >
              <div className="discussion-main">
                <div className="author-info">
                  <img src={thread.avatar} alt={thread.author} className="author-avatar" />
                  <span className="author-name">{thread.author}</span>
                </div>
                <div className="discussion-content">
                  <h3>{thread.title}</h3>
                  <p className="discussion-preview">{thread.content.substring(0, 120)}{thread.content.length > 120 ? '...' : ''}</p>
                  <div className="discussion-meta">
                    <span className="course-tag">{thread.course}</span>
                    <span className="replies">
                      <i className="fas fa-comment"></i> {thread.replies} replies
                    </span>
                    <span className="last-active">
                      <i className="fas fa-clock"></i> {formatTimeAgo(thread.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Empty state
          <div className="empty-state">
            <div className="empty-state-icon">💬</div>
            <h3>No discussions found</h3>
            <p>
              {searchTerm 
                ? "No discussions match your search criteria." 
                : activeFilter === 'unanswered' 
                  ? "There are no unanswered discussions." 
                  : activeFilter === 'my-posts' 
                    ? "You haven't created any discussions yet." 
                    : "There are no discussions yet."}
            </p>
            <button 
              className="start-discussion-btn"
              onClick={() => setShowNewDiscussionForm(true)}
            >
              Start a Discussion
            </button>
          </div>
        )}
      </div>

      {/* New Discussion Modal */}
      {showNewDiscussionForm && (
        <div className="modal-overlay" onClick={() => setShowNewDiscussionForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Start New Discussion</h2>
              <button 
                className="close-btn"
                onClick={() => setShowNewDiscussionForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleNewDiscussionSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({
                    ...newDiscussion,
                    title: e.target.value
                  })}
                  placeholder="Enter discussion title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="course">Course</label>
                <select
                  id="course"
                  value={newDiscussion.course}
                  onChange={(e) => setNewDiscussion({
                    ...newDiscussion,
                    course: e.target.value
                  })}
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newDiscussion.description}
                  onChange={(e) => setNewDiscussion({
                    ...newDiscussion,
                    description: e.target.value
                  })}
                  placeholder="Enter discussion details"
                  required
                  rows={5}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Create Discussion
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowNewDiscussionForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussions;
