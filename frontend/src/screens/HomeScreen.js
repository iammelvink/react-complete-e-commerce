import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const productList = useSelector((state) => state.productList)
	const { loading, error, products } = productList

	// make request here upon component load
	useEffect(
		() => {
			// Fire off action to get the products
			dispatch(listProducts())
		},
		[dispatch] // Dependencies, on change they fire off useEffect
	)
	return (
		<>
			<h1 className='text-uppercase'>Latest Products</h1>
			{/* When loading, display Loading...
            On error, display error
            Else display the products */}
			{loading ? (
				<h2 className='text-uppercase'>Loading</h2>
			) : error ? (
				<h3 className='text-uppercase'>{error}</h3>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md='6' lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	)
}

export default HomeScreen
