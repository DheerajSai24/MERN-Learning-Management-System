import { useState, useEffect } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Apply theme changes to document
  useEffect(() => {
    document.body.setAttribute('data-theme', userData.display.theme);
    document.body.setAttribute('data-font-size', userData.display.fontSize);
  }, [userData.display.theme, userData.display.fontSize]);

  const validateForm = (formData, formType) => {
    const errors = {};
    
    if (formType === 'profile') {
      if (!formData.name.trim()) errors.name = "Name cannot be empty";
      if (!formData.email.trim()) errors.email = "Email cannot be empty";
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email format";
      if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
        errors.phone = "Invalid phone format";
      }
    } else if (formType === 'password') {
      if (!formData.currentPassword) errors.currentPassword = "Current password is required";
      if (!formData.newPassword) errors.newPassword = "New password is required";
      if (formData.newPassword && formData.newPassword.length < 8) {
        errors.newPassword = "Password must be at least 8 characters";
      }
      if (formData.newPassword !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }
    
    return errors;
  };

  const handleSettingsUpdate = (section, newData, formType = null) => {
    setIsSubmitting(true);
    
    // If form validation is needed
    if (formType) {
      const errors = validateForm(newData, formType);
      setFormErrors(errors);
      
      if (Object.keys(errors).length > 0) {
        setIsSubmitting(false);
        return;
      }
    }
    
    // Simulate API call
    setTimeout(() => {
      setUserData(prev => ({
        ...prev,
        ...newData
      }));
      setSuccessMessage(`${section} settings updated successfully!`);
      setIsSubmitting(false);
      setFormErrors({});
      
      // Close password modal if it was open
      if (formType === 'password') {
        setShowPasswordModal(false);
      }
      
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 600); // Simulate network delay
  };

  const ProfileSection = () => {
    const [profileData, setProfileData] = useState({
      name: userData.name,
      email: userData.email,
      phone: userData.phone
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <div className="settings-card">
        <h2><i className="fas fa-user"></i> Profile Settings</h2>
        <div className="profile-picture-section">
          <div className="profile-image-container">
            <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
            <div className="profile-overlay">
              <i className="fas fa-camera"></i>
            </div>
          </div>
          <button className="upload-btn"><i className="fas fa-upload"></i> Change Picture</button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSettingsUpdate('Profile', profileData, 'profile');
        }}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              value={profileData.name} 
              onChange={handleInputChange}
              className={formErrors.name ? 'error' : ''}
            />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              value={profileData.email} 
              onChange={handleInputChange}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              type="tel" 
              id="phone"
              name="phone" 
              value={profileData.phone} 
              onChange={handleInputChange}
              className={formErrors.phone ? 'error' : ''}
            />
            {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
          </div>
          <button 
            type="submit" 
            className="save-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> Updating...</> : <><i className="fas fa-save"></i> Update Profile</>}
          </button>
        </form>
      </div>
    );
  };

  const AccountSection = () => {
    const [passwordData, setPasswordData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    const handlePasswordInputChange = (e) => {
      const { name, value } = e.target;
      setPasswordData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    return (
      <div className="settings-card">
        <h2><i className="fas fa-shield-alt"></i> Account & Security</h2>
        
        <div className="setting-group">
          <h3>Password Management</h3>
          <button 
            className="password-change-btn" 
            onClick={() => setShowPasswordModal(true)}
          >
            <i className="fas fa-key"></i> Change Password
          </button>
        </div>
        
        <div className="setting-group">
          <h3>Two-Factor Authentication</h3>
          <div className="security-option">
            <div>
              <p className="option-title">Protect your account with 2FA</p>
              <p className="option-description">Add an extra layer of security to your account</p>
            </div>
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
        </div>
        
        <div className="setting-group">
          <h3>Connected Accounts</h3>
          <div className="connected-accounts">
            <div className="account-item">
              <div className="account-info">
                <i className="fab fa-google"></i>
                <div>
                  <p className="account-name">Google Account</p>
                  <p className="account-status">{userData.connectedAccounts.google ? 'Connected' : 'Not connected'}</p>
                </div>
              </div>
              <button
                className={userData.connectedAccounts.google ? 'disconnect-btn' : 'connect-btn'}
                onClick={() => handleSettingsUpdate('Account', {
                  connectedAccounts: {
                    ...userData.connectedAccounts,
                    google: !userData.connectedAccounts.google
                  }
                })}
              >
                <i className={`fas ${userData.connectedAccounts.google ? 'fa-unlink' : 'fa-link'}`}></i>
                {userData.connectedAccounts.google ? 'Disconnect' : 'Connect'}
              </button>
            </div>
            
            <div className="account-item">
              <div className="account-info">
                <i className="fab fa-github"></i>
                <div>
                  <p className="account-name">GitHub Account</p>
                  <p className="account-status">{userData.connectedAccounts.github ? 'Connected' : 'Not connected'}</p>
                </div>
              </div>
              <button
                className={userData.connectedAccounts.github ? 'disconnect-btn' : 'connect-btn'}
                onClick={() => handleSettingsUpdate('Account', {
                  connectedAccounts: {
                    ...userData.connectedAccounts,
                    github: !userData.connectedAccounts.github
                  }
                })}
              >
                <i className={`fas ${userData.connectedAccounts.github ? 'fa-unlink' : 'fa-link'}`}></i>
                {userData.connectedAccounts.github ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Password change modal */}
        {showPasswordModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2><i className="fas fa-key"></i> Change Password</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSettingsUpdate('Password', passwordData, 'password');
              }}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <div className="password-input-group">
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordInputChange}
                      className={formErrors.currentPassword ? 'error' : ''}
                    />
                  </div>
                  {formErrors.currentPassword && <span className="error-message">{formErrors.currentPassword}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <div className="password-input-group">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordInputChange}
                      className={formErrors.newPassword ? 'error' : ''}
                    />
                  </div>
                  {formErrors.newPassword && <span className="error-message">{formErrors.newPassword}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <div className="password-input-group">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordInputChange}
                      className={formErrors.confirmPassword ? 'error' : ''}
                    />
                  </div>
                  {formErrors.confirmPassword && <span className="error-message">{formErrors.confirmPassword}</span>}
                </div>
                
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                      setFormErrors({});
                    }}
                  >
                    <i className="fas fa-times"></i> Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="save-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 
                      <><i className="fas fa-spinner fa-spin"></i> Updating...</> : 
                      <><i className="fas fa-check"></i> Change Password</>
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  const NotificationsSection = () => {
    // Descriptions for each notification type
    const notificationDescriptions = {
      courseUpdates: "Get notified when courses are updated with new materials",
      assignmentReminders: "Receive reminders about upcoming and due assignments",
      discussionReplies: "Get notified when someone replies to your discussions",
      promotionalEmails: "Receive emails about new courses and features"
    };

    return (
      <div className="settings-card">
        <h2><i className="fas fa-bell"></i> Notification Preferences</h2>
        
        <div className="notification-controls">
          <button 
            className="select-all-btn"
            onClick={() => {
              const allEnabled = Object.values(userData.notifications).every(val => val);
              const updatedNotifications = {};
              
              Object.keys(userData.notifications).forEach(key => {
                updatedNotifications[key] = !allEnabled;
              });
              
              handleSettingsUpdate('Notifications', {
                notifications: updatedNotifications
              });
            }}
          >
            <i className="fas fa-check-double"></i>
            {Object.values(userData.notifications).every(val => val) ? 
              'Disable All' : 'Enable All'}
          </button>
        </div>
        
        <div className="notification-list">
          {Object.entries(userData.notifications).map(([key, value]) => (
            <div key={key} className="notification-item">
              <div className="notification-info">
                <p className="notification-title">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                <p className="notification-description">{notificationDescriptions[key]}</p>
              </div>
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
          ))}
        </div>
        
        <div className="settings-note">
          <i className="fas fa-info-circle"></i>
          <p>You can also manage notification settings from your email preferences.</p>
        </div>
      </div>
    );
  };

  const DisplaySection = () => {
    return (
      <div className="settings-card">
        <h2><i className="fas fa-palette"></i> Theme & Display</h2>
        
        <div className="setting-group">
          <h3>Theme</h3>
          <div className="theme-options">
            <div 
              className={`theme-option ${userData.display.theme === 'light' ? 'active' : ''}`}
              onClick={() => handleSettingsUpdate('Display', {
                display: { ...userData.display, theme: 'light' }
              })}
            >
              <div className="theme-preview light-theme">
                <div className="preview-header"></div>
                <div className="preview-sidebar"></div>
                <div className="preview-content">
                  <div className="preview-line"></div>
                  <div className="preview-line"></div>
                  <div className="preview-line short"></div>
                </div>
              </div>
              <div className="theme-label">
                <i className="fas fa-sun"></i>
                <span>Light Theme</span>
                {userData.display.theme === 'light' && <i className="fas fa-check-circle"></i>}
              </div>
            </div>
            
            <div 
              className={`theme-option ${userData.display.theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleSettingsUpdate('Display', {
                display: { ...userData.display, theme: 'dark' }
              })}
            >
              <div className="theme-preview dark-theme">
                <div className="preview-header"></div>
                <div className="preview-sidebar"></div>
                <div className="preview-content">
                  <div className="preview-line"></div>
                  <div className="preview-line"></div>
                  <div className="preview-line short"></div>
                </div>
              </div>
              <div className="theme-label">
                <i className="fas fa-moon"></i>
                <span>Dark Theme</span>
                {userData.display.theme === 'dark' && <i className="fas fa-check-circle"></i>}
              </div>
            </div>
          </div>
        </div>
        
        <div className="setting-group">
          <h3>Font Size</h3>
          <div className="font-size-options">
            {['small', 'medium', 'large'].map(size => (
              <div 
                key={size}
                className={`font-size-option ${userData.display.fontSize === size ? 'active' : ''}`}
                onClick={() => handleSettingsUpdate('Display', {
                  display: { ...userData.display, fontSize: size }
                })}
              >
                <span className={`sample-text ${size}`}>Aa</span>
                <div className="font-size-label">
                  <span>{size.charAt(0).toUpperCase() + size.slice(1)}</span>
                  {userData.display.fontSize === size && <i className="fas fa-check"></i>}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="settings-note">
          <i className="fas fa-info-circle"></i>
          <p>Your theme settings apply to all pages across the platform.</p>
        </div>
      </div>
    );
  };

  const OtherSection = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    
    const handleDownloadData = () => {
      setIsDownloading(true);
      
      // Simulate download process
      setTimeout(() => {
        // Create a simple JSON file with user data
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        // Create download link
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'user_account_data.json';
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsDownloading(false);
      }, 1500);
    };
    
    return (
      <div className="settings-card">
        <h2><i className="fas fa-sliders-h"></i> Other Settings</h2>
        
        <div className="setting-group">
          <h3>Language</h3>
          <div className="language-selector">
            <select
              value={userData.language}
              onChange={(e) => handleSettingsUpdate('Other', { language: e.target.value })}
              className="language-select"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
              <option value="Hindi">Hindi</option>
            </select>
            <i className="fas fa-globe language-icon"></i>
          </div>
          <p className="setting-description">
            Select your preferred language for the learning platform interface
          </p>
        </div>
        
        <div className="setting-group">
          <h3>Account Management</h3>
          <div className="data-management">
            <div className="data-option">
              <div className="data-option-info">
                <i className="fas fa-download data-icon"></i>
                <div>
                  <h4>Export Your Data</h4>
                  <p>Download all your personal data in JSON format</p>
                </div>
              </div>
              <button 
                className="download-btn" 
                onClick={handleDownloadData}
                disabled={isDownloading}
              >
                {isDownloading ? 
                  <><i className="fas fa-spinner fa-spin"></i> Downloading...</> :
                  <><i className="fas fa-file-download"></i> Download Data</>
                }
              </button>
            </div>
            
            <div className="data-option danger">
              <div className="data-option-info">
                <i className="fas fa-exclamation-triangle data-icon"></i>
                <div>
                  <h4>Delete Account</h4>
                  <p>Permanently remove your account and all associated data</p>
                </div>
              </div>
              <button 
                className="delete-btn" 
                onClick={() => setShowDeleteModal(true)}
              >
                <i className="fas fa-trash-alt"></i> Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
    <div className={`settings-container ${showMobileSidebar ? 'sidebar-open' : ''}`}>
      <button
        className="mobile-menu-toggle"
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
      >
        <i className="fas fa-cog"></i>
        Settings Menu
      </button>

      <aside className={`settings-sidebar ${showMobileSidebar ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h2>Settings</h2>
          <button 
            className="close-sidebar"
            onClick={() => setShowMobileSidebar(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
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
            <i className="fas fa-check-circle"></i>
            {successMessage}
            <button 
              className="close-message"
              onClick={() => setSuccessMessage('')}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
        {sections[activeSection]}
      </main>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === 'modal-overlay') {
            setShowDeleteModal(false);
          }
        }}>
          <div className="modal danger-modal">
            <div className="modal-header">
              <h2><i className="fas fa-exclamation-triangle"></i> Delete Account</h2>
              <button 
                className="close-modal"
                onClick={() => setShowDeleteModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-content">
              <div className="warning-icon">
                <i className="fas fa-trash-alt"></i>
              </div>
              <h3>Are you sure you want to delete your account?</h3>
              <p>This action <strong>cannot be undone</strong>. This will permanently delete your account and remove all your data from our servers.</p>
              
              <div className="confirmation-checkbox">
                <input type="checkbox" id="confirm-delete" />
                <label htmlFor="confirm-delete">I understand that this action is permanent</label>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn" 
                onClick={() => setShowDeleteModal(false)}
              >
                <i className="fas fa-arrow-left"></i> Cancel
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  const checkbox = document.getElementById('confirm-delete');
                  if (checkbox && checkbox.checked) {
                    // Simulate account deletion
                    setIsSubmitting(true);
                    setTimeout(() => {
                      setIsSubmitting(false);
                      setShowDeleteModal(false);
                      setSuccessMessage('Account deleted successfully. Redirecting...');
                      // In a real app, you would redirect to a logout or home page
                    }, 1500);
                  } else {
                    alert('Please confirm that you understand this action is permanent');
                  }
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 
                  <><i className="fas fa-spinner fa-spin"></i> Processing...</> :
                  <><i className="fas fa-trash-alt"></i> Delete Account</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay for mobile sidebar */}
      {showMobileSidebar && (
        <div 
          className="sidebar-overlay"
          onClick={() => setShowMobileSidebar(false)}
        ></div>
      )}
    </div>
  );
};

export default Settings;
