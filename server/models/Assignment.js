const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    totalPoints: {
        type: Number,
        required: true
    },
    submissions: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        fileUrl: String,
        submittedAt: {
            type: Date,
            default: Date.now
        },
        grade: Number,
        feedback: String
    }]
}, {
    timestamps: true
});

const Assignment = mongoose.model('Assignment', assignmentSchema);
module.exports = Assignment;
