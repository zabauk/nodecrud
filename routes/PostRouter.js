const router=require('express').Router();
const PostController=require('../controllers/PostController');
const Auth=require('../middlewares/AuthToken');
const PostRequest=require('../requests/PostRequest');

//GET       /api/posts
//@access   Private
//@description  get all posts
router.get('/posts', Auth, PostController.getPosts);

//GET       /api/post/id
//@access   Private
//@description  get each post
router.get('/post/:pid', Auth, PostController.Show);

//POST      /api/post
//@access   Private
//@description  Create post
router.post('/post', Auth, PostController.upload.single('file'), PostController.create);

//DELETE      /api/post/id
//@access   Private
//@description  Delete post
router.delete('/post/:pid', Auth, PostController.destroy);

module.exports=router;
