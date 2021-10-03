const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    title: {
        type: String,
        max: 100,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports=Post=mongoose.model('post', PostSchema);