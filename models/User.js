const mongoose=require("mongoose");

const userSchema=new mongoose.userSchema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }},

    {timestamps:true}
);

module.exports=mongoose.model("user",userSchema);