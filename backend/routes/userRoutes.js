const express=require('express');
const router=express.Router();
const UserModel=require('../model/UserModel')


router.use(express.json());
router.use(express.urlencoded({ extended: true }));




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