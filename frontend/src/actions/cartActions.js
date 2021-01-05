import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

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
