import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <span>© 2025 LMS. All rights reserved.</span>
      <ul className="footer-links">
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/assignments">Assignments</a></li>
        <li><a href="/notes">Notes</a></li>
      </ul>
    </div>
  </footer>
);

export default Footer;
