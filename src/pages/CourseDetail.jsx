import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Courses.css';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock course data (in a real app, this would be fetched based on the id)
  const [course] = useState({
    id: parseInt(id),
    title: 'Advanced React Development',
    instructor: 'Dr. Sarah Johnson',
    thumbnail: 'https://placehold.co/800x400?text=React+Course',
    description: 'Master modern React concepts including Hooks, Context API, and Redux. Build scalable applications with best practices and advanced state management. Learn to create efficient, maintainable React applications using the latest features and industry best practices.',
    category: 'Programming',
    progress: 75,
    enrolledStudents: 156,
    dateAdded: '2025-08-01',
    modules: [
      {
        id: 1,
        title: 'Module 1: React Fundamentals',
        lessons: [
          { id: 1, title: 'Introduction to React', duration: '45 mins', completed: true },
          { id: 2, title: 'Components and Props', duration: '1 hour', completed: true },
          { id: 3, title: 'State and Lifecycle', duration: '1.5 hours', completed: false }
        ]
      },
      {
        id: 2,
        title: 'Module 2: Advanced Concepts',
        lessons: [
          { id: 4, title: 'Hooks Deep Dive', duration: '2 hours', completed: false },
          { id: 5, title: 'Context API', duration: '1 hour', completed: false },
          { id: 6, title: 'Redux Implementation', duration: '2.5 hours', completed: false }
        ]
      }
    ],
    assignments: [
      { id: 1, title: 'Build a Todo App', deadline: '2025-09-15', submitted: true },
      { id: 2, title: 'State Management Project', deadline: '2025-09-30', submitted: false }
    ],
    resources: [
      { id: 1, title: 'React Documentation', type: 'Link', url: '#' },
      { id: 2, title: 'Course Slides', type: 'PDF', url: '#' },
      { id: 3, title: 'Code Examples', type: 'GitHub', url: '#' }
    ]
  });

  return (
    <div className="course-detail-container">
      <button onClick={() => navigate('/courses')} className="back-button">
        ← Back to Courses
      </button>

      <div className="course-header">
        <div className="course-thumbnail">
          <img src={course.thumbnail} alt={course.title} />
        </div>
        <div className="course-info">
          <h1>{course.title}</h1>
          <p className="instructor">Instructor: {course.instructor}</p>
          <div className="course-stats">
            <span className="enrolled">
              <i className="fas fa-users"></i> {course.enrolledStudents} Students Enrolled
            </span>
            <span className="category">
              <i className="fas fa-tag"></i> {course.category}
            </span>
          </div>
        </div>
      </div>

      <div className="course-progress">
        <div className="progress-header">
          <h3>Your Progress</h3>
          <span>{course.progress}% Complete</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="course-content-grid">
        <div className="main-content">
          <section className="description-section">
            <h2>Course Description</h2>
            <p>{course.description}</p>
          </section>

          <section className="modules-section">
            <h2>Course Modules</h2>
            {course.modules.map(module => (
              <div key={module.id} className="module-card">
                <h3>{module.title}</h3>
                <div className="lessons-list">
                  {module.lessons.map(lesson => (
                    <div key={lesson.id} className="lesson-item">
                      <div className="lesson-info">
                        <span className={`status ${lesson.completed ? 'completed' : ''}`}>
                          {lesson.completed ? '✓' : '○'}
                        </span>
                        <span className="lesson-title">{lesson.title}</span>
                      </div>
                      <span className="duration">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className="side-content">
          <section className="assignments-section">
            <h2>Assignments</h2>
            {course.assignments.map(assignment => (
              <div key={assignment.id} className="assignment-card">
                <h4>{assignment.title}</h4>
                <p>Deadline: {assignment.deadline}</p>
                <span className={`status ${assignment.submitted ? 'submitted' : 'pending'}`}>
                  {assignment.submitted ? 'Submitted' : 'Pending'}
                </span>
              </div>
            ))}
          </section>

          <section className="resources-section">
            <h2>Resources</h2>
            {course.resources.map(resource => (
              <a
                key={resource.id}
                href={resource.url}
                className="resource-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{resource.title}</span>
                <span className="resource-type">{resource.type}</span>
              </a>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
