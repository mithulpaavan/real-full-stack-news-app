const express = require('express');
require('dotenv').config();

const app = express();
const authRouter = require('./router/authRouter.js');
const newsRouter = require('./router/newsRouter.js');

const cookieParser = require('cookie-parser');

const cors = require('cors');

const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173",
    "https://fullstack-chat-app-puce-two.vercel.app"], 
    credentials: true             
}))

app.use('/api/auth', authRouter);
app.use('/api/news', newsRouter);

app.listen(process.env.PORT, async ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("databse is successfully connected");
    }
    catch(err){
        console.log(err);
        console.log("nahh database aint connected");
    }
})



