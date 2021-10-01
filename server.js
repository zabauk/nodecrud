const express=require('express');
const connectDB=require('./config/database');
const UserRouter=require('./routes/UserRouter');
const app=express();
const cors=require('cors');

//use json middleware
app.use(express.json());

//use cors
app.use(cors());

app.get('/', (req, res)=>{
    return res.send('Hello World');
})

//User Router
app.use('/api', UserRouter);

//connect to database
connectDB();

const port=5000;
app.listen(port, ()=>console.log(`Server is running on port ${port}`));
