const router=require('express').Router();
const UserController=require('../controllers/UserController');
const Auth=require('../middlewares/AuthToken');

//@route    /api/users
//@access   private
//@description  get all users
router.get('/users', Auth, UserController.index);

//@route    /api/register
//@access   private
//@description  Register new user
router.post('/user', UserController.register);


//Export router
module.exports=router;
