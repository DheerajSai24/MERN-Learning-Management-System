import React from 'react';
import './Resources.css'; // For layout structure
import './Grades.css'; // For grades-specific styling

const Grades = () => {
  return (
    <div className="resources-container">
      <div className="resources-header">
        <h1>Grade Center</h1>
        <p>View and track your academic progress across all courses</p>
      </div>

      <div className="resources-section">
        <h2>Course Grades</h2>
        <div className="table-responsive">
          <table className="grades-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Assignment</th>
                <th>Grade</th>
                <th>Weight</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Advanced React Development</td>
                <td>Final Project</td>
                <td>92%</td>
                <td>30%</td>
                <td><span className="status-badge complete">Complete</span></td>
              </tr>
              <tr>
                <td>Advanced React Development</td>
                <td>Quiz 2</td>
                <td>85%</td>
                <td>15%</td>
                <td><span className="status-badge complete">Complete</span></td>
              </tr>
              <tr>
                <td>Advanced React Development</td>
                <td>Assignment 3</td>
                <td>--</td>
                <td>20%</td>
                <td><span className="status-badge pending">Pending</span></td>
              </tr>
              <tr>
                <td>UI/UX Design</td>
                <td>Mid-term Project</td>
                <td>88%</td>
                <td>25%</td>
                <td><span className="status-badge complete">Complete</span></td>
              </tr>
              <tr>
                <td>UI/UX Design</td>
                <td>Assignment 1</td>
                <td>95%</td>
                <td>15%</td>
                <td><span className="status-badge complete">Complete</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="resources-section">
        <h2>Overall Performance</h2>
        <div className="performance-cards">
          <div className="performance-card">
            <h3>Current GPA</h3>
            <div className="grade-circle">
              <span>3.8</span>
            </div>
            <p>Excellent</p>
          </div>
          <div className="performance-card">
            <h3>Completion Rate</h3>
            <div className="grade-circle">
              <span>85%</span>
            </div>
            <p>Great progress</p>
          </div>
          <div className="performance-card">
            <h3>Average Score</h3>
            <div className="grade-circle">
              <span>90%</span>
            </div>
            <p>Outstanding</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
