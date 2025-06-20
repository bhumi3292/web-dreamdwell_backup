
const multer = require('multer');
const path = require('path');

// Use memory storage (you can switch to diskStorage if needed)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.mp4', '.mov'].includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

// Export multer instance with no field config yet
const upload = multer({ storage, fileFilter });

module.exports = upload;
