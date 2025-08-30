const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Placeholder controllers
const getNotes = async (req, res) => {
    res.json({ message: "Get notes endpoint" });
};

// Routes
router.get('/', auth, getNotes);

module.exports = router;
