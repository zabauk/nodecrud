const Post=require('../models/Post');
const multer=require('multer');

exports.create=async (req, res)=>{
    try {
        console.log(req.cookies);
        const {title, description}=req.body;
        //check validation
        const newPost=new Post({
            title,
            description,
            image:req.file.path,
            user: req.user
        })
        const savedData=await newPost.save();
        res.json({msg: savedData});

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


//File storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './client/public/uploads')
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