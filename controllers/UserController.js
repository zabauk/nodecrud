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