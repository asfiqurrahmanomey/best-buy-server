const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// * Middle Ware * //
app.use(cors());
app.use(express.json());

// * MongoDB Connection * //
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9vhsktv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// * Find Multiple Documents Using CURD * //
async function run() {
    try {
        // * Category Collection * //
        const productCategoryCollection = client.db('bestBuy').collection('productCategory');
        // * Get Products Collection * //
        const productCollection = client.db('bestBuy').collection('products');
        // * Get Category 1 * //
        const productCategory1Collection = client.db('bestBuy').collection('category1');
        // * Get Category 2 * //
        const productCategory2Collection = client.db('bestBuy').collection('category2');
        // * Get Category 3 * //
        const productCategory3Collection = client.db('bestBuy').collection('category3');
        // * Booking Collection  * //
        const bookingsCollection = client.db('bestBuy').collection('bookings');

        // * Get Category Date  from Database* //
        app.get('/productCategory', async (req, res) => {
            const query = {};
            const category = await productCategoryCollection.find(query).toArray();
            res.send(category);
        })

        // *  Post Booking Data * //
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        })

        // * Get Specific Booking with ID * //
        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productCollection.find(query).toArray();
            res.send(products);           
        })

        // * Get Category 1 Data * //
        app.get('/category1', async (req, res) => {
            const query = {};
            const products = await productCategory1Collection.find(query).toArray();
            res.send(products);
        })
        // * Get Category 2 Data * //
        app.get('/category2', async (req, res) => {
            const query = {};
            const products = await productCategory2Collection.find(query).toArray();
            res.send(products);
        })
        // * Get Category 2 Data * //
        app.get('/category3', async (req, res) => {
            const query = {};
            const products = await productCategory3Collection.find(query).toArray();
            res.send(products);
        })

    }
    finally {

    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('Best Buy Server Running')
});

app.listen(port, () => console.log(`Best Buy Running on Port ${port}`))