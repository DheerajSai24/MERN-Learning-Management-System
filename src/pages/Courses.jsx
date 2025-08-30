import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const [courses] = useState([
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      thumbnail: 'https://placehold.co/600x400?text=React+Course',
      description: 'Master modern React concepts including Hooks, Context API, and Redux. Build scalable applications with best practices and advanced state management.',
      category: 'Programming',
      progress: 75,
      enrolledStudents: 156,
      dateAdded: '2025-08-01'
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Prof. Alex Martinez',
      thumbnail: 'https://placehold.co/600x400?text=UI/UX+Design',
      description: 'Learn the principles of user interface and user experience design. Create beautiful, functional designs using modern tools and methodologies.',
      category: 'Design',
      progress: 45,
      enrolledStudents: 89,
      dateAdded: '2025-08-15'
    },
    {
      id: 3,
      title: 'Digital Marketing Strategy',
      instructor: 'Lisa Thompson',
      thumbnail: 'https://placehold.co/600x400?text=Digital+Marketing',
      description: 'Develop comprehensive digital marketing strategies. Learn SEO, social media marketing, content creation, and analytics.',
      category: 'Business',
      progress: 30,
      enrolledStudents: 120,
      dateAdded: '2025-08-20'
    },
    {
      id: 4,
      title: 'Full Stack Web Development',
      instructor: 'Mike Chen',
      thumbnail: 'https://placehold.co/600x400?text=Web+Dev',
      description: 'Build complete web applications from front to back. Master HTML, CSS, JavaScript, Node.js, and modern databases.',
      category: 'Programming',
      progress: 60,
      enrolledStudents: 200,
      dateAdded: '2025-08-10'
    }
  ]);

  // Filter and sort courses
  const filteredAndSortedCourses = [...courses]
    .filter(course => {
      const matchesSearch = (
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCategory = category === 'all' || course.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.dateAdded) - new Date(b.dateAdded);
        case 'progress':
          return b.progress - a.progress;
        case 'newest':
        default:
          return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
    });

  return (
    <div className="courses-container">
      <header className="courses-header">
        <div className="header-content">
          <h1>Courses</h1>
          <p>Browse and manage your enrolled courses</p>
        </div>
      </header>

      <div className="courses-controls">
        <div className="search-filter-group">
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Business">Business</option>
            <option value="Design">Design</option>
          </select>
        </div>
        <div className="sort-group">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>

      <div className="courses-grid">
        {filteredAndSortedCourses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-thumbnail">
              <img src={course.thumbnail} alt={course.title} />
            </div>
            <div className="course-content">
              <h3>{course.title}</h3>
              <p className="instructor">by {course.instructor}</p>
              <p className="description">{course.description}</p>
              <div className="progress-section">
                <div className="progress-info">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/courses/${course.id}`)}
                className="view-course-btn"
              >
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
