const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access token is required'
        });
    }

    jwt.verify(token, keys.secretOrKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }
        req.user = decoded;
        next();
    });
};

// Middleware to check if user is admin
const requireAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking user permissions',
            error: error.message
        });
    }
};

// Middleware to check if user is instructor or admin
const requireInstructor = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.role !== 'instructor' && user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Instructor or admin access required'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking user permissions',
            error: error.message
        });
    }
};

// Middleware for input validation
const validateInput = (validationFunction) => {
    return (req, res, next) => {
        const { errors, isValid } = validationFunction(req.body);
        
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors
            });
        }
        
        next();
    };
};

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};

module.exports = {
    authenticateToken,
    requireAdmin,
    requireInstructor,
    validateInput,
    errorHandler
};