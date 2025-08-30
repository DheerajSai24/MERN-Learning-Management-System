import { useState } from 'react'
import './Discussions.css'

const Discussions = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false)
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    course: '',
    description: ''
  })

  // Sample discussion threads data
  const discussions = [
    {
      id: 1,
      title: "How to approach React state management?",
      author: "Harsh",
      avatar: "https://placehold.co/40",
      course: "React",
      replies: 12,
      lastActive: "2h ago"
    },
    {
      id: 2,
      title: "Best resources for DSA practice",
      author: "Anjali",
      avatar: "https://placehold.co/40",
      course: "DSA",
      replies: 8,
      lastActive: "1d ago"
    },
    {
      id: 3,
      title: "UX design tools recommendation",
      author: "Rahul",
      avatar: "https://placehold.co/40",
      course: "UI/UX",
      replies: 3,
      lastActive: "5h ago"
    }
  ]

  // Sample courses for the dropdown
  const courses = ["React", "DSA", "UI/UX", "Python", "Web Development"]

  const handleNewDiscussionSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('New discussion:', newDiscussion)
    setShowNewDiscussionForm(false)
    setNewDiscussion({ title: '', course: '', description: '' })
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

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
        {discussions.map(thread => (
          <div key={thread.id} className="discussion-card">
            <div className="discussion-main">
              <div className="author-info">
                <img src={thread.avatar} alt={thread.author} className="author-avatar" />
                <span className="author-name">{thread.author}</span>
              </div>
              <div className="discussion-content">
                <h3>{thread.title}</h3>
                <div className="discussion-meta">
                  <span className="course-tag">{thread.course}</span>
                  <span className="replies">
                    <i className="fas fa-comment"></i> {thread.replies} replies
                  </span>
                  <span className="last-active">
                    <i className="fas fa-clock"></i> {thread.lastActive}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Discussion Modal */}
      {showNewDiscussionForm && (
        <div className="modal-overlay">
          <div className="modal">
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
  )
}

export default Discussions
