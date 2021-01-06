import express, { json } from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

// Invoke connectDB
connectDB()

const app = express()

app.use(express.json())

// test get route
app.get('/', (req, res) => {
	res.send('API is running...')
})

// Mount routes to respective imports
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

// Error middleware for 404
app.use(notFound)

// Error handler middleware
app.use(errorHandler)

// Set port number
const PORT = process.env.PORT || 8000

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
)
