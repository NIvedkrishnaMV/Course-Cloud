const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
   tname: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true
   },
   password: {
       type: String,
       required: true
   },
   age: {
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
});

const TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = TeacherModel;
