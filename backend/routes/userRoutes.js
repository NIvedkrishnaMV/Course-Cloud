const express=require('express');
const router=express.Router();
const UserModel=require('../model/UserModel')


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/log', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "Email not registered" });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    return res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


 router.post("/reg", async(req,res)=>{
  const {uname ,email, password ,age}=req.body;
 try {
  const adduser=new UserModel({
    uname,
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

module.exports = router;