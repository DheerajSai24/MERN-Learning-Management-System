import React from 'react';
import './Dashboard.css';
import { useUser } from '@clerk/clerk-react';

const Dashboard = () => {
  // Get user from Clerk
  const { user } = useUser();
  const firstName = user?.firstName || user?.username || 
    (user?.emailAddresses?.[0]?.emailAddress?.split('@')[0]) || 'Student';
  
  // Get current date in a readable format
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="greeting">
          <h1>Hello {firstName} 👋, welcome back!</h1>
          <p className="date">{today}</p>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* User Progress Overview */}
        <div className="card recent-course">
          <h3>Recent Course</h3>
          <div className="course-content">
            <h4>Advanced React Development</h4>
            <p>Master modern React patterns and build scalable applications</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '65%' }}></div>
            </div>
            <span className="progress-text">65% Complete</span>
          </div>
        </div>

        <div className="card resources">
          <h3>Quick Resources</h3>
          <ul className="resources-list">
            <li>
              <span className="resource-icon">📚</span>
              Course Materials
            </li>
            <li>
              <span className="resource-icon">📝</span>
              Assignment Guidelines
            </li>
            <li>
              <span className="resource-icon">📅</span>
              Academic Calendar
            </li>
            <li>
              <span className="resource-icon">📊</span>
              Grade Center
            </li>
          </ul>
        </div>

        {/* Activity & Performance */}
        <div className="card hours-spent">
          <h3>Learning Activity</h3>
          <div className="chart-placeholder">
            <div className="chart-bars">
              <div className="bar" style={{ height: '60%' }}></div>
              <div className="bar" style={{ height: '80%' }}></div>
              <div className="bar" style={{ height: '40%' }}></div>
              <div className="bar" style={{ height: '90%' }}></div>
              <div className="bar" style={{ height: '70%' }}></div>
            </div>
            <p>Hours spent this week: 12.5</p>
          </div>
        </div>

        <div className="card performance">
          <h3>Performance Score</h3>
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
                stroke="orange"
                strokeWidth="2"
                strokeDasharray="85, 100"
              />
              <text x="18" y="20.35" className="percentage">85%</text>
            </svg>
            <p>Great progress!</p>
          </div>
        </div>

        {/* To-Do List */}
        <div className="card todo-list">
          <h3>Upcoming Tasks</h3>
          <ul className="tasks">
            <li className="task-item">
              <div className="task-info">
                <h4>Submit Final Project</h4>
                <p>React Development Course</p>
              </div>
              <div className="task-meta">
                <span className="due-date">Due Tomorrow</span>
                <span className="status pending">Pending</span>
              </div>
            </li>
            <li className="task-item">
              <div className="task-info">
                <h4>Complete Quiz</h4>
                <p>JavaScript Fundamentals</p>
              </div>
              <div className="task-meta">
                <span className="due-date">Due in 3 days</span>
                <span className="status in-progress">In Progress</span>
              </div>
            </li>
            <li className="task-item">
              <div className="task-info">
                <h4>Group Discussion</h4>
                <p>UI/UX Design Principles</p>
              </div>
              <div className="task-meta">
                <span className="due-date">Today, 4:00 PM</span>
                <span className="status completed">Completed</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Recent Classes */}
        <div className="card recent-classes">
          <h3>Ongoing Classes</h3>
          <div className="classes-grid">
            <div className="class-card">
              <h4>React Development</h4>
              <p>12 of 20 lessons completed</p>
              <button className="continue-btn">Continue Course</button>
            </div>
            <div className="class-card">
              <h4>UI/UX Design</h4>
              <p>8 of 15 lessons completed</p>
              <button className="continue-btn">Continue Course</button>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="card announcements">
          <h3>Latest Updates</h3>
          <ul className="announcements-list">
            <li>
              <span className="announcement-time">2h ago</span>
              <p>New course materials uploaded for React Development</p>
            </li>
            <li>
              <span className="announcement-time">1d ago</span>
              <p>Upcoming live session: Advanced React Patterns</p>
            </li>
            <li>
              <span className="announcement-time">2d ago</span>
              <p>Quiz deadline extended for JavaScript Fundamentals</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
