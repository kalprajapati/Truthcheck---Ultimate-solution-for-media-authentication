const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d'
    });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: 'Please add all fields' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ msg: 'Invalid user data' });
        }
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Please add all fields' });
        }

        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ msg: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Forgot Password - Send 4-digit code
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Generate 4-digit code
        const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
        
        // Code expires in 15 minutes
        user.resetCode = resetCode;
        user.resetCodeExpires = Date.now() + 15 * 60 * 1000; 
        await user.save();

        // Send Email Setup
        // Note: For production, configure process.env.EMAIL_USER and EMAIL_PASS
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'test@gmail.com',
                pass: process.env.EMAIL_PASS || 'password123'
            }
        });

        const mailOptions = {
            from: 'TruthCheck Support <no-reply@truthcheck.com>',
            to: user.email,
            subject: 'Your Password Reset Code',
            text: `You requested a password reset. Your 4-digit code is: ${resetCode}\n\nThis code will expire in 15 minutes.`
        };

        // For demo purposes, we will log the code to the console so the user can test without SMTP
        console.log(`\n\n[DEV MODE] 🔐 PASSWORD RESET CODE FOR ${user.email}: ${resetCode}\n\n`);

        try {
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await transporter.sendMail(mailOptions);
            }
            res.status(200).json({ msg: 'Reset code sent to email' });
        } catch (emailError) {
            console.error("Email failed to send. Code was logged to console.", emailError);
            // We still return success in dev so the UI flow works
            res.status(200).json({ msg: 'Reset code generated (check server console)' });
        }

    } catch (error) {
        console.error("Forgot Password error:", error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Verify 4-digit code
// @route   POST /api/auth/verifycode
// @access  Public
const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ 
            email, 
            resetCode: code,
            resetCodeExpires: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired code' });
        }

        res.status(200).json({ msg: 'Code verified successfully' });
    } catch (error) {
        console.error("Verify Code error:", error);
        res.status(500).json({ msg: 'Server error' });
    }
};

// @desc    Reset Password
// @route   POST /api/auth/resetpassword
// @access  Public
const resetPassword = async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;
        
        // Final verify before changing
        const user = await User.findOne({ 
            email, 
            resetCode: code,
            resetCodeExpires: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired code' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
        // Clear reset fields
        user.resetCode = null;
        user.resetCodeExpires = null;
        await user.save();

        res.status(200).json({ msg: 'Password successfully reset' });

    } catch (error) {
        console.error("Reset Password error:", error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    signup,
    login,
    forgotPassword,
    verifyCode,
    resetPassword
};
