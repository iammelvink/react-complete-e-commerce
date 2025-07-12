import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart)

	// Calculate prices
	// Add two decimals to price if needed
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}
	// Items price
	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)
	// Shipping price - over R1000 = R0
	// Else R150
	cart.shippingPrice = addDecimals(cart.itemsPrice > 1000 ? 0 : 150)
	// Tax price
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
	// Total price
	cart.totalPrice = addDecimals(
		(
			Number(cart.itemsPrice) +
			Number(cart.shippingPrice) +
			Number(cart.taxPrice)
		).toFixed(2)
	)

	const orderCreate = useSelector((state) => state.orderCreate)
	const { order, success, error } = orderCreate

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`)
			dispatch({ type: USER_DETAILS_RESET })
			dispatch({ type: ORDER_CREATE_RESET })
		}
		// eslint-disable-next-line
	}, [history, success]) // Dependencies, on change they fire off useEffect

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		)
	}

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				{/* Left Steps Summary */}
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<span className='push-to-right'>
									<strong>Address: </strong>
									{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
									{cart.shippingAddress.postalCode},{' '}
									{cart.shippingAddress.country}
								</span>
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<span className='push-to-right'>
								<strong>Method: </strong>
								{cart.paymentMethod}
							</span>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x R{item.price} = R{item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				{/* Right Order Summary */}
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Items</Col>
									<Col>R{cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Shipping</Col>
									<Col>R{cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>Tax</Col>
									<Col>R{cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item className='push-to-right'>
								<Row>
									<Col>
										<strong>Total</strong>
									</Col>
									<Col>
										<strong>R{cart.totalPrice}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
