require('dotenv').config();
const mongoose=require('mongoose');

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true
        }).then(()=>console.log('Database connected successfully')).catch((err)=>console.log(err.message));
    }catch(err){
        console.log('Connection error');
        process.exit(1);
    }
}
//export 
module.exports=connectDB;