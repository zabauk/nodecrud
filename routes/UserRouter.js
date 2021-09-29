const router=require('express').Router();
const UserController=require('../controllers/UserController');

//@route    /api/users
//@access   private
//@description  get all users
router.get('/users', UserController.index);

//@route    /api/register
//@access   private
//@description  Register new user
router.post('/user', UserController.register);


//Export router
module.exports=router;
