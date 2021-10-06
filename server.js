const express=require('express');
const connectDB=require('./config/database');
const UserRouter=require('./routes/UserRouter');
const PostRouter=require('./routes/PostRouter');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');

//use json middleware
app.use(express.json());

//use cookie parser
app.use(cookieParser());

//use cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//set uploads folder static
app.use('/uploads', express.static('uploads'))


app.get('/', (req, res)=>{
    return res.send('Hello World');
})

//User Router
app.use('/api', UserRouter);

//Post router
app.use('/api', PostRouter);

//connect to database
connectDB();

const port=5000;
app.listen(port, ()=>console.log(`Server is running on port ${port}`));
