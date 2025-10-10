const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import your model (replace with actual model)
const ExampleModel = require('../../models/Example');

// Import validation (if you have it)
const validateInput = require('../../validation/example');

// @route   POST /api/example
// @desc    Create a new record
// @access  Private (or Public)
router.post('/example', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Validate input
    const { errors, isValid } = validateInput(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Create new record
    const newExample = new ExampleModel(req.body);
    
    newExample.save()
        .then(doc => {
            res.status(201).json({
                success: true,
                message: 'Record created successfully',
                data: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error creating record',
                error: err.message
            });
        });
});

// @route   GET /api/example
// @desc    Get all records
// @access  Public
router.get('/example', (req, res) => {
    // Optional: Add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    ExampleModel.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }) // Sort by newest first
        .then(docs => {
            res.status(200).json({
                success: true,
                count: docs.length,
                data: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error fetching records',
                error: err.message
            });
        });
});

// @route   GET /api/example/:id
// @desc    Get single record by ID
// @access  Public
router.get('/example/:id', (req, res) => {
    ExampleModel.findById(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Record not found'
                });
            }
            res.status(200).json({
                success: true,
                data: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error fetching record',
                error: err.message
            });
        });
});

// @route   PUT /api/example/:id
// @desc    Update record by ID
// @access  Private
router.put('/example/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Validate input
    const { errors, isValid } = validateInput(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }

    ExampleModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Record not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Record updated successfully',
                data: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error updating record',
                error: err.message
            });
        });
});

// @route   DELETE /api/example/:id
// @desc    Delete record by ID
// @access  Private
router.delete('/example/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    ExampleModel.findByIdAndDelete(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Record not found'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Record deleted successfully'
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error deleting record',
                error: err.message
            });
        });
});

// @route   GET /api/example/search
// @desc    Search records
// @access  Public
router.get('/example/search', (req, res) => {
    const { query, field } = req.query;
    
    if (!query) {
        return res.status(400).json({
            success: false,
            message: 'Search query is required'
        });
    }

    const searchField = field || 'name'; // Default search field
    const searchQuery = {
        [searchField]: { $regex: query, $options: 'i' } // Case-insensitive search
    };

    ExampleModel.find(searchQuery)
        .then(docs => {
            res.status(200).json({
                success: true,
                count: docs.length,
                data: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error searching records',
                error: err.message
            });
        });
});

module.exports = router;