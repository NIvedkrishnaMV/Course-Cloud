const express = require('express');
const multer = require('multer');
const router = express();
const UploadModel = require('../model/UploadModel');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: './uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
    const {filename,uploadedBy}=req.body;
  try {
    const uploadFile = new UploadModel({
      filename,
      filedata: req.file.buffer,
      fileSize: req.file.size,
      uploadedBy
    });

    await uploadFile.save();
    return res.send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error uploading file');
  }
});