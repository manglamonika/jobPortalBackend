const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{type:String , required:true},
    lastName:{type:String , required:true},
    email:{type:String , require:true , unique:true},
    password:{type:String , require:true},
    number:{type:String , require:true},


    bio:{type:String , require:true},
    education:{type:String , require:true},
    location:{type:String , require:true},
    mobile:{type:String , require:true},
    availability:{type:String , require:true},
    gender:{type:String , enum:["Male","Female","other"]},
    resume:{type:String , require:true},
    // email:{type:String , require:true},
    profilePhoto:{type:String , require:true},
}, {timestamps:true})

const User=mongoose.model('user',userSchema);

module.exports=User