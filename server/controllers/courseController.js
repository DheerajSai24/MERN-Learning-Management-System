const Course = require('../models/Course');
const User = require('../models/User');

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate('teacherId', 'name email')
            .select('-students'); // Don't send the full student list for all courses
        
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
};

// Get a single course
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('teacherId', 'name email')
            .populate('students', 'name email');
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error: error.message });
    }
};

// Create a new course (teachers only)
exports.createCourse = async (req, res) => {
    try {
        // Ensure the creator is a teacher (double-checking)
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ message: 'Only teachers can create courses' });
        }
        
        const { title, description, syllabus, startDate, endDate } = req.body;
        
        const newCourse = new Course({
            title,
            description,
            teacherId: req.user._id, // The logged-in teacher
            syllabus: syllabus || [],
            startDate,
            endDate,
            resources: [],
            students: []
        });
        
        await newCourse.save();
        
        res.status(201).json({
            message: 'Course created successfully',
            course: newCourse
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
};

// Update a course (teachers only)
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Ensure the teacher is the owner of the course
        if (course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only update your own courses' });
        }
        
        const { title, description, syllabus, startDate, endDate } = req.body;
        
        // Update course fields
        course.title = title || course.title;
        course.description = description || course.description;
        course.syllabus = syllabus || course.syllabus;
        course.startDate = startDate || course.startDate;
        course.endDate = endDate || course.endDate;
        
        await course.save();
        
        res.json({
            message: 'Course updated successfully',
            course
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error: error.message });
    }
};

// Delete a course (teachers only)
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Ensure the teacher is the owner of the course
        if (course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only delete your own courses' });
        }
        
        await Course.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
};

// Add resource to course (teachers only)
exports.addResource = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Ensure the teacher is the owner of the course
        if (course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only add resources to your own courses' });
        }
        
        const { title, link, type } = req.body;
        
        course.resources.push({
            title,
            link,
            type,
            uploadedAt: new Date()
        });
        
        await course.save();
        
        res.status(201).json({
            message: 'Resource added successfully',
            resource: course.resources[course.resources.length - 1]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding resource', error: error.message });
    }
};

// Remove resource from course (teachers only)
exports.removeResource = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Ensure the teacher is the owner of the course
        if (course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only remove resources from your own courses' });
        }
        
        const resourceId = req.params.resourceId;
        
        // Find and remove the resource
        const resourceIndex = course.resources.findIndex(resource => 
            resource._id.toString() === resourceId
        );
        
        if (resourceIndex === -1) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        
        course.resources.splice(resourceIndex, 1);
        await course.save();
        
        res.json({ message: 'Resource removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing resource', error: error.message });
    }
};

// Enroll student in course
exports.enrollStudent = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Check if user is already enrolled
        if (course.students.includes(req.user._id)) {
            return res.status(400).json({ message: 'You are already enrolled in this course' });
        }
        
        // Add student to course
        course.students.push(req.user._id);
        await course.save();
        
        // Add course to student's enrolledCourses
        const user = await User.findById(req.user._id);
        user.enrolledCourses.push(course._id);
        user.progress.push({
            course: course._id,
            completedUnits: [],
            lastAccessed: new Date()
        });
        await user.save();
        
        res.json({
            message: 'Enrolled in course successfully',
            course: {
                id: course._id,
                title: course.title
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling in course', error: error.message });
    }
};

// Get courses created by a teacher
exports.getTeacherCourses = async (req, res) => {
    try {
        // Ensure the user is a teacher
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ message: 'Access denied. Teachers only.' });
        }
        
        const courses = await Course.find({ teacherId: req.user._id })
            .populate('students', 'name email');
        
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teacher courses', error: error.message });
    }
};

// Get courses enrolled by a student
exports.getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: 'enrolledCourses',
                populate: {
                    path: 'teacherId',
                    select: 'name email'
                }
            });
        
        res.json(user.enrolledCourses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching enrolled courses', error: error.message });
    }
};
