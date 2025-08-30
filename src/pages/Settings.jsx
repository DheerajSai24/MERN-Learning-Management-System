import { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    profilePicture: 'https://placehold.co/100x100',
    twoFactorEnabled: false,
    connectedAccounts: {
      google: true,
      github: false
    },
    notifications: {
      courseUpdates: true,
      assignmentReminders: true,
      discussionReplies: false,
      promotionalEmails: false
    },
    display: {
      theme: 'light',
      fontSize: 'medium'
    },
    language: 'English'
  });

  const handleSettingsUpdate = (section, newData) => {
    setUserData(prev => ({
      ...prev,
      ...newData
    }));
    setSuccessMessage(`${section} settings updated successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const ProfileSection = () => (
    <div className="settings-card">
      <h2>Profile Settings</h2>
      <div className="profile-picture-section">
        <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
        <button className="upload-btn">Change Picture</button>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSettingsUpdate('Profile', {
          name: e.target.name.value,
          email: e.target.email.value,
          phone: e.target.phone.value
        });
      }}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" defaultValue={userData.name} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" defaultValue={userData.email} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" defaultValue={userData.phone} />
        </div>
        <button type="submit" className="save-btn">Update Profile</button>
      </form>
    </div>
  );

  const AccountSection = () => (
    <div className="settings-card">
      <h2>Account Settings</h2>
      <div className="setting-group">
        <h3>Two-Factor Authentication</h3>
        <label className="toggle">
          <input
            type="checkbox"
            checked={userData.twoFactorEnabled}
            onChange={(e) => handleSettingsUpdate('Account', {
              twoFactorEnabled: e.target.checked
            })}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
      <div className="setting-group">
        <h3>Connected Accounts</h3>
        <div className="connected-accounts">
          <div className="account-item">
            <span>Google Account</span>
            <button
              className={userData.connectedAccounts.google ? 'disconnect-btn' : 'connect-btn'}
              onClick={() => handleSettingsUpdate('Account', {
                connectedAccounts: {
                  ...userData.connectedAccounts,
                  google: !userData.connectedAccounts.google
                }
              })}
            >
              {userData.connectedAccounts.google ? 'Disconnect' : 'Connect'}
            </button>
          </div>
          <div className="account-item">
            <span>GitHub Account</span>
            <button
              className={userData.connectedAccounts.github ? 'disconnect-btn' : 'connect-btn'}
              onClick={() => handleSettingsUpdate('Account', {
                connectedAccounts: {
                  ...userData.connectedAccounts,
                  github: !userData.connectedAccounts.github
                }
              })}
            >
              {userData.connectedAccounts.github ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationsSection = () => (
    <div className="settings-card">
      <h2>Notification Preferences</h2>
      {Object.entries(userData.notifications).map(([key, value]) => (
        <div key={key} className="setting-group">
          <div className="notification-item">
            <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
            <label className="toggle">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSettingsUpdate('Notifications', {
                  notifications: {
                    ...userData.notifications,
                    [key]: e.target.checked
                  }
                })}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );

  const DisplaySection = () => (
    <div className="settings-card">
      <h2>Theme & Display</h2>
      <div className="setting-group">
        <h3>Theme</h3>
        <div className="theme-selector">
          <button
            className={`theme-btn ${userData.display.theme === 'light' ? 'active' : ''}`}
            onClick={() => handleSettingsUpdate('Display', {
              display: { ...userData.display, theme: 'light' }
            })}
          >
            Light
          </button>
          <button
            className={`theme-btn ${userData.display.theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleSettingsUpdate('Display', {
              display: { ...userData.display, theme: 'dark' }
            })}
          >
            Dark
          </button>
        </div>
      </div>
      <div className="setting-group">
        <h3>Font Size</h3>
        <div className="font-size-selector">
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              className={`font-size-btn ${userData.display.fontSize === size ? 'active' : ''}`}
              onClick={() => handleSettingsUpdate('Display', {
                display: { ...userData.display, fontSize: size }
              })}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const OtherSection = () => (
    <div className="settings-card">
      <h2>Other Settings</h2>
      <div className="setting-group">
        <h3>Language</h3>
        <select
          value={userData.language}
          onChange={(e) => handleSettingsUpdate('Other', { language: e.target.value })}
          className="language-select"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </select>
      </div>
      <div className="setting-group">
        <h3>Account Management</h3>
        <button className="download-btn" onClick={() => alert('Downloading account data...')}>
          Download Account Data
        </button>
        <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>
          Delete Account
        </button>
      </div>
    </div>
  );

  const sections = {
    profile: <ProfileSection />,
    account: <AccountSection />,
    notifications: <NotificationsSection />,
    display: <DisplaySection />,
    other: <OtherSection />
  };

  const sidebarItems = {
    profile: { icon: 'fa-user', label: 'Profile' },
    account: { icon: 'fa-shield-alt', label: 'Account & Security' },
    notifications: { icon: 'fa-bell', label: 'Notifications' },
    display: { icon: 'fa-palette', label: 'Theme & Display' },
    other: { icon: 'fa-sliders-h', label: 'Other Settings' }
  };

  return (
    <div className="settings-container">
      <button
        className="mobile-menu-toggle"
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
      >
        <i className="fas fa-cog"></i>
        Settings Menu
      </button>

      <aside className={`settings-sidebar ${showMobileSidebar ? 'show' : ''}`}>
        {Object.entries(sidebarItems).map(([key, { icon, label }]) => (
          <button
            key={key}
            className={`sidebar-btn ${activeSection === key ? 'active' : ''}`}
            onClick={() => {
              setActiveSection(key);
              setShowMobileSidebar(false);
            }}
          >
            <i className={`fas ${icon}`}></i>
            {label}
          </button>
        ))}
      </aside>

      <main className="settings-content">
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        {sections[activeSection]}
      </main>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  alert('Account deleted');
                  setShowDeleteModal(false);
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
