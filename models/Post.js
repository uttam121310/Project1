const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    tittle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Post",postSchema);