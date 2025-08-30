import React from 'react';
import './Topbar.css';
import { UserButton, SignedIn } from './ClerkAuth';
import { useUser, useClerk } from '@clerk/clerk-react';

const Topbar = ({ toggleSidebar }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
      <div className="profile-dropdown">
        <SignedIn>
          {user && (
            <>
              <span className="profile-name hide-on-mobile">
                {user.firstName || user.username || user.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'User'}
              </span>
              <UserButton afterSignOutUrl="/sign-in" />
              <button className="logout-button" onClick={() => signOut({ redirectUrl: '/sign-in' })}>
                <span className="hide-on-mobile">Logout</span>
                <span className="show-on-mobile">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </span>
              </button>
            </>
          )}
        </SignedIn>
      </div>
    </header>
  );
};

export default Topbar;
