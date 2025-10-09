const express = require('express');
const router = express.Router();

// Import models
const Course = require('../../models/Course');
const Category = require('../../models/Category');
const User = require('../../models/User');

// Import middleware
const { authenticateToken, requireAdmin, requireInstructor, validateInput } = require('../../middleware/auth');

// Import validation (create this if needed)
// const validateCourseInput = require('../../validation/course');

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private (Instructor/Admin only)
router.post('/courses', 
    authenticateToken, 
    requireInstructor,
    // validateInput(validateCourseInput), // Uncomment when validation is ready
    async (req, res) => {
        try {
            // Check if category exists
            const category = await Category.findById(req.body.categoryId);
            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category ID'
                });
            }

            // Create new course
            const courseData = {
                ...req.body,
                instructor: req.user.id, // Set instructor from authenticated user
                category: req.body.categoryId
            };

            const newCourse = new Course(courseData);
            const savedCourse = await newCourse.save();
            
            // Populate the response with related data
            const populatedCourse = await Course.findById(savedCourse._id)
                .populate('instructor', 'name email')
                .populate('category', 'categoryName');

            res.status(201).json({
                success: true,
                message: 'Course created successfully',
                data: populatedCourse
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating course',
                error: error.message
            });
        }
    }
);

// @route   GET /api/courses
// @desc    Get all courses with pagination and filtering
// @access  Public
router.get('/courses', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Build filter object
        let filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        if (req.query.instructor) {
            filter.instructor = req.query.instructor;
        }
        if (req.query.search) {
            filter.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { description: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        const courses = await Course.find(filter)
            .populate('instructor', 'name email')
            .populate('category', 'categoryName')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Course.countDocuments(filter);

        res.status(200).json({
            success: true,
            count: courses.length,
            total: total,
            page: page,
            pages: Math.ceil(total / limit),
            data: courses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
});

// @route   GET /api/courses/:id
// @desc    Get single course by ID
// @access  Public
router.get('/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name email avatar')
            .populate('category', 'categoryName')
            .populate('lectures');

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching course',
            error: error.message
        });
    }
});

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private (Course instructor or Admin only)
router.put('/courses/:id', 
    authenticateToken,
    async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            // Check if user is the instructor of this course or admin
            const user = await User.findById(req.user.id);
            if (course.instructor.toString() !== req.user.id && user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to update this course'
                });
            }

            const updatedCourse = await Course.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            )
            .populate('instructor', 'name email')
            .populate('category', 'categoryName');

            res.status(200).json({
                success: true,
                message: 'Course updated successfully',
                data: updatedCourse
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating course',
                error: error.message
            });
        }
    }
);

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private (Course instructor or Admin only)
router.delete('/courses/:id', 
    authenticateToken,
    async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not found'
                });
            }

            // Check if user is the instructor of this course or admin
            const user = await User.findById(req.user.id);
            if (course.instructor.toString() !== req.user.id && user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Not authorized to delete this course'
                });
            }

            await Course.findByIdAndDelete(req.params.id);

            res.status(200).json({
                success: true,
                message: 'Course deleted successfully'
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting course',
                error: error.message
            });
        }
    }
);

// @route   GET /api/courses/instructor/:instructorId
// @desc    Get courses by instructor
// @access  Public
router.get('/courses/instructor/:instructorId', async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.params.instructorId })
            .populate('instructor', 'name email')
            .populate('category', 'categoryName')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching instructor courses',
            error: error.message
        });
    }
});

// @route   GET /api/courses/category/:categoryId
// @desc    Get courses by category
// @access  Public
router.get('/courses/category/:categoryId', async (req, res) => {
    try {
        const courses = await Course.find({ category: req.params.categoryId })
            .populate('instructor', 'name email')
            .populate('category', 'categoryName')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching category courses',
            error: error.message
        });
    }
});

module.exports = router;