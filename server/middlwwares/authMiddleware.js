const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to strictly protect routes (must be logged in)
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ msg: 'Not authorized, user not found' });
            }
            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            res.status(401).json({ msg: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ msg: 'Not authorized, no token' });
    }
};

// Middleware to optionally attach user if token exists, but not fail if missing
const optionalAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
            req.user = await User.findById(decoded.id).select('-password');
        } catch (error) {
            // Ignore errors for optional auth
        }
    }
    next();
};

module.exports = { protect, optionalAuth };
