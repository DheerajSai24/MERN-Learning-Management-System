const express = require('express');
const router = express.Router();
const { auth, teacherOnly, studentOnly } = require('../middleware/auth');
const assignmentController = require('../controllers/assignmentController');

// Routes
router.get('/course/:courseId', auth, assignmentController.getAssignments);
router.get('/:id', auth, assignmentController.getAssignment);
router.post('/', auth, teacherOnly, assignmentController.createAssignment);
router.put('/:id', auth, teacherOnly, assignmentController.updateAssignment);
router.delete('/:id', auth, teacherOnly, assignmentController.deleteAssignment);
router.post('/:id/submit', auth, studentOnly, assignmentController.submitAssignment);
router.post('/grade', auth, teacherOnly, assignmentController.gradeSubmission);

module.exports = router;
