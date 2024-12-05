const mongoose =require('mongoose');


const CuserSchema= mongoose.Schema({
   uname:{
    type: String,
    required: true
  },
   email: {
     type: String,
    required: true
  },
   password:{
    type: String,
    required: true
   },
   age:{
    type: Number,
    required: true
   },
   gender:{
    type: String,
    required: true
   },
   phone:{
    type: Number,
    required: true
   }
 })

 const CuserModel=mongoose.model('CurrentUser',CuserSchema)

 module.exports=CuserModel;