const express=require('express');
const connectDB=require('./config/database');
const app=express();

app.get('/', (req, res)=>{
    return res.send('Hello World');
})

//connect to database
connectDB();

const port=5000;
app.listen(port, ()=>console.log(`Server is running on port ${port}`));
