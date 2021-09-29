const express=require('express');
const connectDB=require('./config/database');
const UserRouter=require('./routes/UserRouter');
const app=express();

//use json middleware
app.use(express.json());

app.get('/', (req, res)=>{
    return res.send('Hello World');
})

//User Router
app.use('/api', UserRouter);

//connect to database
connectDB();

const port=5000;
app.listen(port, ()=>console.log(`Server is running on port ${port}`));
