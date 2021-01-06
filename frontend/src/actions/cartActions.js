import axios from 'axios'
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'
// Actions to add a single product to the cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
	// Make request to get a single product
	const { data } = await axios.get(`/api/products/${id}`)

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	})
	// Set cart items to local storage
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
// Actions to remove a single product from the cart
export const removeFromCart = (id) => async (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	})
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
// Actions to save shipping address
export const saveShippingAddress = (data) => async (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	})
	localStorage.setItem('shippingAddress', JSON.stringify(data))
}
// Actions to save payment method
export const savePaymentMethod = (data) => async (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	})
	localStorage.setItem('paymentMethod', JSON.stringify(data))
}
