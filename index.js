const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rlfbbtk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serverCollection = client.db('travel-care').collection('services');

        app.get('/services',async(req,res)=>{
            const query = {};
            const cursor = serverCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
    }
    finally{}
}
run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send('your Travel care server is running')
})
//travel-care.......//ZgaMSQaQzVDxGu31

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})