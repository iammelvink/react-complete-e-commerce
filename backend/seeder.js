import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

// Insert sample data
const importData = async () => {
	try {
		// First wipe database
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		// Migrate users
		const createdUsers = await User.insertMany(users)
		// Set the user who created the products
		// to the admin user in our users data
		const adminUser = createdUsers[0]._id

		// Map adminUser to each product
		const sampleProducts = products.map((product) => {
			// spread over all products
			// set user to adminUser
			return { ...product, user: adminUser }
		})
		// Migrate products
		await Product.insertMany(sampleProducts)

		console.log('Data imported!'.green.inverse)
		// exit from the process
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1) //exit with failure
	}
}

// Delete/Wipe sample data
const destroyData = async () => {
	try {
		// First wipe database
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log('Data destroyed!'.red.inverse)
		// exit from the process
		process.exit()
	} catch (error) {
		console.error(`${error}`.red.inverse)
		process.exit(1) //exit with failure
	}
}

// if node backend/seeder -d
// Then destroyData
//Else importData
if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
