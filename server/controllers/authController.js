const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password,
            role
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.json({
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        
        // Check if email already exists for another user
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }
        
        // Update profile
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData['profileInfo.phone'] = phone;
        
        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');
        
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        // Get user with password
        const user = await User.findById(req.user._id);
        
        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        
        // Update password
        user.password = newPassword;
        await user.save();
        
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const { settingsType, settings } = req.body;
        
        // Validate settings type
        const validSettingsTypes = ['twoFactorEnabled', 'connectedAccounts', 'notifications', 'display', 'language'];
        if (!validSettingsTypes.includes(settingsType)) {
            return res.status(400).json({ message: 'Invalid settings type' });
        }
        
        // Prepare update object
        const updateData = {};
        updateData[`settings.${settingsType}`] = settings;
        
        // Update settings
        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');
        
        res.json({ message: 'Settings updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating settings', error: error.message });
    }
};

exports.exportAccountData = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        
        // Get additional user data if needed
        // Example: enrolled courses, submissions, etc.
        
        // Format data for export
        const exportData = {
            profile: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileInfo: user.profileInfo,
                joinDate: user.createdAt
            },
            settings: user.settings,
            courses: user.enrolledCourses,
            progress: user.progress
        };
        
        res.json({ message: 'Account data exported successfully', data: exportData });
    } catch (error) {
        res.status(500).json({ message: 'Error exporting account data', error: error.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        // For a real implementation, you may want to add additional verification
        // such as password confirmation before deletion
        
        await User.findByIdAndDelete(req.user._id);
        
        // In a production app, you would also want to:
        // 1. Delete or anonymize user's content (assignments, discussion posts, etc.)
        // 2. Remove user from any groups or courses
        // 3. Revoke active sessions/tokens
        
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting account', error: error.message });
    }
};
