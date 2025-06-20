const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/property/categoryController');
const { authenticateUser, isLandlord } = require('../middlewares/authorizedUser');
const categoryUpload = require('../middlewares/category/categoryUpload');

// CREATE Category
// Assuming 'image' is the field name for category image upload used by multer
router.post(
    '/',
    authenticateUser,
    isLandlord,
    categoryUpload.single('image'),
    createCategory
);

// GET all Categories
router.get('/', getCategories);

// GET Category by ID
router.get('/:id', getCategoryById);

// UPDATE Category
// Assuming 'image' is the field name for category image upload
router.put(
    '/:id',
    authenticateUser,
    isLandlord,
    categoryUpload.single('image'),
    updateCategory
);

// DELETE Category
router.delete('/:id', authenticateUser, isLandlord, deleteCategory);

module.exports = router;
