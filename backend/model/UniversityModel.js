const mongoose =require('mongoose');


const UniversitySchema= mongoose.Schema({
   universityName:{
    type: String,
    required: true
  },
   place: {
     type: String,
    required: true
  }
})

 const UniversityModel=mongoose.model('University',UniversitySchema);

 module.exports = UniversityModel;