const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { analyzeMedia, analyzeText, getReport, getHistory } = require('../controllers/analyzeController');
const { protect, optionalAuth } = require('../middlwwares/authMiddleware');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

router.post('/media', optionalAuth, upload.single('file'), analyzeMedia);
router.post('/text', optionalAuth, analyzeText);
router.get('/report/:id', getReport);
router.get('/history', protect, getHistory);

module.exports = router;
