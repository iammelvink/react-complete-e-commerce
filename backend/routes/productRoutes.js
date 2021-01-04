import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const products = await Product.find({})
		// Check if products exists
		if (products) {
			res.json(products)
		} else {
			res.status(404).json({ message: 'No products found' })
		}
	})
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id)
		// Check if product exists
		if (product) {
			res.json(product)
		} else {
			res.status(404).json({ message: 'Product not found' })
		}
	})
)

export default router
