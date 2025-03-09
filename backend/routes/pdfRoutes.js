const express = require('express');
const router = express.Router();
const UploadModel = require('../model/UploadModel');
const multer  = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



router.post("/upload-files",upload.single("file"),async(req,res)=>{
  console.log(req.file);
  const title=req.body.title;
  const fileName= req.file.filename;
  const author=req.body.author;
  const university=req.body.university;
  const course=req.body.course;
  const sem=req.body.sem;
  try {
    await UploadModel.create({title : title , pdf : fileName , author : author , university : university , course : course , sem : sem });
    res.send({ status:"ok"});
  } catch (error) {
    res.send({status:error});
  }
})

router.get("/view",async (req,res)=>{
  try {
    UploadModel.find({}).then(data=>{
      res.send({status:"ok" ,data :data });
    })
  } catch (error) {
    
  }
});

router.get('/w-view', async (req, res) => {
  try {
    const user = req.query.user;
    const data = await UploadModel.find({ author: user });
    res.json({ status: "ok", data: data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});


router.get("/see/:id", async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  try {
    // Find the document by ID
    const document = await UploadModel.findById(id);
    if (!document) {
      return res.status(404).send({ status: "error", message: "File not found" });
    }
    return res.status(200).send(document);
   
  } catch (error) {
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
});

router.delete('/del/:id',async(req,res)=>{
  const { id } = req.params;
  try {
    const document = await UploadModel.findById(id);
    if (!document) {
      return res.status(404).send({ status: "error", message: "File not found" });
    }
    await UploadModel.findByIdAndDelete(id);
    return  res.status(200).send({ status: "ok", message: "File deleted successfully" });

  }
  catch(error){
    res.status(404).send({status:error});
  }
});
router.put('/update-file/:id', async (req, res) => {
  const { id } = req.params; // File ID from URL parameters
  const { title, author, university, course, sem } = req.body; // File details from form data

  try {
    // Find the file by ID
    const existingFile = await UploadModel.findById(id);
    if (!existingFile) {
      return res.status(404).json({ status: 'error', message: 'File not found' });
    }

    // Update only the fields provided in the request body
    existingFile.title = title || existingFile.title;
    existingFile.author = author || existingFile.author;
    existingFile.university = university || existingFile.university;
    existingFile.course = course || existingFile.course;
    existingFile.sem = sem || existingFile.sem;

    // Save the updated file details to the database
    await existingFile.save();

    res.json({ status: 'ok', message: 'File details updated successfully' });
  } catch (error) {
    console.error('Error updating file details:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

router.get('/get-file/:id', async (req, res) => {
  const { id } = req.params; // Extract file ID from URL parameters

  try {
    // Find the file by ID in the database
    const file = await UploadModel.findById(id);
    if (!file) {
      return res.status(404).json({ status: 'error', message: 'File not found' });
    }

    // Return the file data as a JSON response
    res.json(file);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
})

module.exports = router;