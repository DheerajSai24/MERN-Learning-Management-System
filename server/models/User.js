const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        required: true
    },
    profileInfo: {
        avatar: String,
        bio: String,
        phone: String
    },
    settings: {
        twoFactorEnabled: {
            type: Boolean,
            default: false
        },
        connectedAccounts: {
            google: {
                type: Boolean,
                default: false
            },
            github: {
                type: Boolean,
                default: false
            }
        },
        notifications: {
            courseUpdates: {
                type: Boolean,
                default: true
            },
            assignmentReminders: {
                type: Boolean,
                default: true
            },
            discussionReplies: {
                type: Boolean,
                default: false
            },
            promotionalEmails: {
                type: Boolean,
                default: false
            }
        },
        display: {
            theme: {
                type: String,
                enum: ['light', 'dark'],
                default: 'light'
            },
            fontSize: {
                type: String,
                enum: ['small', 'medium', 'large'],
                default: 'medium'
            }
        },
        language: {
            type: String,
            default: 'English'
        }
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    progress: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        completedUnits: [String],
        lastAccessed: Date
    }]
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Method to check password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
