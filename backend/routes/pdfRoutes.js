const express = require('express');
const multer = require('multer');
const router = express();
const UploadModel = require('../model/UploadModel');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const upload = multer({
  dest: './uploads/',
  limits: { fileSize: 1024 * 1024 * 50 }, 
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const uploadFile = new UploadModel({
      filename: req.file.originalname,
      filedata: req.file.buffer,
      fileSize: req.file.size
    });

    await uploadFile.save();
    return res.send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error uploading file');
  }
});