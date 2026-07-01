
const Post = require("../models/Post");

const createPost=async (req,res) =>{
    try{
    const {tittle, description}= req.body;
    if(!tittle || !description) {
        return res.status(400).json({
            success:false,
            message:"Tittle and Description are required"
        });
    }
    const post = await Post.create({tittle, description, user:req.user._id});
    res.status(201).json({
        success:true,
        message:"Post Created Successfully",
        post
    });
}

catch(err){
    res.status(500).json({
        success:false,
        message:"Unable to add post",
        error:err.message
    });
}
};

const getAllPost= async (req,res) =>{
    try{
        const posts = await Post.find().populate("user", "name email");

        res.json({
            success:true,
            message:"All Posts",
            total:posts.length,
            posts
        });
    }

    catch(err){
        res.status(500).json({
            success:false,
            message:"Unable to fetched posts",
            error:err.message
        });
    }
};

const getMyPost =async (req,res) =>{
    try{
        const posts= await Post.find({user:req.user._id});
        res.status(201).json({
            success:true,
            message:"Your Posts",
            total:posts.length,
            posts
        });
    }

    catch(err){
        res.status(500).json({
            success:false,
            message:"Unable to fetch your posts",
            error:err.message
        })
    }
};


const getSinglePost =async (req,res) =>{
    try{
        const {id}=req.params;
        const post= await Post.findById(id);
        if(!post){
        return res.status(401).json({
            success:false,
            message:"post not found",
        });
    }

    res.status(201).json({
        success:true,
        message:"Post Found",
        post
    });
}

    catch(err){
        res.status(500).json({
            success:false,
            message:"unable to fetch your posts",
            error:err.message
        })
    }
};

const updatePost =async (req,res) =>{
    try{
        const{id}=req.params;
        const{tittle, description} = req.body;

        let post = await Post.findById(id);
        if(!post){
            return res.status(401).json({
                success:false,
                message:"Post not found"
            })
        }
        console.log(req.user);
        if(post.user.toString() !==req.user._id.toString()){
            return res.status(403).json({
                success:true,
                message:"you can only update own post",
                

            })
        }

        post.tittle= tittle || post.tittle;
        post.description = description || post.description;
        await post.save();

        res.status(200).json({
            success:true,
            message:"post Updated",

            post
        });
    }

    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Unable to update Post",
            error:err.message
        })
    }
}


const deletePost =async (req,res) =>{
    try{
        connsole.log("req.body");
        const{id}=req.params;
        const{tittle, description} = req.body;

        let post = await Post.findById(id);
        if(!post){
            return res.status(401).json({
                success:false,
                message:"Post not found"
            })
        }
        console.log(req.user);
        if(post.user.toString() !==req.user._id.toString()){
            return res.status(403).json({
                success:true,
                message:"you can only update own post",
            })
        }

        await Post.findByIdAndDelete(id);
        
        res.status(200).json({
            success:true,
            message:"post deleted",
            post
        });
    }

    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Unable to update Post",
            error:err.message
        })
    }
}


module.exports = {createPost, getAllPost, getMyPost, getSinglePost, updatePost, deletePost};