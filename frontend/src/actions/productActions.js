import axios from 'axios'
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
} from '../constants/productConstants'

// Actions to get all products
export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST })
		// Make request to get all products
		const { data } = await axios.get('/api/products')

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
