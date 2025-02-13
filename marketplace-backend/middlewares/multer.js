const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
    // Set destination for uploaded files
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Ensure the `uploads` folder exists
    },
    // Set filename for uploaded files
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalName = file.originalname;
        const sanitizedOriginalName = originalName.replace(/\s+/g, '_');
        cb(null, `${timestamp}-${sanitizedOriginalName}`);
    },
});

// Multer file filter to validate file type
const fileFilter = (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only image files are allowed!'), false);
    }
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB file size limit
    },
});

module.exports = upload;
