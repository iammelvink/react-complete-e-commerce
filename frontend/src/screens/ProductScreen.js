import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1)

	// Product review states
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	// Make sure user is logged in
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	// For product review
	const productReviewCreate = useSelector((state) => state.productReviewCreate)
	const {
		success: successProductReview,
		loading: loadingProductReview,
		error: errorProductReview,
	} = productReviewCreate

	// make request here upon component load
	useEffect(
		() => {
			if (successProductReview) {
				setRating(0)
				setComment('')
				dispatch(listProductDetails(match.params.id))
				dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
			}
			// Fire off action to get a single product
			if (!product._id || product._id !== match.params.id) {
				dispatch(listProductDetails(match.params.id))
				dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
			}
		},
		[dispatch, match, successProductReview, product._id] // Dependencies, on change they fire off useEffect
	)

	// Add to cart handler
	const addToCartHandler = () => {
		// Redirect to cart and include quantity/qty
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment,
			})
		)
	}

	return (
		<>
			{/* Back button */}
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{/* When loading, display Loading...
            On error, display error
            Else display the product details */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
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
								<ListGroup.Item>
									Description: {product.description}
								</ListGroup.Item>
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

									{/* Quantity of stock */}
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{/* Getting countInStock keys */}
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										{product.countInStock > 0 ? (
											/* Add to cart button */
											<Button
												onClick={addToCartHandler}
												className='btn-block'
												type='button'
											>
												<i className='fas fa-plus'></i>
												<span className='plus-sign-margin'>
													<i className='fas fa-shopping-cart'></i>
												</span>
												Add To Cart
											</Button>
										) : (
											/* Sold Out button */
											<Button
												className='btn-block'
												type='button'
												disabled={product.countInStock === 0}
											>
												Sold Out
											</Button>
										)}
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					{/* Reviews */}
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{successProductReview && (
										<Message variant='success'>
											Review submitted successfully
										</Message>
									)}
									{loadingProductReview && <Loader />}
									{errorProductReview && (
										<Message variant='danger'>{errorProductReview}</Message>
									)}
									{userInfo ? (
										<Form className='push-to-right' onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													{/* Rating */}
													<option value=''>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Control
													as='textarea'
													required
													row='3'
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button
												type='submit'
												disabled={loadingProductReview}
												variant='primary'
											>
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'>sign in</Link> to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
