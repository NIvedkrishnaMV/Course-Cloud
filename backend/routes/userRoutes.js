const express=require('express');
const router=express.Router();
// const LoginModel=require('../model/login');
const UserModel=require('../model/UserModel')


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.post('/log', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(404).json("You missed a required data");
   
//   }
//   else{
//   try {
//     const user = await UserModel.findOne({ email: email });
//     if (!user) {
//       return res.status(404).json("Email not registered");
//     }
//     else if (user.password !== password) {
//       return res.status(404).json("Incorrect password");
//     }
//     else{
//       const loginModel = new LoginModel({
//         uname: user.uname,
//         email: user.email,
//         password: user.password,
//         age: user.age,
//         address: user.address,
//         UserType: user.UserType
//       });
//       await loginModel.save();
//       return res.status(200).json(user);
//     }
//   } catch (error) {
//     return res.status(404).json(error);
//   }
// }
// });

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