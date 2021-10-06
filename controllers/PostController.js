const Post=require('../models/Post');
const multer=require('multer');

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
        const {title, description}=req.body;
        //Validation

        const newPost=new Post({
            title,
            description,
            image:req.file.path,
            user: req.user
        })
        const savedData=await newPost.save();
        res.json(savedData);

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


//File storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString()+file.originalname)
    }
  })

//file filter
const fileFilter=(req, file, cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

exports.upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:fileFilter
})