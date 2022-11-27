const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// * Middle Ware * //
app.use(cors());
app.use(express.json());

// * Get Category * //
const categories = require('./categories.json');
// * get product * //
const products = require('./products.json');

// * get news category list * //
app.get('/product-category', (req, res) => {
    res.send(categories)
})

// * get category Items * //
app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    if(id === '04'){
        res.send(products);
    }
    else{
        const category_products = products.filter(n => n.category_id === id);
        res.send(category_products);
    }
})

// *  Get All Products* //
app.get('/products', (req,res) => {
    res.send(products);
})

// * get Products Items * //
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const selectedProducts = products.find(p => p._id === id);
    res.send(selectedProducts);
})

app.get('/', async (req, res) => {
    res.send('Best Buy Server Running')
});

app.listen(port, () => console.log(`Best Buy Running on Port ${port}`))