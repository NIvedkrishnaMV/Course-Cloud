const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
 pdf:String,
 title:String,
 author:String,
 university:String,
 course:String,
 sem:String
},{collection:"pdfDetails"});

const UploadModel = mongoose.model('pdfDetails', UploadSchema);

module.exports = UploadModel;