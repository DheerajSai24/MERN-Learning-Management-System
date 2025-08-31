import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AssignmentDetail.css';

const AssignmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock assignment data
  const mockAssignments = [
    {
      id: 'conducting-user-research',
      title: 'Conducting User Research',
      course: 'User Research and Personas',
      dueDate: 'July 1, 2024',
      status: 'Done',
      submitted: true,
      description: 'Conduct a user research study for a mobile application. Identify target audience, create user personas, and document user journeys.',
      requirements: [
        'Identify at least 3 distinct user personas',
        'Document the research methodology',
        'Create user journey maps for each persona',
        'Provide analysis of research findings'
      ],
      resources: [
        { name: 'User Research Template', type: 'Document', url: '#' },
        { name: 'Persona Creation Guide', type: 'PDF', url: '#' }
      ],
      submissionDate: 'June 29, 2024'
    },
    {
      id: 'competitive-analysis',
      title: 'Competitive Analysis',
      course: 'Competitive Analysis in UX',
      dueDate: 'July 25, 2024',
      status: 'In Progress',
      submitted: false,
      description: 'Perform a comprehensive competitive analysis of three applications in the same market. Compare features, UX patterns, strengths, and weaknesses.',
      requirements: [
        'Select 3 competing applications',
        'Create a feature comparison matrix',
        'Analyze UX patterns and usability',
        'Identify opportunities for improvement'
      ],
      resources: [
        { name: 'Competitive Analysis Framework', type: 'Spreadsheet', url: '#' },
        { name: 'UX Analysis Checklist', type: 'PDF', url: '#' }
      ]
    },
    {
      id: 'creating-wireframes',
      title: 'Creating Wireframes',
      course: 'Wireframing and Prototyping',
      dueDate: 'Aug 1, 2024',
      status: 'Pending',
      submitted: false,
      description: 'Design wireframes for a new e-commerce mobile application. Include all primary user flows and key screens.',
      requirements: [
        'Create wireframes for at least 8 key screens',
        'Include annotations explaining interactions',
        'Design for both mobile and tablet layouts',
        'Document the user flow between screens'
      ],
      resources: [
        { name: 'Wireframing Kit', type: 'Design File', url: '#' },
        { name: 'Mobile UI Patterns', type: 'Reference', url: '#' }
      ]
    },
    {
      id: 'user-interface-design',
      title: 'User Interface Design',
      course: 'UI Design Fundamentals',
      dueDate: 'Aug 10, 2024',
      status: 'Pending',
      submitted: false,
      description: 'Create a high-fidelity UI design for a dashboard interface based on provided wireframes and brand guidelines.',
      requirements: [
        'Follow the provided brand guidelines',
        'Design all screens in the wireframe set',
        'Create a component library',
        'Provide design rationale documentation'
      ],
      resources: [
        { name: 'Brand Guidelines', type: 'PDF', url: '#' },
        { name: 'Dashboard Wireframes', type: 'Design File', url: '#' }
      ]
    },
    {
      id: 'design-system-creation',
      title: 'Design System Creation',
      course: 'Design Systems',
      dueDate: 'Aug 15, 2024',
      status: 'Pending',
      submitted: false,
      description: 'Create a comprehensive design system for a financial application. Include all UI components, typography, color schemes, and usage guidelines.',
      requirements: [
        'Design core components (buttons, inputs, cards, etc.)',
        'Define typography system with hierarchy',
        'Create a color system with accessibility considerations',
        'Document usage guidelines for all components'
      ],
      resources: [
        { name: 'Design System Examples', type: 'Reference', url: '#' },
        { name: 'Component Checklist', type: 'Document', url: '#' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call to get assignment details
    setLoading(true);
    
    // Find the assignment by ID
    setTimeout(() => {
      const foundAssignment = mockAssignments.find(a => a.id === id);
      
      if (foundAssignment) {
        setAssignment(foundAssignment);
      } else {
        console.error('Assignment not found');
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  const handleGoBack = () => {
    navigate('/assignments');
  };

  const handleSubmit = () => {
    // Open submission modal
    console.log('Submit assignment:', assignment?.title);
  };

  if (loading) {
    return (
      <div className="assignment-detail loading">
        <div className="loading-spinner"></div>
        <p>Loading assignment details...</p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="assignment-detail not-found">
        <h2>Assignment Not Found</h2>
        <p>The assignment you're looking for doesn't exist or has been removed.</p>
        <button onClick={handleGoBack} className="back-button">
          Return to Assignments
        </button>
      </div>
    );
  }

  return (
    <div className="assignment-detail-page">
      <div className="detail-header">
        <div className="header-content">
          <button onClick={handleGoBack} className="back-button">
            <i className="fas fa-arrow-left"></i> Back to Assignments
          </button>
          <h1>{assignment.title}</h1>
          <div className="assignment-meta">
            <span className="course-name">{assignment.course}</span>
            <span className="meta-separator">•</span>
            <span className="due-date">Due: {assignment.dueDate}</span>
            <span className="meta-separator">•</span>
            <span className={`status-badge ${assignment.status.toLowerCase()}`}>
              {assignment.status}
            </span>
          </div>
        </div>
        <div className="header-actions">
          {assignment.submitted ? (
            <div className="submitted-info">
              <i className="fas fa-check-circle"></i>
              <div>
                <p>Submitted</p>
                <p className="submission-date">on {assignment.submissionDate}</p>
              </div>
            </div>
          ) : (
            <button onClick={handleSubmit} className="submit-button">
              <i className="fas fa-upload"></i> Submit Assignment
            </button>
          )}
        </div>
      </div>

      <div className="detail-content">
        <div className="content-main">
          <div className="detail-section">
            <h2>Description</h2>
            <p>{assignment.description}</p>
          </div>
          
          <div className="detail-section">
            <h2>Requirements</h2>
            <ul className="requirements-list">
              {assignment.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          
          {assignment.submitted && (
            <div className="detail-section">
              <h2>Your Submission</h2>
              <div className="submission-preview">
                <div className="file-preview">
                  <i className="fas fa-file-pdf"></i>
                  <span>assignment_submission.pdf</span>
                </div>
                <button className="view-button">View Submission</button>
              </div>
              <div className="grade-section">
                <h3>Grade</h3>
                <div className="grade-display">
                  <span className="grade">94%</span>
                  <span className="grade-status">Excellent</span>
                </div>
                <div className="feedback">
                  <h4>Instructor Feedback</h4>
                  <p>Great work on the user research! Your personas were well developed and your methodology was clearly explained. Next time, consider including more detailed user journey maps.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="content-sidebar">
          <div className="sidebar-section">
            <h3>Resources</h3>
            <div className="resources-list">
              {assignment.resources.map((resource, index) => (
                <a key={index} href={resource.url} className="resource-link" target="_blank" rel="noopener noreferrer">
                  <div className="resource-info">
                    <span className="resource-name">{resource.name}</span>
                    <span className="resource-type">{resource.type}</span>
                  </div>
                  <i className="fas fa-external-link-alt"></i>
                </a>
              ))}
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Timeline</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-icon assigned">
                  <i className="fas fa-clipboard-list"></i>
                </div>
                <div className="timeline-content">
                  <h4>Assigned</h4>
                  <p>June 15, 2024</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className={`timeline-icon ${assignment.submitted ? 'completed' : 'pending'}`}>
                  <i className={`fas ${assignment.submitted ? 'fa-check' : 'fa-hourglass-half'}`}></i>
                </div>
                <div className="timeline-content">
                  <h4>Due Date</h4>
                  <p>{assignment.dueDate}</p>
                </div>
              </div>
              {assignment.submitted && (
                <div className="timeline-item">
                  <div className="timeline-icon completed">
                    <i className="fas fa-paper-plane"></i>
                  </div>
                  <div className="timeline-content">
                    <h4>Submitted</h4>
                    <p>{assignment.submissionDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;
