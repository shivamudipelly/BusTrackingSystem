require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookie = require('cookie-parser');
const app = express();

const authRoutes = require('./routes/userRoute');
const driverRoutes = require('./routes/driverRoute')
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: ["http://localhost:3000", 'https://bus-tracking-system.vercel.app'],
    credentials: true, 
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST','PUT','DELETE']
  };

// middle ware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.get('/',(req,res)=>{
    res.send('hello main page')
})
app.use('/auth/user', authRoutes);
app.use('/auth', driverRoutes);



mongoose.connect(process.env.DATABASE_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`http://localhost:${process.env.PORT}`)
    })
    console.log("connected succesfully");
}).catch(err=>console.log(err))
