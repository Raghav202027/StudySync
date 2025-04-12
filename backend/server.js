const express = reqire('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

//connect to mongoose 
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('connected to mongodb'));

//sample route
app.get('/',(req,res)=>{
    res.send('backend is working');
});

app.listen(5000,()=>{
    console.log('server started on port 5000');
})


