const express = require('express');
const router = express.Router();


const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/category/categoryController');
// Assuming authenticateUser is a general authentication middleware.
// If specific admin rights are needed, an additional isAdmin middleware might be used.
const { authenticateUser } = require('../middlewares/authorizedUser');

// GET all categories (public)
// This route was used by the frontend property form: GET /api/category
router.get('/', getCategories);

// GET single category by ID (public or can be protected if needed)
router.get('/:id', getCategoryById);

// CREATE category (protected, e.g., requires authentication, possibly admin role)
// Note: If 'isAdmin' middleware exists and is required, it should be added:
// router.post('/', authenticateUser, isAdmin, createCategory);
router.post('/', authenticateUser, createCategory);

// UPDATE category (protected)
// router.put('/:id', authenticateUser, isAdmin, updateCategory);
router.put('/:id', authenticateUser, updateCategory);

// DELETE category (protected)
// router.delete('/:id', authenticateUser, isAdmin, deleteCategory);
router.delete('/:id', authenticateUser, deleteCategory);

module.exports = router;
