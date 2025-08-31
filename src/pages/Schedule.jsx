import React, { useState, useEffect } from 'react';
import './Schedule.css';
import './EventDetails.css';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [courseFilter, setCourseFilter] = useState('all-courses');
  const [eventTypeFilter, setEventTypeFilter] = useState('all-events');
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonthFirstDay, setCurrentMonthFirstDay] = useState(0);
  const [eventsData, setEventsData] = useState([
    {
      id: 1,
      title: 'React Basics',
      type: 'Live Class',
      course: 'Web Development Fundamentals',
      date: 'Aug 30, 2025',
      time: '10:00 AM',
      status: 'Upcoming',
      description: 'Introduction to React components, JSX, and props.'
    },
    {
      id: 2,
      title: 'Wireframes Submission',
      type: 'Assignment Due',
      course: 'UI/UX Design',
      date: 'Sept 1, 2025',
      time: '11:59 PM',
      status: 'Upcoming',
      description: 'Submit your wireframes for the e-commerce mobile app project.'
    },
    {
      id: 3,
      title: 'Data Structures Quiz',
      type: 'Exam',
      course: 'Computer Science Basics',
      date: 'Sept 5, 2025',
      time: '2:00 PM',
      status: 'Upcoming',
      description: 'Quiz covering arrays, linked lists, stacks, and queues.'
    },
    {
      id: 4,
      title: 'JavaScript Advanced Topics',
      type: 'Live Class',
      course: 'Web Development Fundamentals',
      date: 'Sept 3, 2025',
      time: '10:00 AM',
      status: 'Upcoming',
      description: 'Deep dive into closures, promises, and async/await.'
    },
    {
      id: 5,
      title: 'Color Theory Basics',
      type: 'Live Class',
      course: 'UI/UX Design',
      date: 'Aug 29, 2025',
      time: '2:00 PM',
      status: 'Completed',
      description: 'Understanding color relationships and creating effective color palettes.'
    }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'Live Class',
    course: '',
    date: '',
    time: '',
    description: ''
  });

  // Generate calendar days when month changes
  useEffect(() => {
    generateCalendar();
  }, [selectedDate]);

  // Generate calendar with proper month days and padding
  const generateCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    // First day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    setCurrentMonthFirstDay(firstDay);
    
    // Number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create array with the days of the month
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    setCalendarDays(days);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    const previousMonth = new Date(selectedDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setSelectedDate(previousMonth);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setSelectedDate(nextMonth);
  };

  // Check if a specific day has events
  const dayHasEvents = (day) => {
    const currentMonthYear = `${selectedDate.toLocaleString('default', { month: 'short' })} ${selectedDate.getFullYear()}`;
    return eventsData.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             event.date.includes(currentMonthYear.slice(0, 3));
    });
  };

  // Select a specific day
  const selectDay = (day) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value
    });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Format the date
    const formattedDate = new Date(newEvent.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    // Create new event
    const newEventData = {
      id: eventsData.length + 1,
      title: newEvent.title,
      type: newEvent.type,
      course: newEvent.course,
      date: formattedDate,
      time: newEvent.time,
      status: 'Upcoming',
      description: newEvent.description
    };

    // Add to events
    setEventsData([...eventsData, newEventData]);
    
    // Reset form and close modal
    setNewEvent({
      title: '',
      type: 'Live Class',
      course: '',
      date: '',
      time: '',
      description: ''
    });
    setShowAddEventForm(false);
  };

  // View event details
  const viewEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  // Filter events based on selected filters
  const filteredEvents = eventsData.filter(event => {
    const courseMatch = courseFilter === 'all-courses' || 
                       event.course.toLowerCase().includes(courseFilter.replace('-', ' '));
    
    const eventTypeMatch = eventTypeFilter === 'all-events' || 
                          event.type.toLowerCase().includes(eventTypeFilter.replace('-', ' '));
    
    return courseMatch && eventTypeMatch;
  });

  // Get events for the selected date
  const selectedDateEvents = filteredEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === selectedDate.getDate() &&
           eventDate.getMonth() === selectedDate.getMonth() &&
           eventDate.getFullYear() === selectedDate.getFullYear();
  });

  // Current month and year for display
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
          <select 
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="all-courses">All Courses</option>
            <option value="web-development">Web Development</option>
            <option value="ui/ux">UI/UX Design</option>
            <option value="computer-science">Computer Science</option>
          </select>
          <select 
            value={eventTypeFilter}
            onChange={(e) => setEventTypeFilter(e.target.value)}
          >
            <option value="all-events">All Events</option>
            <option value="live-class">Classes</option>
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
              <button className="month-nav" onClick={goToPreviousMonth}></button>
              <h2>{currentMonth} {currentYear}</h2>
              <button className="month-nav" onClick={goToNextMonth}></button>
            </div>
            <div className="calendar-weekdays">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            <div className="calendar-grid">
              {/* Empty cells for padding */}
              {Array.from({ length: currentMonthFirstDay }).map((_, index) => (
                <div key={`empty-${index}`} className="calendar-day empty"></div>
              ))}
              
              {/* Actual days */}
              {calendarDays.map(day => (
                <div 
                  key={day} 
                  className={`calendar-day ${day === selectedDate.getDate() && 
                    selectedDate.getMonth() === selectedDate.getMonth() && 
                    selectedDate.getFullYear() === selectedDate.getFullYear() ? 'selected' : ''}`}
                  onClick={() => selectDay(day)}
                >
                  {day}
                  {dayHasEvents(day) && (
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
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="event-card"
                    onClick={() => viewEventDetails(event)}
                  >
                    <div className="event-type">{event.type}</div>
                    <h4>{event.title}</h4>
                    <p className="course-name">{event.course}</p>
                    <div className="event-time">{event.time}</div>
                  </div>
                ))
              ) : (
                <p className="no-events">No events scheduled for this day</p>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-events">
          <h3>Upcoming Events</h3>
          <div className="events-list">
            {filteredEvents.filter(event => event.status === 'Upcoming').length > 0 ? (
              filteredEvents
                .filter(event => event.status === 'Upcoming')
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(event => (
                  <div 
                    key={event.id} 
                    className={`event-card ${event.type.toLowerCase().replace(' ', '-')}`}
                    onClick={() => viewEventDetails(event)}
                  >
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
                ))
            ) : (
              <p className="no-events">No upcoming events match your filters</p>
            )}
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

      {/* Add Event Form Modal */}
      {showAddEventForm && (
        <div className="modal-overlay">
          <div className="add-event-modal">
            <h3>Add New Event</h3>
            <button 
              className="close-modal"
              onClick={() => setShowAddEventForm(false)}
            >
              
            </button>
            <form className="event-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Event Type</label>
                <select 
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Live Class">Class</option>
                  <option value="Assignment Due">Assignment</option>
                  <option value="Exam">Exam</option>
                </select>
              </div>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title" 
                  required
                />
              </div>
              <div className="form-group">
                <label>Course</label>
                <select
                  name="course"
                  value={newEvent.course}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="Web Development Fundamentals">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Computer Science Basics">Computer Science</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input 
                  type="time" 
                  name="time"
                  value={newEvent.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddEventForm(false)}>Cancel</button>
                <button type="submit" className="submit-button">Add Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="modal-overlay">
          <div className="event-details-modal">
            <button 
              className="close-modal"
              onClick={() => setShowEventDetails(false)}
            >
              
            </button>
            <div className={`event-details-header ${selectedEvent.type.toLowerCase().replace(' ', '-')}`}>
              <span className="event-badge">{selectedEvent.type}</span>
              <h2>{selectedEvent.title}</h2>
            </div>
            <div className="event-details-content">
              <div className="event-detail-item">
                <span className="detail-label">Course:</span>
                <span className="detail-value">{selectedEvent.course}</span>
              </div>
              <div className="event-detail-item">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{selectedEvent.date}</span>
              </div>
              <div className="event-detail-item">
                <span className="detail-label">Time:</span>
                <span className="detail-value">{selectedEvent.time}</span>
              </div>
              <div className="event-detail-item">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status-${selectedEvent.status.toLowerCase()}`}>
                  {selectedEvent.status}
                </span>
              </div>
              {selectedEvent.description && (
                <div className="event-description">
                  <h3>Description</h3>
                  <p>{selectedEvent.description}</p>
                </div>
              )}
            </div>
            <div className="event-details-footer">
              {selectedEvent.type === 'Assignment Due' && (
                <button className="submit-work-button">Submit Work</button>
              )}
              {selectedEvent.type === 'Live Class' && (
                <button className="join-class-button">Join Class</button>
              )}
              <button 
                className="close-details-button"
                onClick={() => setShowEventDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
