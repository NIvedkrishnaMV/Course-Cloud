const express=require('express');
const router=express.Router();
const UserModel=require('../model/UserModel')


router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post('/log', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "admin@gmail.com" && password === "admin") {
      return res.status(200).json({ isAdmin:true });
    }
    else
    {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "Email not registered" });
      }
      else if (await password  === user.password) {
        return res.status(200).json({ isAdmin:false });
      } else {
        return res.status(401).json({ error: "Incorrect password" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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
  return res.json(adduser);
 } catch (error) {
  return res.send('Couldnt sign up');
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


module.exports = router;