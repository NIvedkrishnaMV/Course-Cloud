const mongoose =require('mongoose');


const CteacherSchema= mongoose.Schema({
   tname:{
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
   university:{
    type: String,
    required: true
   },
   course:{
    type: String,
    required: true
   }
 })

 const CteacherModel=mongoose.model('CTeacher',CteacherSchema);

 module.exports=CteacherModel;