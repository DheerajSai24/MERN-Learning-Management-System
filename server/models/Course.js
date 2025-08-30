const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resources: [{
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['pdf', 'video', 'link'],
            required: true
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    syllabus: [{
        unit: String,
        topics: [String]
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
