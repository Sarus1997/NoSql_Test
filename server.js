const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World! Let\'s Working with NoSQL Databases')
})


const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const connectDB = async() => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log(`MongoDB connected successfully.`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectDB();


// Read All API
app.get('/complaints', async(req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('DBName').collection('test02')
        .find({}).sort({ "Date received": -1 }).limit(50).toArray();

    await client.close();
    res.status(200).send(objects);
})

// Create API
app.post('/complaints/create', async(req, res) => {
    const object = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('DBName').collection('test02').insertOne({
        "App": object.App,
        "Category": object.Category,
        "Rating": object.Rating,
        "Reviews": object.Reviews,
        "Size": object.Size,
        "Installs": object.Installs,
        "Type": object.Type,
        "Price": object.Price,
        "Content_Rating": object.Content_Rating,
        "Genres": object.Genres,
        "Last_Updated": object.Last_Updated,
        "Current_Ver": object.Current_Ver,
        "Android_Ver": object.Android_Ver,
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object is created",
        "object": object
    });
})

// Update API
const { ObjectId } = require('mongodb')
app.put('/complaints/update', async(req, res) => {
    const object = req.body;
    const id = object._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('DBName').collection('test02').updateOne({ '_id': ObjectId(id) }, {
        "$set": {
            "_id": ObjectId(id),
            "App": object.App,
            "Category": object.Category,
            "Rating": object.Rating,
            "Reviews": object.Reviews,
            "Size": object.Size,
            "Installs": object.Installs,
            "Type": object.Type,
            "Price": object.Price,
            "Content_Rating": object.Content_Rating,
            "Genres": object.Genres,
            "Last_Updated": object.Last_Updated,
            "Current_Ver": object.Current_Ver,
            "Android_Ver": object.Android_Ver,
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID = " + id + " is updated",
        "object": object
    });
})

// Delete API
app.delete('/complaints/delete', async(req, res) => {
    const id = req.body._id;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('DBName').collection('test02').deleteOne({ '_id': ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Object with ID = " + id + " is deleted"
    });
})

// Read by id API
app.get('/complaints/:id', async(req, res) => {
    const id = req.params.id;
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('DBName').collection('test02').findOne({ "_id": ObjectId(id) });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Complaint with ID = " + id + " is deleted",
        "object": user
    });
})

// Read by id API
app.get('/complaints/findtext/:searchText', async(req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('DBName').collection('test02').find({ $text: { $search: searchText } }).sort({ "FIELD": -1 }).limit(50).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaints": objects
    });
})

// Query by filter API: Search text from Product Name
app.get('/complaints/genres/:searchText', async(req, res) => {
    const { params } = req;
    const searchText = params.searchText
    const client = new MongoClient(uri);
    await client.connect();
    const objects = await client.db('DBName').collection('test02').find({ $text: { $search: searchText } }).sort({ "Date received": -1 }).limit(10).toArray();
    await client.close();
    res.status(200).send({
        "status": "ok",
        "searchText": searchText,
        "Complaint": objects
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})