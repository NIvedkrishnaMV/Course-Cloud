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
   university: {
       type: String,
       required: true
   },
   course: {
       type: String,
       required: true
   }
});

const TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = TeacherModel;
