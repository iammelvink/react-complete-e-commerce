import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const productList = useSelector((state) => state.productList)
	const { loading, error, products } = productList

	// make request here upon component load
	useEffect(
		() => {
			// Fire off action to get the products
			dispatch(listProducts(keyword))
		},
		[dispatch, keyword] // Dependencies, on change they fire off useEffect
	)
	return (
		<>
			<h1>Latest Products</h1>
			{/* When loading, display Loading...
            On error, display error
            Else display the products */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
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
