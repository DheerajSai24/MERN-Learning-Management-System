import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assignments.css';
import './AssignmentCards.css';
import './SubmitModal.css';

// Mock assignment data
const assignments = [
  {
    id: 1,
    title: 'Conducting User Research',
    course: 'User Research and Personas',
    dueDate: 'July 1, 2024',
    status: 'Done',
    submitted: true
  },
  {
    id: 2,
    title: 'Competitive Analysis',
    course: 'Competitive Analysis in UX',
    dueDate: 'July 25, 2024',
    status: 'In Progress',
    submitted: false
  },
  {
    id: 3,
    title: 'Creating Wireframes',
    course: 'Wireframing and Prototyping',
    dueDate: 'Aug 1, 2024',
    status: 'Pending',
    submitted: false
  },
  {
    id: 4,
    title: 'User Interface Design',
    course: 'UI Design Fundamentals',
    dueDate: 'Aug 10, 2024',
    status: 'Pending',
    submitted: false
  },
  {
    id: 5,
    title: 'Usability Testing',
    course: 'User Testing Methods',
    dueDate: 'Aug 15, 2024',
    status: 'Pending',
    submitted: false
  },
  {
    id: 6,
    title: 'Design System Implementation',
    course: 'Design Systems',
    dueDate: 'Aug 30, 2024',
    status: 'Pending',
    submitted: false
  }
];

// Course list for the filter dropdown
const coursesList = [
  'All Courses',
  'User Research and Personas', 
  'Competitive Analysis in UX', 
  'Wireframing and Prototyping',
  'User Testing Methods',
  'UI Design Fundamentals',
  'Design Systems'
];

