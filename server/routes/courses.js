const express = require('express');
const router = express.Router();
const { auth, teacherOnly } = require('../middleware/auth');

// Placeholder controllers
const getCourses = async (req, res) => {
    res.json({ message: "Get courses endpoint" });
};

const createCourse = async (req, res) => {
    res.json({ message: "Create course endpoint" });
};

// Routes
router.get('/', auth, getCourses);
router.post('/', auth, teacherOnly, createCourse);

module.exports = router;
