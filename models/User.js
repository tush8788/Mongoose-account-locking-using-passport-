const mongoose=require('mongoose');

//acount locking 
const locking=require('mongoose-account-locking');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
//this is for account locking 
var options={
    maxLoginAttempts:5,
    lockTime:1*6*60*100,
    username:'email',
    password:'password'
};

userSchema.plugin(locking,options);


const User=mongoose.model('User',userSchema);
module.exports=User;