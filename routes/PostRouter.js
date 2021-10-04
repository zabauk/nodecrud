const router=require('express').Router();
const PostController=require('../controllers/PostController');
const Auth=require('../middlewares/AuthToken');

//POST      /api/post
//@access   Private
//@description  Create post
router.post('/post', Auth, PostController.upload.single('file'), PostController.create);


module.exports=router;
