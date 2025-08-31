const Assignment = require('../models/Assignment');
const Course = require('../models/Course');

// Get all assignments for a course
exports.getAssignments = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Get assignments for this course
        const assignments = await Assignment.find({ courseId });
        
        // Customize response based on user role
        if (req.user.role === 'teacher') {
            // Teachers can see all submissions
            res.json(assignments);
        } else {
            // Students only see their own submissions
            const studentAssignments = assignments.map(assignment => {
                const studentSubmission = assignment.submissions.find(
                    sub => sub.studentId.toString() === req.user._id.toString()
                );
                
                return {
                    _id: assignment._id,
                    courseId: assignment.courseId,
                    title: assignment.title,
                    description: assignment.description,
                    deadline: assignment.deadline,
                    totalPoints: assignment.totalPoints,
                    createdAt: assignment.createdAt,
                    updatedAt: assignment.updatedAt,
                    submission: studentSubmission || null
                };
            });
            
            res.json(studentAssignments);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assignments', error: error.message });
    }
};

// Get a single assignment
exports.getAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        
        // Check if the user has access to this course's assignments
        const course = await Course.findById(assignment.courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Associated course not found' });
        }
        
        // For teachers, check if they are the course owner
        if (req.user.role === 'teacher' && course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only access assignments for courses you teach' });
        }
        
        // For students, check if they are enrolled in the course
        if (req.user.role === 'student' && !course.students.includes(req.user._id)) {
            return res.status(403).json({ message: 'You can only access assignments for courses you are enrolled in' });
        }
        
        // Customize response based on user role
        if (req.user.role === 'teacher') {
            // Teachers see full assignment with all submissions
            res.json(assignment);
        } else {
            // Students only see their own submission
            const studentSubmission = assignment.submissions.find(
                sub => sub.studentId.toString() === req.user._id.toString()
            );
            
            const studentAssignment = {
                _id: assignment._id,
                courseId: assignment.courseId,
                title: assignment.title,
                description: assignment.description,
                deadline: assignment.deadline,
                totalPoints: assignment.totalPoints,
                createdAt: assignment.createdAt,
                updatedAt: assignment.updatedAt,
                submission: studentSubmission || null
            };
            
            res.json(studentAssignment);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assignment', error: error.message });
    }
};

// Create a new assignment (teachers only)
exports.createAssignment = async (req, res) => {
    try {
        // Double-check that user is a teacher
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ message: 'Only teachers can create assignments' });
        }
        
        const { courseId, title, description, deadline, totalPoints } = req.body;
        
        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Check if the teacher owns this course
        if (course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only create assignments for your own courses' });
        }
        
        const newAssignment = new Assignment({
            courseId,
            title,
            description,
            deadline,
            totalPoints,
            submissions: []
        });
        
        await newAssignment.save();
        
        res.status(201).json({
            message: 'Assignment created successfully',
            assignment: newAssignment
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating assignment', error: error.message });
    }
};

// Update an assignment (teachers only)
exports.updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        
        // Check if the teacher owns the course this assignment belongs to
        const course = await Course.findById(assignment.courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Associated course not found' });
        }
        
        // Ensure the teacher is the owner of the course
        if (course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only update assignments for your own courses' });
        }
        
        const { title, description, deadline, totalPoints } = req.body;
        
        assignment.title = title || assignment.title;
        assignment.description = description || assignment.description;
        assignment.deadline = deadline || assignment.deadline;
        assignment.totalPoints = totalPoints || assignment.totalPoints;
        
        await assignment.save();
        
        res.json({
            message: 'Assignment updated successfully',
            assignment
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating assignment', error: error.message });
    }
};

// Delete an assignment (teachers only)
exports.deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        
        // Check if the teacher owns the course this assignment belongs to
        const course = await Course.findById(assignment.courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Associated course not found' });
        }
        
        // Ensure the teacher is the owner of the course
        if (course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only delete assignments for your own courses' });
        }
        
        await Assignment.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting assignment', error: error.message });
    }
};

// Submit an assignment (students only)
exports.submitAssignment = async (req, res) => {
    try {
        // Ensure the user is a student
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Only students can submit assignments' });
        }
        
        const assignment = await Assignment.findById(req.params.id);
        
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        
        // Check if the student is enrolled in the course
        const course = await Course.findById(assignment.courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Associated course not found' });
        }
        
        if (!course.students.includes(req.user._id)) {
            return res.status(403).json({ message: 'You are not enrolled in this course' });
        }
        
        // Check if deadline has passed
        if (new Date(assignment.deadline) < new Date()) {
            return res.status(400).json({ message: 'Assignment deadline has passed' });
        }
        
        const { fileUrl } = req.body;
        
        // Check if the student has already submitted
        const submissionIndex = assignment.submissions.findIndex(
            sub => sub.studentId.toString() === req.user._id.toString()
        );
        
        if (submissionIndex !== -1) {
            // Update existing submission
            assignment.submissions[submissionIndex].fileUrl = fileUrl;
            assignment.submissions[submissionIndex].submittedAt = new Date();
            assignment.submissions[submissionIndex].grade = null; // Reset grade on resubmission
            assignment.submissions[submissionIndex].feedback = null; // Reset feedback on resubmission
        } else {
            // Add new submission
            assignment.submissions.push({
                studentId: req.user._id,
                fileUrl,
                submittedAt: new Date(),
                grade: null,
                feedback: null
            });
        }
        
        await assignment.save();
        
        res.json({
            message: 'Assignment submitted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting assignment', error: error.message });
    }
};

// Grade an assignment submission (teachers only)
exports.gradeSubmission = async (req, res) => {
    try {
        // Ensure the user is a teacher
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ message: 'Only teachers can grade assignments' });
        }
        
        const { assignmentId, studentId, grade, feedback } = req.body;
        
        const assignment = await Assignment.findById(assignmentId);
        
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        
        // Check if the teacher owns the course this assignment belongs to
        const course = await Course.findById(assignment.courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Associated course not found' });
        }
        
        // Ensure the teacher is the owner of the course
        if (course.teacherId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only grade assignments for your own courses' });
        }
        
        // Find the student's submission
        const submissionIndex = assignment.submissions.findIndex(
            sub => sub.studentId.toString() === studentId
        );
        
        if (submissionIndex === -1) {
            return res.status(404).json({ message: 'Submission not found' });
        }
        
        // Update the grade and feedback
        assignment.submissions[submissionIndex].grade = grade;
        assignment.submissions[submissionIndex].feedback = feedback;
        
        await assignment.save();
        
        res.json({
            message: 'Submission graded successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error grading submission', error: error.message });
    }
};
