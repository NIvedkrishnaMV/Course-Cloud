const express = require('express');
const router = express.Router();
const TeacherModel = require('../model/TeacherModel');
const CourseModel = require('../model/CourseModel');
const UniversityModel = require('../model/UniversityModel');
const CteacherModel = require('../model/CurrentTeacher')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/reg", async(req,res)=>{
    const {tname ,email, password ,age}=req.body;
   try {
    const adduser = new TeacherModel({
      tname,
      email,
      password,
      age
    });
    await adduser.save();
    return res.json(adduser);
   } catch (error) {
    return res.send('Couldnt sign up');
   }
});

router.get('/view', async(req,res)=>{
    try {
      TeacherModel.find({}).then(data => {
        res.send({status:"ok", data: data });
      });
    } catch {
      res.send({status:"error", data: null });
    }
});

router.post('/log', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await TeacherModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Email not registered" });
        } else if (password === user.password) { 
            console.log(user)
            const adduser=new CteacherModel({
                tname:user.tname,
                email:user.email,
                password:user.password,
                age:user.age
              });
              await adduser.save();
              return res.status(200).json({ redirect: '/landing', isAdmin: false }); // Redirect to landing
        }
        else {
            
            return res.status(401).json({ error: "Incorrect password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/del/:id', async(req,res)=>{
    const { id } = req.params;
    try {
        const document = await TeacherModel.findById(id);
        if (!document) {
            return res.status(404).send({ status: "error", message: "File not found" });
        }
        await TeacherModel.findByIdAndDelete(id);
        return res.status(200).send({ status: "ok", message: "File deleted successfully" });
    } catch(error) {
        res.status(404).send({status:error});
    }
});

router.get('/TView', async (req, res) => {
    try {
      CteacherModel.find({}).then(data => {
        const tnames = data.map(teacher => teacher.tname); // Extract only 'tname'
        return res.json({ data: tnames });
      });
    } catch {
      res.send({ status: "error", data: null });
    }
  });

router.get('/proView',async(req,res)=>{
  try{
    CteacherModel.find({}).then(data=>{
      res.send({status:"ok" ,data :data });
    })
  }
  catch{
    res.send({status:"error" ,data :null });
  }
});
  


router.delete('/logout', async (req, res) => {
  try {
      await CteacherModel.deleteMany({}); // This will delete all entries
      res.status(200).send({ message: 'Logged Out' });
  } catch (error) {
      res.status(500).send({ message: 'Error deleting entries.', error });
  }
});

router.post('/add-course', async (req, res) => {
    const { courseName, years } = req.body;
    try {
        const newCourse = new CourseModel({
            courseName,
            years
        });
        await newCourse.save();
        return res.status(201).json(newCourse); // Respond with the created course
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to add course" });
    }
});

router.get('/cors-view', async(req,res)=>{
    try {
      CourseModel.find({}).then(data => {
        res.send({status:"ok", data: data });
      });
    } catch {
      res.send({status:"error", data: null });
    }
});

router.get('/uni-view', async(req,res)=>{
    try {
      UniversityModel.find({}).then(data => {
        res.send({status:"ok", data: data });
      });
    } catch {
      res.send({status:"error", data: null });
    }
});

router.post('/add-uni', async (req, res) => {
    const { universityName, place } = req.body;
    try {
        const newUniversity = new UniversityModel({
            universityName,
            place
        });
        await newUniversity.save();
        return res.status(201).json(newUniversity); // Respond with the created course
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to add University" });
    }
});

module.exports = router;
