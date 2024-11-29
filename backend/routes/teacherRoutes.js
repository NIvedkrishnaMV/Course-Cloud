const express=require('express');
const router=express.Router();
const TeacherModel=require('../model/TeacherModel');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/reg", async(req,res)=>{
    const {tname ,email, password ,age,university,course}=req.body;
   try {
    const adduser=new TeacherModel({
      tname,
      email,
      password,
      age,
      university,
      course
    });
    await adduser.save();
    return res.json(adduser);
   } catch (error) {
    return res.send('Couldnt sign up');
   }
   });

router.get('/view',async(req,res)=>{
    try{
      TeacherModel.find({}).then(data=>{
        res.send({status:"ok" ,data :data });
      })
    }
    catch{
      res.send({status:"error" ,data :null });
    }
  
  })


  router.delete('/del/:id',async(req,res)=>{
    const { id } = req.params;
    try {
      const document = await TeacherModel.findById(id);
      if (!document) {
        return res.status(404).send({ status: "error", message: "File not found" });
      }
      await TeacherModel.findByIdAndDelete(id);
      return  res.status(200).send({ status: "ok", message: "File deleted successfully" });
  
    }
    catch(error){
      res.status(404).send({status:error});
    }
  })

  module.exports = router;