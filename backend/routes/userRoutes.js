const express=require('express');
const router=express.Router();
const UserModel=require('../model/UserModel')
const CuserModel=require('../model/CurrentUser');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const generateToken = (id) =>{
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1h'});
}


router.post('/log', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user =await UserModel.findOne({email});
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

router.get('/profile', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.id);
      return res.json(user);
  } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
  }
});

 router.post("/reg", async(req,res)=>{
  const {uname ,email, password ,age,gender,phone}=req.body;
 try {
  const adduser=new UserModel({
    uname,
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



router.get('/view',async(req,res)=>{
  try{
    UserModel.find({}).then(data=>{
      res.send({status:"ok" ,data :data });
    })
  }
  catch{
    res.send({status:"error" ,data :null });
  }

})


router.delete('/logout', async (req, res) => {
  try {
      await CuserModel.deleteMany({}); // This will delete all entries
      res.status(200).send({ message: 'Logged Out' });
  } catch (error) {
      res.status(500).send({ message: 'Error deleting entries.', error });
  }
});

router.delete('/del/:id',async(req,res)=>{
  const { id } = req.params;
  try {
    const document = await UserModel.findById(id);
    if (!document) {
      return res.status(404).send({ status: "error", message: "File not found" });
    }
    await UserModel.findByIdAndDelete(id);
    return  res.status(200).send({ status: "ok", message: "File deleted successfully" });

  }
  catch(error){
    res.status(404).send({status:error});
  }
})

router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { uname, email, password, age, gender, phone } = req.body;

  try {
    const updatedUser  = await User.findByIdAndUpdate(
      id,
      { uname, email, password, age, gender, phone },
      { new: true } // Return the updated document
    );

    if (!updatedUser ) {
      return res.status(404).json({ message: 'User  not found' });
    }

    res.status(200).json(updatedUser );
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});


module.exports = router;