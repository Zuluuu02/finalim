const express = require('express');
const multer = require('multer');
const path = require('path');
const { saveFileToDatabase } = require('./database'); // Assumes you have a function to save file info to DB

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { file } = req;
        const { style } = req.body;

        // Save file info to database
        await saveFileToDatabase({
            filename: file.filename,
            style,
            path: `/uploads/${file.filename}`,
        });

        res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to upload file' });
    }
});

module.exports = router;
