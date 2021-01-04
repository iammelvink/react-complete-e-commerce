import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'

dotenv.config()

// Invoke connectDB
connectDB()

const app = express()

// test get route
app.get('/', (req, res) => {
	res.send('API is running...')
})

// Mount routes to respective imports
app.use('/api/products', productRoutes)

// Set port number
const PORT = process.env.PORT || 8000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
