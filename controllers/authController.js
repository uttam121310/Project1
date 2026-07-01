const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register=async(req,res)=>{
    try{
         const {name, email, password}= req.body;
         const oldUser = await User.findOne({email});
         if(oldUser){
            return res.status(400).json({
                success:false,
                message:"User Already exist"
            });
         }
         const hashPassword = await bcrypt.hash(password,10);
         const user =await User.create({name,email,password:hashPassword});

         res.status(201).json({
            success:true,
            message:"User registerd",
            user
         })

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Unable to Register",
            error:err
        })
    }
};

const login =async (req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email"
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid password"
            });
        }
        const token = jwt.sign({id:user._id,email:user.email},process.env.SECRET_KEY,{expiresIn:"2d"})

        res.json({
            success:true,
            message:"login successfully",
            token,
            data:user
        })
    }
    catch{err}{
        res.status(401).json({
            success:false,
            message:"Unable to login",
            error:err
        });
    }
};

const profile =(req,res)=>{
    res.json({
        success:true,
        message:"Profile Fetched",
        user:req.user
    })
};

const logout = (req,res)=>{
    res.json({
        success:true,
        message:"Please delete token"
    })
};

module.exports={register, login, profile, logout};