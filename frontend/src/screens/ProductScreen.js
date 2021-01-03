import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = ({ match }) => {
	// Find product by id
	const [product, setProduct] = useState({})

	// make request here upon component load
	useEffect(
		() => {
			const fetchProduct = async () => {
				// destructured data to access directly
				const { data } = await axios.get(`/api/products/${match.params.id}`)

				setProduct(data)
			}
			fetchProduct()
		},
		[match] // when these change they fire off useEffect
	)
	return (
		<>
			{/* Back button */}
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			<Row>
				{/* Product image */}
				<Col md='6'>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md='3'>
					{/* Product name */}
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						{/* Product rating */}
						<ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
						</ListGroup.Item>
						{/* Product price */}
						<ListGroup.Item>Price: R{product.price}</ListGroup.Item>
						{/* Product description */}
						<ListGroup.Item>Description: {product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				{/* Add to cart section */}
				<Col md='3'>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								{/* Product price */}
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>R{product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							{/* Product status */}
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
									</Col>
								</Row>
							</ListGroup.Item>
							{/* Add to cart button */}
							<ListGroup.Item>
								<Button
									className='btn-block'
									type='button'
									disabled={product.countInStock === 0}
								>
									Add To Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default ProductScreen
