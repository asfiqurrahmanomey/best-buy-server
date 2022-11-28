const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// * Middle Ware * //
app.use(cors());
app.use(express.json());

// * MongoDB Connection * //
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9vhsktv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// * Verify JWT * //
function verifyJWT(req, res, next) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Unauthorized accessToken');
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Access Forbidden' })
        }
        req.decoded = decoded;
        next();
    })
}
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
        // * User Collection  * //
        const usersCollection = client.db('bestBuy').collection('users');

        // * Get Category Date  from Database* //
        app.get('/productCategory', async (req, res) => {
            const query = {};
            const category = await productCategoryCollection.find(query).toArray();
            res.send(category);
        })

        // *  Get Booking Data * //
        app.get('/bookings', verifyJWT, async (req, res) => {
            const email = req.query.email;
            const decodedEmail = req.decoded.email;

            if(email !== decodedEmail) {
                return res.status(403).send({message: 'forbidden access'});
            }

            const query = { email: email };
            const bookings = await bookingsCollection.find(query).toArray();
            res.send(bookings);
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
        });

        // JWT token
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            if(user){
                const token = jwt.sign({email}, process.env.ACCESS_TOKEN, {expiresIn: '1h'})
                return res.send({accessToken: token});
            }
            res.status(403).send({accessToke: ''});
        })

        // * User Post * //
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
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