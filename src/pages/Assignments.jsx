import React, { useState } from 'react';
import './Assignments.css';

const assignments = [
  {
    title: 'Conducting User Research',
    course: 'User Research and Personas',
    dueDate: 'July 1, 2024',
    status: 'Done',
    submitted: true
  },
  {
    title: 'Competitive Analysis',
    course: 'Competitive Analysis in UX',
    dueDate: 'July 25, 2024',
    status: 'In Progress',
    submitted: false
  },
  {
    title: 'Creating Wireframes',
    course: 'Wireframing and Prototyping',
    dueDate: 'Aug 1, 2024',
    status: 'Pending',
    submitted: false
  },
  {
    title: 'User Interface Design',
    course: 'UI Design Fundamentals',
    dueDate: 'Aug 10, 2024',
    status: 'Pending',
    submitted: false
  },
  {
    title: 'Design System Creation',
    course: 'Design Systems',
    dueDate: 'Aug 15, 2024',
    status: 'Pending',
    submitted: false
  }
];

const courses = [
  'All Courses',
  'User Research and Personas',
  'Competitive Analysis in UX',
  'Wireframing and Prototyping',
  'UI Design Fundamentals',
  'Design Systems'
];

const Assignments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
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

  return (
    <div className="assignments-page">
      {/* Header Section - Full Width */}
      <div className="assignments-header">
        <div className="header-content">
          <h1>Assignments</h1>
          <p>View and manage your course assignments</p>
        </div>
        <div className="header-actions">
          <button className="new-assignment-btn">
            <i className="fas fa-plus"></i>
            New Assignment
          </button>
        </div>
      </div>

      <div className="assignments-container">
        {/* Left Column */}
        <div className="assignments-left">
          {/* Stats Cards */}
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

          {/* Filters & Search Section */}
          <div className="filters-section">
            <div className="search-bar">
              <i className="fas fa-search search-icon"></i>
              <input 
                type="text" 
                placeholder="Search assignments..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filters">
              <select 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All Status">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          {/* Assignments Grid */}
          <div className="assignments-grid">
            {currentAssignments.map((assignment, index) => (
              <div key={index} className="assignment-card">
                <div className="card-header">
                  <span className={`status-badge ${assignment.status.toLowerCase()}`}>
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
                    <span className="submitted-text">
                      <i className="fas fa-check-circle"></i> Submitted
                    </span>
                  ) : (
                    <button className="upload-button">
                      <i className="fas fa-upload"></i> Submit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-button"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-button"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="assignments-right">
          {/* Overview Section */}
          <div className="overview-section">
            <h2>Assignment Overview</h2>
            <div className="overview-stats">
              <div className="overview-stat">
                <span className="stat-label">Total Assignments</span>
                <span className="stat-value">{assignments.length}</span>
              </div>
              <div className="overview-stat">
                <span className="stat-label">Submitted</span>
                <span className="stat-value">
                  {assignments.filter(a => a.submitted).length}
                </span>
              </div>
              <div className="overview-stat">
                <span className="stat-label">Success Rate</span>
                <span className="stat-value">
                  {Math.round((assignments.filter(a => a.submitted).length / assignments.length) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="deadlines-card">
            <h3>
              <i className="fas fa-calendar-alt"></i>
              Upcoming Deadlines
            </h3>
            <div className="deadline-list">
              {upcomingDeadlines.map((assignment, index) => (
                <div key={index} className="deadline-item">
                  <div className="deadline-content">
                    <h4>{assignment.title}</h4>
                    <p>{assignment.course}</p>
                  </div>
                  <div className="deadline-date">
                    <span className="date">{assignment.dueDate}</span>
                    <span className={`status-dot ${assignment.status.toLowerCase()}`}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Progress */}
          <div className="course-progress-card">
            <h3>
              <i className="fas fa-book"></i>
              Course Progress
            </h3>
            <div className="progress-list">
              {courses.slice(1).map((course, index) => {
                const courseAssignments = assignments.filter(a => a.course === course);
                const completed = courseAssignments.filter(a => a.submitted).length;
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
      </div>
    </div>
  );
};

export default Assignments;
