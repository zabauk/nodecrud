const jwt=require('jsonwebtoken');

const Auth=(req, res, next)=>{
    try {
        const Token=req.header('Authorization');
        //check token exist
        if(!Token){
            return res.status(401).json({msg: 'No authorization token'});
        }
        //Verify token
        const verifyToken=jwt.verify(Token, process.env.SECRET_KEY);
        if(!verifyToken){
            return res.status(401).json({msg: 'No authorization token'});
        }
        next();
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

module.exports=Auth;