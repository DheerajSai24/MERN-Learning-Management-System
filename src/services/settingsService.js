import { API_BASE_URL } from '../config/config';

/**
 * Service for handling user settings API requests
 */
export const settingsService = {
  /**
   * Get user profile information
   * @returns {Promise} Profile data
   */
  getProfile: async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch profile');
    }
    
    return await response.json();
  },
  
  /**
   * Update user profile information
   * @param {Object} profileData - Name, email, phone
   * @returns {Promise} Updated profile data
   */
  updateProfile: async (profileData) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }
    
    return await response.json();
  },
  
  /**
   * Change user password
   * @param {Object} passwordData - currentPassword, newPassword
   * @returns {Promise} Success message
   */
  changePassword: async (passwordData) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/api/auth/password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(passwordData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to change password');
    }
    
    return await response.json();
  },
  
  /**
   * Update user settings
   * @param {string} settingsType - Type of settings to update (twoFactorEnabled, connectedAccounts, notifications, display, language)
   * @param {Object} settings - Settings data to update
   * @returns {Promise} Updated user data
   */
  updateSettings: async (settingsType, settings) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/api/auth/settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ settingsType, settings })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update settings');
    }
    
    return await response.json();
  },
  
  /**
   * Export user account data
   * @returns {Promise} User account data
   */
  exportAccountData: async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/api/auth/export-data`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to export account data');
    }
    
    return await response.json();
  },
  
  /**
   * Delete user account
   * @returns {Promise} Success message
   */
  deleteAccount: async () => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/api/auth/account`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete account');
    }
    
    return await response.json();
  }
};

export default settingsService;
