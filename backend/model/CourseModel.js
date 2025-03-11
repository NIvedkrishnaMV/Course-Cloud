const mongoose =require('mongoose');


const CourseSchema= mongoose.Schema({
   courseName:{
    type: String,
    required: true
  },
   years: {
     type: Number,
    required: true
  }
})

 const CourseModel=mongoose.model('Course',CourseSchema);

 module.exports = CourseModel;