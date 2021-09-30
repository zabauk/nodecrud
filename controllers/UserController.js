const User=require('../models/User');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

//get all users
exports.index=async (req, res)=>{
    try {
        const users=await User.find().select("name email date");
        return res.json(users);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//register new user
exports.register=async(req, res)=>{
    try {
        const {name, email, password, confirmpassword}=req.body;
        
        //Check empty field
        if(!name || !email || !password || !confirmpassword){
            return res.status(400).json({
                msg: 'Please fill all fields'
            })
        }
        //Check email already exist
        const checkUserExist=await User.findOne({email: email});
        if(checkUserExist){
            return res.status(400).json({
                msg: 'Email already exist'
            })
        }
        //Check password match
        if(password !== confirmpassword){
            return res.status(400).json({
                msg: 'Password don\'t match '
            })
        }
        //Hash password
        const genSalt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password, genSalt);
        //Save user into database
        const NewUser=new User({
            name: name,
            email: email,
            password: hashPassword
        })
        const savedUser=await NewUser.save();
        return res.json(savedUser);
        
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

//Login user
exports.login=async (req, res)=>{
    try {
        const {email, password}=req.body;
        //check empty field
        if(!email || !password){
            return res.status(400).json({msg: 'Please fill all fields'});
        }
        //Check email exist
        const user=await User.findOne({email: email});
        if(!user){
            return res.status(400).json({msg: 'Invalid credentials'});
        }
        //Check password match
        const checkPassword=await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        //response jwt token
        const token=await jwt.sign({id: user._id}, process.env.SECRET_KEY);
        res.json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

//Delete user
exports.destroy=async (req, res)=>{
    try {
        const RemovedUser=await User.findByIdAndDelete(req.user);
        res.json(RemovedUser);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}