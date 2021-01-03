const express = require('express')
const products = require('./data/products')

const app = express()

const port = 8000

// get test route
app.get('/', (req, res) => {
	res.send('API is running...')
})
// get test route for products
app.get('/api/products', (req, res) => {
	res.json(products)
})
// get test route for product by id
app.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id)
	res.json(product)
})

app.listen(port, console.log(`Server running on port ${port}`))
