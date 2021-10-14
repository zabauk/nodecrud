const router=require('express').Router();
const PostController=require('../controllers/PostController');
const Auth=require('../middlewares/AuthToken'); 
const {cache, delcache}=require('../config/routeCache');

//GET       /api/posts
//@access   Private
//@description  get all posts
router.get('/posts', Auth, cache(300), PostController.getPosts);

//GET       /api/post/id
//@access   Private
//@description  get each post
router.get('/post/:pid', Auth, cache(300), PostController.Show);

//POST      /api/post
//@access   Private
//@description  Create post
router.post('/post', Auth, delcache('/api/posts'), PostController.create);

//GET      /api/post/id
//@access   Private
//@description  Edit post shwo on view
router.get('/post/:pid/edit', Auth, PostController.edit);

//PUT      /api/post/id
//@access   Private
//@description  Update post
router.put('/post/:pid', Auth, delcache('/api/posts'), delcache('/api/post/:pid'), PostController.update);

//DELETE      /api/post/id
//@access   Private
//@description  Delete post
router.delete('/post/:pid', Auth, delcache('/api/posts'), PostController.destroy);

module.exports=router;
