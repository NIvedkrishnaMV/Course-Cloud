const express = require('express');
const router = express.Router();
const TeacherModel = require('../model/TeacherModel');
const CourseModel = require('../model/CourseModel');
const UniversityModel = require('../model/UniversityModel');
const CteacherModel = require('../model/CurrentTeacher');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const generateToken = (id) =>{
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1h'});
}

router.post("/reg", async(req,res)=>{
  const {tname ,email, password ,age,gender,phone}=req.body;
 try {
  const adduser=new TeacherModel({
    tname,
    email,
    password,
    age,
    gender,
    phone
  });
  await adduser.save();
  return res.status(200).json({ message: 'Signup successful!', status: 'success' });
 } catch (error) {
  return res.status(500).json({ message: 'Signup failed. Please try again later.', status: 'error' });
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
    const user =await TeacherModel.findOne({email});
    if(user && (password == user.password )){
      const token = generateToken(user._id);
      return res.json({message: "Login successful", token, status: 'success' });
    }
    res.status(401).json({message: "Invalid credentials", status: 'error' });
  
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

  router.get('/profile', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await TeacherModel.findById(decoded.id);
        return res.json(user);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
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

router.put('/edit/:id', async (req, res) => {
  try {
    const userId = req.params.id; 
    const updatedData = req.body; 

    const updatedUser = await TeacherModel.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
