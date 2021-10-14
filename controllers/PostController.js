const Post=require('../models/Post');
const fs=require('fs');//to delete file
const { PostSchema }=require('../requests/Validation');

//get all posts
exports.getPosts=async (req, res)=>{
    try {
        const posts=await Post.find().sort('-date');
        res.json(posts);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

//get each post
exports.Show=async(req, res)=>{
    try {
        const id=req.params.pid;
        const post=await Post.findById(id);
        res.json(post);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

//create post
exports.create=async (req, res)=>{
    try {
        try {
            const value = await PostSchema.validateAsync(req.body, {abortEarly:true});
            const file=req.files.file;
            const filename=Date.now()+file.name;
            file.mv(`uploads/${filename}`, err=>{
                if(err){
                    return res.status(500).json(err);
                }
            });
            const {title, description}=value;
            const newPost=new Post({
                title,
                description,
                image:filename,
                user:req.user
            })
            const data=await newPost.save();
            res.json(data)
        }
        catch (err) {
            res.status(422).json({msg: err.message});
            
        }

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//edit post
exports.edit=async (req, res)=>{
    try {
        const id=req.params.pid;
        const post=await Post.findById(id);
        res.json(post);

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//update post
exports.update=async (req, res)=>{
    try {
        const id=req.params.pid;
        const {title, description}=req.body;
        const updatePost=new Post({
            _id:id,
            title,
            description,
            image: req.file.path,
            user:req.user
        });
        await Post.updateOne(
            {_id: id},
            updatePost
        )
        .then(result=>{
            res.status(201).json({msg: 'Post updated successfully!'});
        }).catch(err=>{
            res.status(500).json({msg: err.message});
        })
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//Delete post
exports.destroy=async (req, res)=>{
    try {
        const id=req.params.pid;
        const post=await Post.findById(id);
        fs.unlinkSync('uploads/'+post.image);
        await Post.findByIdAndDelete({'_id':id});
        res.json(id);

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}