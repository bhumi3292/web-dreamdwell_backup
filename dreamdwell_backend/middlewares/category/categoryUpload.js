const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the destination directory for category uploads
const categoryUploadPath = path.join(__dirname, '../../uploads/categories');

// Ensure the category upload directory exists
// This is good practice, though in a production setup, the deployment script might handle this.
// For development, creating it here is convenient.
fs.mkdirSync(categoryUploadPath, { recursive: true });

// Configure disk storage for category images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, categoryUploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-')); // Sanitize filename a bit
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    // Allow only image types for categories
    if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type for category image. Only common image formats allowed.'), false);
    }
};

// Export multer instance configured for single category image uploads
const categoryUpload = multer({ storage, fileFilter });

module.exports = categoryUpload;
