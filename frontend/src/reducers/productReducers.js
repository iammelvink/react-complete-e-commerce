import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		// Requests product list
		// products is an empty array because its still loading
		// loading will NOT be done yet, so true
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] }

		// On success
		// products will contain data as a payload
		// loading will be done, so false
		case PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload }

		// On fail
		// products will contain the error as a payload
		// loading will be done, so false
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload }

		// In any other case, just return the state
		default:
			return state
	}
}
