import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { UserButton, SignedIn, SignedOut } from './ClerkAuth';
import { useUser, useClerk } from '@clerk/clerk-react';



const Navbar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <nav className="navbar">
      <div className="navbar-logo">LMS</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/assignments">Assignments</Link></li>
        <li><Link to="/notes">Notes</Link></li>
      </ul>
      <div className="navbar-user">
        <SignedIn>
          <div className="navbar-user-info" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {user && <span className="navbar-username">{user.fullName}</span>}
            <button className="navbar-logout" onClick={() => signOut({ redirectUrl: '/sign-in' })}>Logout</button>
          </div>
        </SignedIn>
        <SignedOut>
          <Link to="/sign-in">Sign In</Link>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
