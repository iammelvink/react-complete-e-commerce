import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

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
