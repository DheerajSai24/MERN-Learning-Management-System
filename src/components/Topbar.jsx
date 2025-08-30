import React from 'react';
import './Topbar.css';
import { UserButton, SignedIn } from './ClerkAuth';
import { useUser, useClerk } from '@clerk/clerk-react';

const Topbar = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  
  return (
    <header className="topbar">
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
      <div className="profile-dropdown">
        <SignedIn>
          {user && (
            <>
              <span className="profile-name">
                {user.firstName || user.username || user.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'User'}
              </span>
              <UserButton afterSignOutUrl="/sign-in" />
              <button className="logout-button" onClick={() => signOut({ redirectUrl: '/sign-in' })}>Logout</button>
            </>
          )}
        </SignedIn>
      </div>
    </header>
  );
};

export default Topbar;
