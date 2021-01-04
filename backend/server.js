import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()

// Invoke connectDB
connectDB()

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
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
