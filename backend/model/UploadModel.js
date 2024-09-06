const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filedata: {
    type: Buffer,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  uploadedBy: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const UploadModel = mongoose.model('Upload', UploadSchema);

module.exports = UploadModel;