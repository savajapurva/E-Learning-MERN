const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import Category model
const Category = require('../../models/Category');

// Import validation (create this if you don't have it)
// const validateCategoryInput = require('../../validation/category');

// @route   POST /api/category/add
// @desc    Create a new category
// @access  Private (Admin only)
router.post('/category/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Input validation
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "Request body is missing"
        });
    }

    // Check if category already exists
    Category.findOne({ categoryName: req.body.categoryName })
        .then(existingCategory => {
            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    message: "Category already exists"
                });
            }

            // Create new category
            const newCategory = new Category(req.body);
            
            newCategory.save()
                .then(doc => {
                    res.status(201).json({
                        success: true,
                        message: "Category created successfully",
                        data: doc
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: "Error creating category",
                        error: err.message
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Error checking existing category",
                error: err.message
            });
        });
});

// @route   GET /api/category/:id
// @desc    Get single category by ID
// @access  Public
router.get('/category/:id', (req, res) => {
    Category.findById(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
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
                message: "Error fetching category",
                error: err.message
            });
        });
});

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', (req, res) => {
    // Add pagination support
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    Category.find()
        .skip(skip)
        .limit(limit)
        .sort({ no: 1 }) // Sort by category number
        .then(docs => {
            // Get total count for pagination
            Category.countDocuments()
                .then(total => {
                    res.setHeader('Content-Range', `categories ${skip}-${skip + docs.length}/${total}`);
                    res.status(200).json({
                        success: true,
                        count: docs.length,
                        total: total,
                        page: page,
                        pages: Math.ceil(total / limit),
                        data: docs
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Error fetching categories",
                error: err.message
            });
        });
});

// @route   PUT /api/category/:id
// @desc    Update category by ID
// @access  Private (Admin only)
router.put('/category/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "Request body is missing"
        });
    }

    Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }
            res.status(200).json({
                success: true,
                message: "Category updated successfully",
                data: doc
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Error updating category",
                error: err.message
            });
        });
});

// @route   DELETE /api/category/:id
// @desc    Delete category by ID
// @access  Private (Admin only)
router.delete('/category/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(doc => {
            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found"
                });
            }
            res.status(200).json({
                success: true,
                message: "Category deleted successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Error deleting category",
                error: err.message
            });
        });
});

// @route   GET /api/categories/search
// @desc    Search categories by name
// @access  Public
router.get('/categories/search', (req, res) => {
    const { query } = req.query;
    
    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Search query is required"
        });
    }

    Category.find({
        categoryName: { $regex: query, $options: 'i' }
    })
        .sort({ no: 1 })
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
                message: "Error searching categories",
                error: err.message
            });
        });
});

module.exports = router;