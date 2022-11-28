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

        // * Get Category Date  from Database* //
        app.get('/productCategory', async (req, res) => {
            const query = {};
            const category = await productCategoryCollection.find(query).toArray();
            res.send(category);
        })

        // * Get Specific Booking with ID * //
        app.get('/productCategory/:id', async (req, res) => {
            const id = req.params.id;
            const query = {category_id: category_id};
            const booking = await productCollection.findOne(query);
            res.send(booking);
            console.log(booking);
        })

        // * Get Specific Booking with ID * //
        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productCollection.find(query).toArray();
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