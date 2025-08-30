import React, { useState } from 'react';
import './Schedule.css';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'React Basics',
      type: 'Live Class',
      course: 'Web Development Fundamentals',
      date: 'Aug 30, 2025',
      time: '10:00 AM',
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Wireframes Submission',
      type: 'Assignment Due',
      course: 'UI/UX Design',
      date: 'Sept 1, 2025',
      time: '11:59 PM',
      status: 'Upcoming'
    },
    {
      id: 3,
      title: 'Data Structures Quiz',
      type: 'Exam',
      course: 'Computer Science Basics',
      date: 'Sept 5, 2025',
      time: '2:00 PM',
      status: 'Upcoming'
    }
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  // Get current month and year
  const currentMonth = selectedDate.toLocaleString('default', { month: 'long' });
  const currentYear = selectedDate.getFullYear();

  return (
    <div className="schedule-page">
      {/* Header */}
      <div className="schedule-header">
        <div>
          <h1>Schedule</h1>
          <p>View your classes, assignments, and upcoming events</p>
        </div>
        <div className="schedule-filters">
          <select defaultValue="all-courses">
            <option value="all-courses">All Courses</option>
            <option value="web-dev">Web Development</option>
            <option value="ui-ux">UI/UX Design</option>
            <option value="cs">Computer Science</option>
          </select>
          <select defaultValue="all-events">
            <option value="all-events">All Events</option>
            <option value="class">Classes</option>
            <option value="assignment">Assignments</option>
            <option value="exam">Exams</option>
          </select>
        </div>
      </div>

      <div className="schedule-content">
        <div className="calendar-section">
          {/* Calendar */}
          <div className="calendar-card">
            <div className="calendar-header">
              <button className="month-nav">←</button>
              <h2>{currentMonth} {currentYear}</h2>
              <button className="month-nav">→</button>
            </div>
            <div className="calendar-weekdays">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            <div className="calendar-grid">
              {generateCalendarDays().map(day => (
                <div 
                  key={day} 
                  className={`calendar-day ${day === selectedDate.getDate() ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(new Date(selectedDate.setDate(day)))}
                >
                  {day}
                  {events.some(event => new Date(event.date).getDate() === day) && (
                    <span className="event-dot"></span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Date Events */}
          <div className="selected-date-events">
            <h3>Events for {selectedDate.toLocaleDateString('en-US', { 
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}</h3>
            <div className="date-events-list">
              {events
                .filter(event => new Date(event.date).getDate() === selectedDate.getDate())
                .map(event => (
                  <div key={event.id} className="event-card">
                    <div className="event-type">{event.type}</div>
                    <h4>{event.title}</h4>
                    <p className="course-name">{event.course}</p>
                    <div className="event-time">{event.time}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-events">
          <h3>Upcoming Events</h3>
          <div className="events-list">
            {events.map(event => (
              <div key={event.id} className={`event-card ${event.type.toLowerCase().replace(' ', '-')}`}>
                <div className="event-header">
                  <span className="event-type">{event.type}</span>
                  <span className="event-status">{event.status}</span>
                </div>
                <h4>{event.title}</h4>
                <p className="course-name">{event.course}</p>
                <div className="event-datetime">
                  <span className="event-date">{event.date}</span>
                  <span className="event-time">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Button */}
      <button 
        className="add-event-button"
        onClick={() => setShowAddEventForm(true)}
      >
        + Add Event
      </button>

      {/* Add Event Form Modal (Placeholder) */}
      {showAddEventForm && (
        <div className="modal-overlay">
          <div className="add-event-modal">
            <h3>Add New Event</h3>
            <button 
              className="close-modal"
              onClick={() => setShowAddEventForm(false)}
            >
              ×
            </button>
            <form className="event-form">
              <div className="form-group">
                <label>Event Type</label>
                <select>
                  <option value="class">Class</option>
                  <option value="assignment">Assignment</option>
                  <option value="exam">Exam</option>
                </select>
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="Enter event title" />
              </div>
              <div className="form-group">
                <label>Course</label>
                <select>
                  <option value="">Select Course</option>
                  <option value="web-dev">Web Development</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="cs">Computer Science</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddEventForm(false)}>Cancel</button>
                <button type="submit" className="submit-button">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
