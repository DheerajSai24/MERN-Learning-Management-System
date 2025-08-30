const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// Placeholder controllers
const getDiscussions = async (req, res) => {
    res.json({ message: "Get discussions endpoint" });
};

// Routes
router.get('/', auth, getDiscussions);

module.exports = router;
