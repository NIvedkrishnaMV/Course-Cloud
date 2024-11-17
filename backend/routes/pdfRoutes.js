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
  try {
    await UploadModel.create({title : title , pdf : fileName});
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
})


module.exports = router;