const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
    content: {
        type: String,
        required: true
    },
    tags: [String],
    attachments: [{
        name: String,
        url: String
    }]
}, {
    timestamps: true
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
