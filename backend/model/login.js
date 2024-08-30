const mongoose=require('mongoose');

const loginSchema= mongoose.Schema({
    uname:{
        type: String,
        required: true
      },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required: true
    }
});

const LoginModel=mongoose.model('Logins',loginSchema)

module.exports=LoginModel;