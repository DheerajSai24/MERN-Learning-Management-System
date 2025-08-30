import React from 'react';
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

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-logo">LMS</div>
    <nav>
      <ul>
        {menuItems.map(item => (
          <li key={item.name}>
            <NavLink 
              to={item.path}
              className={({ isActive }) => isActive ? "active" : ""}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
