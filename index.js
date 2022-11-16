const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware
app.use(cors());
app.use(express.json());








app.get('/',(req,res)=>{
    res.send('your Travel care server is running')
})
//travel-care.......//ZgaMSQaQzVDxGu31

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})