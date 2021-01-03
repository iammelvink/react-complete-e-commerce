import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeScreen = () => {
	const [products, setProducts] = useState([])

	// make request here upon component load
	useEffect(
		() => {
			const fetchProducts = async () => {
				// destructured data to access directly
				const { data } = await axios.get('/api/products')

				setProducts(data)
			}
			fetchProducts()
		},
		[] // when these change they fire off useEffect
	)
	return (
		<>
			<h1 className='text-uppercase'>Latest Products</h1>
			<Row>
				{products.map((product) => (
					<Col key={product._id} sm={12} md='6' lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	)
}

export default HomeScreen
