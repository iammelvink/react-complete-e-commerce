import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
	// Get product id
	const productId = match.params.id

	// Get the quantity ?qty=x
	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	// Add two decimals to price if needed
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	// make request here upon component load
	useEffect(() => {
		// Fire off action to add item and quantity to cart
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty]) // Dependencies, on change they fire off useEffect

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}
	const checkoutHandler = () => {
		history.push('/login?redirect=shipping')
	}
	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Link to={`/product/${item.product}`}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Link>
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>R{item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{/* Getting countInStock keys */}
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								items
							</h2>
							<span className='push-to-right'>
								R
								{addDecimals(
									cartItems
										.reduce((acc, item) => acc + item.qty * item.price, 0)
										.toFixed(2)
								)}
							</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed to Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen
