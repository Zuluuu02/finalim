import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import { saveFileToDatabase } from './database';

const router = Router();


const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + extname(file.originalname));
    },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { file } = req;
        const { style } = req.body;

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

export default router;
