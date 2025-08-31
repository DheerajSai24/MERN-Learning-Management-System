require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

// Default settings to apply to all users
const defaultSettings = {
    twoFactorEnabled: false,
    connectedAccounts: {
        google: false,
        github: false
    },
    notifications: {
        courseUpdates: true,
        assignmentReminders: true,
        discussionReplies: false,
        promotionalEmails: false
    },
    display: {
        theme: 'light',
        fontSize: 'medium'
    },
    language: 'English'
};

async function updateUserSettings() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Find all users without settings
        const users = await User.find({ settings: { $exists: false } });
        console.log(`Found ${users.length} users without settings`);

        // Update users with default settings
        for (let user of users) {
            user.settings = defaultSettings;
            await user.save();
            console.log(`Updated settings for user: ${user.name} (${user.email})`);
        }

        console.log('All users updated successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error updating user settings:', error);
        process.exit(1);
    }
}

updateUserSettings();
