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

//GET      /api/post/id
//@access   Private
//@description  Edit post shwo on view
router.get('/post/:pid/edit', Auth, PostController.edit);

//PUT      /api/post/id
//@access   Private
//@description  Update post
router.put('/post/:pid', Auth, PostController.upload.single('file'), PostController.update);

//DELETE      /api/post/id
//@access   Private
//@description  Delete post
router.delete('/post/:pid', Auth, PostController.destroy);

module.exports=router;
