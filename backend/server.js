const express = require('express')
const dotenv = require('dotenv')
const products = require('./data/products')

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

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

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
