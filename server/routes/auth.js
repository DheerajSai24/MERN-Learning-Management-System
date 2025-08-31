const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { 
    register, 
    login, 
    getProfile, 
    updateProfile, 
    updatePassword, 
    updateSettings, 
    exportAccountData, 
    deleteAccount
} = require('../controllers/authController');

// Authentication routes
router.post('/register', register);
router.post('/login', login);

// Profile routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.put('/password', auth, updatePassword);

// Settings routes
router.put('/settings', auth, updateSettings);

// Account data routes
router.get('/export-data', auth, exportAccountData);
router.delete('/account', auth, deleteAccount);

module.exports = router;
