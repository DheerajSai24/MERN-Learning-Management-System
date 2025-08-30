import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Assignments', path: '/assignments' },
  { name: 'Schedule', path: '/schedule' },
  { name: 'Recordings', path: '/recordings' },
  { name: 'Discussions', path: '/discussions' },
  { name: 'Resources', path: '/resources' },
  { name: 'Notes', path: '/notes' },
  { name: 'Downloads', path: '/downloads' },
  { name: 'Classes', path: '/classes' },
  { name: 'Courses', path: '/courses' },
  { name: 'Settings', path: '/settings' },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Handle clicks on mobile to close sidebar when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && isOpen && !event.target.closest('.sidebar') && !event.target.closest('.mobile-menu-toggle')) {
        toggleSidebar();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">LMS</div>
        <nav>
          <ul>
            {menuItems.map(item => (
              <li key={item.name}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => isActive ? "active" : ""}
                  onClick={handleLinkClick}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