const Assignments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const assignmentsPerPage = 4;

  // Calculate statistics
  const stats = assignments.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  // Filter assignments based on search and filters
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || assignment.status === selectedStatus;
    const matchesCourse = selectedCourse === 'All Courses' || assignment.course === selectedCourse;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Get upcoming deadlines (next 3 non-completed assignments)
  const upcomingDeadlines = assignments
    .filter(a => a.status !== 'Done')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  // Calculate pagination
  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = filteredAssignments.slice(indexOfFirstAssignment, indexOfLastAssignment);
  const totalPages = Math.ceil(filteredAssignments.length / assignmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Handle clicking on an assignment card
  const handleAssignmentClick = (assignment) => {
    navigate(`/assignments/${assignment.id}`);
  };
  
  // Handle clicking on the submit button
  const handleSubmitClick = (e, assignment) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    setSelectedAssignment(assignment);
    setIsSubmitModalOpen(true);
  };
  
  // Function to handle "New Assignment" button click
  const handleNewAssignment = () => {
    navigate('/assignments/create');
  };

  return (
    <div className="assignments-page">
      {/* Header Section */}
      <div className="assignments-header">
        <div className="header-content">
          <h1>Assignments</h1>
          <p>View and manage your course assignments</p>
        </div>
        <div className="header-actions">
          <button 
            className="new-assignment-btn"
            onClick={handleNewAssignment}
          >
            <i className="fas fa-plus"></i>
            New Assignment
          </button>
        </div>
      </div>

      {/* Stats Cards - Moved outside the grid for better mobile experience */}
      <div className="stats-cards-wrapper">
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon pending">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-info">
              <h4>Pending</h4>
              <span className="stat-number">{stats.Pending || 0}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon in-progress">
              <i className="fas fa-spinner"></i>
            </div>
            <div className="stat-info">
              <h4>In Progress</h4>
              <span className="stat-number">{stats['In Progress'] || 0}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon done">
              <i className="fas fa-check"></i>
            </div>
            <div className="stat-info">
              <h4>Completed</h4>
              <span className="stat-number">{stats.Done || 0}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="assignments-container">
        {/* Left Column */}
        <div className="assignments-left">
          {/* Filters */}
          <div className="filters-container">
            <h3>Filters</h3>
            <div className="filter-row">
              <select 
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1); // Reset pagination when filter changes
                }}
              >
                <option value="All Status">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Completed</option>
              </select>
            </div>
            <div className="filter-row">
              <select 
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setCurrentPage(1); // Reset pagination when filter changes
                }}
              >
                {coursesList.map((course, index) => (
                  <option key={index} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div className="filter-row">
              <input 
                type="text"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset pagination when search changes
                }}
              />
            </div>
          </div>
          
          {/* Upcoming Deadlines */}
          <div className="upcoming-deadlines">
            <h3>Upcoming Deadlines</h3>
            {upcomingDeadlines.length > 0 ? (
              <div className="deadlines-list">
                {upcomingDeadlines.map((assignment, index) => (
                  <div 
                    key={index} 
                    className="deadline-item"
                    onClick={() => handleAssignmentClick(assignment)}
                  >
                    <div className="deadline-icon">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div className="deadline-info">
                      <h4>{assignment.title}</h4>
                      <p className="course-name">{assignment.course}</p>
                      <p className="due-date">Due: {assignment.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-deadlines">No upcoming deadlines!</p>
            )}
          </div>
          
          {/* Course Progress */}
          <div className="course-progress">
            <h3>Course Progress</h3>
            <div className="progress-list">
              {coursesList.slice(1).map((course, index) => {
                const courseAssignments = assignments.filter(a => a.course === course);
                const completed = courseAssignments.filter(a => a.status === 'Done').length;
                const total = courseAssignments.length;
                const progress = total ? Math.round((completed / total) * 100) : 0;
                
                return (
                  <div key={index} className="course-progress-item">
                    <div className="progress-header">
                      <h4>{course}</h4>
                      <span>{progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="progress-stats">
                      {completed} of {total} assignments completed
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="assignments-right">
          <div className="assignments-list-section">
            <div className="section-header">
              <h2>Your Assignments</h2>
              <div className="pagination-container">
                <div className="pagination">
                  {currentPage > 1 && (
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      className="pagination-arrow"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                  )}
                  
                  {Array.from({ length: totalPages }, (_, i) => {
                    // On mobile, show limited page numbers
                    const pageNumber = i + 1;
                    const isCurrentPage = currentPage === pageNumber;
                    const isFirstPage = pageNumber === 1;
                    const isLastPage = pageNumber === totalPages;
                    const isWithinRange = Math.abs(pageNumber - currentPage) < 2;
                    
                    if (isCurrentPage || isFirstPage || isLastPage || isWithinRange) {
                      return (
                        <button
                          key={i}
                          onClick={() => paginate(pageNumber)}
                          className={isCurrentPage ? 'active' : ''}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (pageNumber === currentPage + 2 || pageNumber === currentPage - 2) {
                      return <span key={i} className="pagination-dots">...</span>;
                    }
                    return null;
                  })}
                  
                  {currentPage < totalPages && (
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      className="pagination-arrow"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="assignments-grid">
              {currentAssignments.length > 0 ? (
                currentAssignments.map((assignment, index) => (
                  <div 
                    key={index} 
                    className="assignment-card"
                    onClick={() => handleAssignmentClick(assignment)}
                  >
                    <div className="card-header">
                      <span className={`status-badge ${assignment.status.toLowerCase().replace(' ', '-')}`}>
                        {assignment.status}
                      </span>
                      <span className="due-date">Due: {assignment.dueDate}</span>
                    </div>
                    <div className="card-content">
                      <h3>{assignment.title}</h3>
                      <p className="course-name">{assignment.course}</p>
                    </div>
                    <div className="card-footer">
                      {assignment.submitted ? (
                        <div className="submitted-status">
                          <i className="fas fa-check-circle"></i>
                          <span>Submitted</span>
                        </div>
                      ) : (
                        <button 
                          className="submit-btn"
                          onClick={(e) => handleSubmitClick(e, assignment)}
                        >
                          Submit Assignment
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-assignments-message">
                  <i className="fas fa-search"></i>
                  <p>No assignments match your filter criteria</p>
                  <button 
                    className="reset-filter-btn"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedStatus('All Status');
                      setSelectedCourse('All Courses');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Assignment Modal */}
      {isSubmitModalOpen && selectedAssignment && (
        <div className="modal-overlay" onClick={() => setIsSubmitModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Submit Assignment</h2>
              <button className="close-button" onClick={() => setIsSubmitModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <h3>{selectedAssignment.title}</h3>
              <p className="course-name">{selectedAssignment.course}</p>
              <p className="due-date">Due: {selectedAssignment.dueDate}</p>
              
              <div className="file-upload-area">
                <p>Drag and drop your file here or</p>
                <label className="file-upload-button">
                  <span>Choose File</span>
                  <input type="file" className="file-upload-input" />
                </label>
              </div>
              
              <div className="form-group">
                <label htmlFor="comments">Comments (Optional)</label>
                <textarea 
                  id="comments" 
                  placeholder="Add any comments for your instructor..."
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                Cancel
              </button>
              <button className="submit-assignment-button">
                <i className="fas fa-paper-plane"></i>
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
