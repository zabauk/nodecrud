const router=require('express').Router();
const UserController=require('../controllers/UserController');
const Auth=require('../middlewares/AuthToken');

//@GET    /api/users
//@access   private
//@description  get all users
router.get('/users', Auth, UserController.index);

//@POST    /api/register
//@access   public
//@description  Register new user
router.post('/user', UserController.register);

//@POST    /api/login
//@access   public
//@description  Login user
router.post('/login', UserController.login);

//@DELETE    /api/user/id
//@access   private
//@description  Remove exiting user
router.delete('/user', Auth, UserController.destroy);

//@GET    /api/user/id
//@access   private
//@description  Get each user
router.get('/user/:userid', Auth, UserController.show);


//Export router
module.exports=router;
