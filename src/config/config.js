/**
 * Configuration constants for the application
 */

// API base URL for server communication
export const API_BASE_URL = 'http://localhost:5000';

// Other configuration constants can be added here
export const FILE_UPLOAD_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
export const SUPPORTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
];
