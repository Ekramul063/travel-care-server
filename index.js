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
        const serviceCollection = client.db('travel-care').collection('services');
        const reviewCollection = client.db('travel-care').collection('reviews');
        //get all service
        app.get('/services',async(req,res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        //home page limited data  service
        app.get('/home/services',async(req,res)=>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const result = await cursor.limit(3).toArray();
            res.send(result);
        })
        //single service
        app.get('/services/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service)
        }) 
        //all review
        app.get('/reviews',async(req,res)=>{
            const query={};
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews)
        })

        // single service review
        app.get('/serviceReview',async(req,res)=>{
            let query= {id:req.query.id};
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        // single person review

        app.get('/reviewsperson',async(req,res)=>{
            //console.log(req.query.email)
            let query= {email:req.query.email};
            const cursor = reviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews)
        })

        //insert  review
        app.post('/reviews',async(req,res)=>{
            const reviews = req.body;
            const result = await reviewCollection.insertOne(reviews);
            res.send(result);
        })

       
        
        //insert service
        app.post('/services',async(req,res)=>{
            const service = req.body;
            const result = await serviceCollection.insertOne(service);
            res.send(result);
        })
       
        //  delete review
         app.delete('/reviews/:id',async(req,res)=>{
            const id = req.params.id;
            console.log(id)
            const query ={_id:ObjectId(id)}
            const result = await reviewCollection.deleteOne(query);
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