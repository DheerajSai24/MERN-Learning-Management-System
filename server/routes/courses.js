const express = require('express');
const router = express.Router();
const { auth, teacherOnly } = require('../middleware/auth');
const courseController = require('../controllers/courseController');

// Public routes
router.get('/', auth, courseController.getCourses);
router.get('/:id', auth, courseController.getCourseById);

// Teacher routes
router.post('/', auth, teacherOnly, courseController.createCourse);
router.put('/:id', auth, teacherOnly, courseController.updateCourse);
router.delete('/:id', auth, teacherOnly, courseController.deleteCourse);
router.post('/:id/resource', auth, teacherOnly, courseController.addResource);
router.delete('/:courseId/resource/:resourceId', auth, teacherOnly, courseController.removeResource);
router.get('/teacher/my-courses', auth, teacherOnly, courseController.getTeacherCourses);

// Student routes
router.post('/:id/enroll', auth, courseController.enrollStudent);
router.get('/student/enrolled', auth, courseController.getEnrolledCourses);

module.exports = router;
