import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
	// Get product id
	const productId = match.params.id

	// Get the quantity ?qty=x
	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const dispatch = useDispatch()

	// useSelector is to grab what we want from the state
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	// make request here upon component load
	useEffect(() => {
		// Fire off action to add item and quantity to cart
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty]) // Dependencies, on change they fire off useEffect
	return <div>Cart</div>
}

export default CartScreen
