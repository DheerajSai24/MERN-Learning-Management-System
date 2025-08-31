import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    role: 'student',
    courses: [],
    assignments: [],
    notes: [],
    discussions: [],
    announcements: [],
    stats: {},
    isLoading: true
  });
  
  const [loadingState, setLoadingState] = useState({
    courses: true,
    assignments: true,
    stats: true
  });

  const [error, setError] = useState(null);

  // Get user from Clerk
  const { user, isLoaded: isUserLoaded } = useUser();
  const firstName = user?.firstName || user?.username || 
    (user?.emailAddresses?.[0]?.emailAddress?.split('@')[0]) || 'Student';
  
  // Get current date in a readable format
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());
  
  // Format relative time (e.g., "2 hours ago")
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffDays > 0) {
      return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    } else if (diffMinutes > 0) {
      return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
    } else {
      return 'Just now';
    }
  };

  // Calculate days until deadline
  const getDaysUntilDeadline = (deadlineDate) => {
    const now = new Date();
    const deadline = new Date(deadlineDate);
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due Today';
    if (diffDays === 1) return 'Due Tomorrow';
    return `Due in ${diffDays} days`;
  };
  
  // Fetch user data from backend
  useEffect(() => {
    if (!isUserLoaded) return;
    
    const API_BASE_URL = 'http://localhost:5000/api';
    const mockRole = localStorage.getItem('userRole') || 'student';
    
    const fetchData = async () => {
      try {
        setLoadingState({ courses: true, assignments: true, stats: true });
        
        // In a real app, you would use proper authentication token
        // This is just for demonstration purposes
        // const token = localStorage.getItem('token');
        // const headers = { Authorization: `Bearer ${token}` };
        
        // For now, we'll use mock data but structured to match our API
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - simulating responses from different endpoints
        const courseData = [
          {
            _id: '1',
            title: 'Advanced React Development',
            description: 'Master modern React patterns and build scalable applications',
            syllabus: [
              { unit: 'Introduction', topics: ['Setup', 'JSX', 'Components'] },
              { unit: 'Hooks', topics: ['useState', 'useEffect', 'useContext'] },
              { unit: 'Routing', topics: ['Basic Routing', 'Nested Routes', 'Protected Routes'] },
              { unit: 'State Management', topics: ['Context API', 'Redux', 'Zustand'] }
            ],
            startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
            endDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000)  // 75 days from now
          },
          {
            _id: '2',
            title: 'UI/UX Design Fundamentals',
            description: 'Learn principles of user interface and experience design',
            syllabus: [
              { unit: 'Design Principles', topics: ['Color Theory', 'Typography', 'Layout'] },
              { unit: 'User Research', topics: ['Personas', 'User Stories', 'Interviews'] },
              { unit: 'Prototyping', topics: ['Wireframes', 'Mockups', 'Interactive Prototypes'] }
            ],
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)  // 60 days from now
          },
          {
            _id: '3',
            title: 'Node.js Backend Development',
            description: 'Build scalable and robust backend systems with Node.js and Express',
            syllabus: [
              { unit: 'Basics', topics: ['Node.js Architecture', 'NPM', 'Modules'] },
              { unit: 'Express', topics: ['Routing', 'Middleware', 'Templates'] },
              { unit: 'Data Storage', topics: ['MongoDB', 'Mongoose', 'SQL Alternatives'] }
            ],
            startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            endDate: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000)  // 85 days from now
          }
        ];
        
        const assignmentData = [
          {
            _id: '1',
            title: 'Final React Project',
            courseId: '1',
            description: 'Build a fully functional React application implementing the concepts learned in class',
            deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
            totalPoints: 100,
            submissions: []
          },
          {
            _id: '2',
            title: 'JavaScript Quiz',
            courseId: '1',
            description: 'Online quiz covering ES6+ features and async patterns',
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            totalPoints: 50,
            submissions: []
          },
          {
            _id: '3',
            title: 'UI Design Portfolio',
            courseId: '2',
            description: 'Create a portfolio showcasing your UI design projects',
            deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago (overdue)
            totalPoints: 150,
            submissions: []
          },
          {
            _id: '4',
            title: 'API Development Exercise',
            courseId: '3',
            description: 'Build a RESTful API with Express and MongoDB',
            deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
            totalPoints: 80,
            submissions: []
          }
        ];
        
        const discussionData = [
          {
            _id: '1',
            title: 'Help with React Hooks',
            content: 'I\'m having trouble understanding useEffect dependencies. Can someone explain?',
            courseId: '1',
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
            replies: 3
          },
          {
            _id: '2',
            title: 'Design Critique Request',
            content: 'Would anyone be willing to review my UI design for the latest assignment?',
            courseId: '2',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            replies: 5
          }
        ];
        
        const announcementData = [
          {
            id: 1,
            courseId: '1',
            title: 'New course materials uploaded',
            message: 'New React tutorial videos have been added to the course materials section.',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          },
          {
            id: 2,
            courseId: '1',
            title: 'Upcoming live session',
            message: 'Join us for a live coding session on Advanced React Patterns this Friday at 4PM.',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          },
          {
            id: 3,
            courseId: '2',
            title: 'Assignment deadline extended',
            message: 'The deadline for the UI Design Portfolio has been extended by one week.',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          }
        ];
        
        // Calculate progress for each course based on completed syllabus units
        const progressData = {
          '1': 65, // Course 1 progress (percentage)
          '2': 53, // Course 2 progress
          '3': 20  // Course 3 progress
        };
        
        // User stats
        const statsData = {
          totalCourses: courseData.length,
          completedAssignments: 8,
          pendingAssignments: assignmentData.length,
          avgScore: 87.5,
          hoursSpent: {
            monday: 2.5,
            tuesday: 3.0,
            wednesday: 1.5,
            thursday: 4.0,
            friday: 2.0,
            saturday: 0.5,
            sunday: 0
          }
        };
        
        // Process course data with progress information
        const coursesWithProgress = courseData.map(course => ({
          ...course,
          progress: progressData[course._id] || 0,
          totalUnits: course.syllabus.length,
          completedUnits: Math.round((progressData[course._id] || 0) / 100 * course.syllabus.length)
        }));
        
        // Process assignments with status
        const processedAssignments = assignmentData.map(assignment => {
          // In a real app, we'd check submission status
          let status = 'pending';
          if (assignment._id === '3') status = 'overdue'; 
          else if (assignment._id === '2') status = 'in-progress';
          else if (assignment._id === '4') status = 'not-started';
          
          // Find the related course
          const course = courseData.find(c => c._id === assignment.courseId);
          
          return {
            ...assignment,
            course: course ? course.title : 'Unknown Course',
            dueDate: getDaysUntilDeadline(assignment.deadline),
            status
          };
        });
        
        // Process announcements with relative time
        const processedAnnouncements = announcementData.map(announcement => ({
          ...announcement,
          time: getRelativeTime(announcement.createdAt)
        }));
        
        // Update state with all the data
        setUserData({
          role: mockRole,
          courses: coursesWithProgress,
          assignments: processedAssignments,
          discussions: discussionData,
          announcements: processedAnnouncements,
          stats: statsData,
          isLoading: false
        });
        
        setLoadingState({
          courses: false,
          assignments: false,
          stats: false
        });
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load dashboard data. Please try again later.");
        setUserData(prev => ({
          ...prev,
          isLoading: false
        }));
        setLoadingState({
          courses: false,
          assignments: false,
          stats: false
        });
      }
    };
    
    fetchData();
  }, [isUserLoaded]);

  // Function to handle navigation to a course
  const navigateToCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };
  
  // Function to handle resource navigation
  const navigateToResource = (resource) => {
    switch(resource) {
      case 'materials':
        navigate('/resources');
        break;
      case 'assignments':
        navigate('/assignments');
        break;
      case 'calendar':
        navigate('/schedule');
        break;
      case 'grades':
        navigate('/grades');
        break;
      case 'discussions':
        navigate('/discussions');
        break;
      case 'notes':
        navigate('/notes');
        break;
      default:
        navigate('/resources');
    }
  };
  
  // Handle assignment click
  const handleAssignmentClick = (assignmentId) => {
    navigate(`/assignments/${assignmentId}`);
  };
  
  // Handle discussion click
  const handleDiscussionClick = (discussionId) => {
    navigate(`/discussions/${discussionId}`);
  };
  
  // Function to toggle role for testing purposes
  const toggleRole = () => {
    const newRole = userData.role === 'teacher' ? 'student' : 'teacher';
    localStorage.setItem('userRole', newRole);
    setUserData(prev => ({ ...prev, role: newRole }));
  };
  
  // Calculate week's study hours total
  const calculateTotalHours = () => {
    if (!userData.stats?.hoursSpent) return 0;
    return Object.values(userData.stats.hoursSpent).reduce((sum, hours) => sum + hours, 0);
  };
  
  // Loading state
  if (userData.isLoading) {
    return (
      <div className="dashboard loading-state">
        <div className="dashboard-loader">
          <div className="spinner"></div>
          <p>Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="dashboard error-state">
        <div className="error-message">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="greeting">
          <h1>Hello {firstName} 👋, welcome back!</h1>
          <p className="date">{today}</p>
          <button 
            onClick={toggleRole} 
            className="role-toggle-btn"
            title="Switch role for testing purposes"
          >
            Current Role: {userData.role === 'teacher' ? 'Teacher' : 'Student'}
          </button>
        </div>
        
        <div className="dashboard-summary">
          <div className="summary-stat">
            <span className="stat-value">{userData.courses.length}</span>
            <span className="stat-label">Active Courses</span>
          </div>
          <div className="summary-stat">
            <span className="stat-value">{userData.stats.pendingAssignments || 0}</span>
            <span className="stat-label">Pending Tasks</span>
          </div>
          <div className="summary-stat">
            <span className="stat-value">{calculateTotalHours().toFixed(1)}</span>
            <span className="stat-label">Hours This Week</span>
          </div>
          <div className="summary-stat">
            <span className="stat-value">{userData.stats.avgScore || 0}%</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Teacher-specific section */}
        {userData.role === 'teacher' && (
          <div className="card teacher-overview">
            <div className="card-header">
              <h3>Teaching Overview</h3>
              <button className="view-all-btn" onClick={() => navigate('/courses')}>View All</button>
            </div>
            <div className="teacher-stats">
              <div className="stat-item">
                <span className="stat-number">{userData.courses.length}</span>
                <span className="stat-label">Active Courses</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">38</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userData.stats.pendingAssignments || 0}</span>
                <span className="stat-label">Assignments</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">87%</span>
                <span className="stat-label">Completion Rate</span>
              </div>
            </div>
            <div className="action-buttons">
              <button className="action-btn primary" onClick={() => navigate('/courses/create')}>
                Create New Course
              </button>
              <button className="action-btn secondary" onClick={() => navigate('/assignments/create')}>
                Create Assignment
              </button>
            </div>
          </div>
        )}

        {/* User Progress Overview - visible to all */}
        {userData.courses.length > 0 && (
          <div className="card course-progress">
            <div className="card-header">
              <h3>Course Progress</h3>
              <button className="view-all-btn" onClick={() => navigate('/courses')}>View All</button>
            </div>
            
            <div className="course-progress-grid">
              {userData.courses.slice(0, 3).map((course) => (
                <div key={course._id} className="course-progress-item" onClick={() => navigateToCourse(course._id)}>
                  <h4>{course.title}</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <div className="progress-details">
                    <span className="progress-text">{course.progress}% Complete</span>
                    <span className="units-text">
                      {course.completedUnits} of {course.totalUnits} units
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card resources">
          <div className="card-header">
            <h3>Quick Access</h3>
          </div>
          <ul className="resources-list">
            <li onClick={() => navigateToResource('materials')}>
              <span className="resource-icon document">📚</span>
              <div className="resource-info">
                <span className="resource-title">Course Materials</span>
                <span className="resource-desc">Access readings and slides</span>
              </div>
            </li>
            <li onClick={() => navigateToResource('assignments')}>
              <span className="resource-icon assignment">📝</span>
              <div className="resource-info">
                <span className="resource-title">Assignments</span>
                <span className="resource-desc">View and submit your work</span>
              </div>
            </li>
            <li onClick={() => navigateToResource('discussions')}>
              <span className="resource-icon discussion">💬</span>
              <div className="resource-info">
                <span className="resource-title">Discussions</span>
                <span className="resource-desc">Join course conversations</span>
              </div>
            </li>
            <li onClick={() => navigateToResource('calendar')}>
              <span className="resource-icon calendar">📅</span>
              <div className="resource-info">
                <span className="resource-title">Schedule</span>
                <span className="resource-desc">View upcoming deadlines</span>
              </div>
            </li>
            <li onClick={() => navigateToResource('notes')}>
              <span className="resource-icon notes">�</span>
              <div className="resource-info">
                <span className="resource-title">Notes</span>
                <span className="resource-desc">Your study notes</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Activity & Performance */}
        <div className="card hours-spent">
          <div className="card-header">
            <h3>Weekly Activity</h3>
            <span className="time-period">Aug 25 - Aug 31</span>
          </div>
          <div className="chart-container">
            <div className="chart-bars">
              {userData.stats?.hoursSpent && Object.entries(userData.stats.hoursSpent).map(([day, hours], index) => (
                <div className="bar-container" key={day}>
                  <div 
                    className="bar" 
                    style={{ 
                      height: `${(hours / 5) * 100}%`,
                      backgroundColor: day === 'thursday' ? '#4b79a1' : 'orange' 
                    }}
                  >
                    {hours > 0 && <span className="bar-value">{hours.toFixed(1)}</span>}
                  </div>
                  <span className="bar-label">{day.slice(0, 3)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="chart-summary">
            <p>
              <span className="highlight">{calculateTotalHours().toFixed(1)} hours</span> spent learning this week
              <span className="trend positive">↑ 2.5 hrs</span>
            </p>
          </div>
        </div>

        <div className="card performance">
          <div className="card-header">
            <h3>Performance</h3>
          </div>
          <div className="performance-content">
            <div className="score-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4b79a1"
                  strokeWidth="2"
                  strokeDasharray={`${userData.stats.avgScore || 0}, 100`}
                />
                <text x="18" y="20.35" className="percentage">{userData.stats.avgScore || 0}%</text>
              </svg>
            </div>
            <div className="performance-stats">
              <div className="performance-stat">
                <span className="stat-label">Completed</span>
                <span className="stat-value">{userData.stats.completedAssignments || 0}</span>
              </div>
              <div className="performance-stat">
                <span className="stat-label">Pending</span>
                <span className="stat-value">{userData.stats.pendingAssignments || 0}</span>
              </div>
              <div className="performance-stat">
                <span className="stat-label">Avg. Grade</span>
                <span className="stat-value">{userData.stats.avgScore || 0}%</span>
              </div>
            </div>
          </div>
          <div className="performance-message">
            <p>You're performing well! Keep up the good work.</p>
          </div>
        </div>

        {/* To-Do List - different for teachers and students */}
        <div className="card todo-list">
          <div className="card-header">
            <h3>{userData.role === 'teacher' ? 'Pending Tasks' : 'Upcoming Tasks'}</h3>
            <button className="view-all-btn" onClick={() => navigate('/assignments')}>View All</button>
          </div>
          {userData.assignments.length > 0 ? (
            <ul className="tasks">
              {userData.assignments.map((assignment) => (
                <li 
                  key={assignment._id} 
                  className={`task-item ${assignment.status}`}
                  onClick={() => handleAssignmentClick(assignment._id)}
                >
                  <div className="task-info">
                    <h4>{assignment.title}</h4>
                    <p>{assignment.course}</p>
                  </div>
                  <div className="task-meta">
                    <span className="due-date">{assignment.dueDate}</span>
                    <span className={`status ${assignment.status}`}>
                      {assignment.status === 'overdue' 
                        ? 'Overdue' 
                        : assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>No assignments due at the moment.</p>
            </div>
          )}
        </div>

        {/* Recent Discussions */}
        <div className="card discussions">
          <div className="card-header">
            <h3>Recent Discussions</h3>
            <button className="view-all-btn" onClick={() => navigate('/discussions')}>View All</button>
          </div>
          {userData.discussions.length > 0 ? (
            <ul className="discussions-list">
              {userData.discussions.map((discussion) => (
                <li 
                  key={discussion._id} 
                  className="discussion-item"
                  onClick={() => handleDiscussionClick(discussion._id)}
                >
                  <h4>{discussion.title}</h4>
                  <p className="discussion-preview">{discussion.content.substring(0, 60)}...</p>
                  <div className="discussion-meta">
                    <span className="time">{getRelativeTime(discussion.createdAt)}</span>
                    <span className="replies">{discussion.replies} replies</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>No active discussions at the moment.</p>
            </div>
          )}
        </div>

        {/* Announcements */}
        <div className="card announcements">
          <div className="card-header">
            <h3>Announcements</h3>
          </div>
          {userData.announcements && userData.announcements.length > 0 ? (
            <ul className="announcements-list">
              {userData.announcements.map((announcement) => (
                <li key={announcement.id}>
                  <div className="announcement-header">
                    <h4>{announcement.title}</h4>
                    <span className="announcement-time">{announcement.time}</span>
                  </div>
                  <p>{announcement.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <p>No recent announcements.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
