const express=require('express');
const router=express.Router();
const UserModel=require('../model/UserModel')
const CuserModel=require('../model/CurrentUser');


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
        const adduser=new CuserModel({
          uname:user.uname,
          email:user.email,
          password:user.password,
          age:user.age,
          gender:user.gender,
          phone:user.phone
        });
        await adduser.save();
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
router.get('/proView',async(req,res)=>{
  try{
    CuserModel.find({}).then(data=>{
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