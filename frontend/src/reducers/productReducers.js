import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants'

// productListReducer for all products
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

// productDetailsReducer for a single product
export const productDetailsReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		// Requests a product
		// product is an empty object because its still loading
		// reviews is an empty array because its still loading
		// loading will NOT be done yet, so true
		// add contents of state using a spread operator (...)
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, ...state }

		// On success
		// product will contain data as a payload
		// loading will be done, so false
		case PRODUCT_DETAILS_SUCCESS:
			return { loading: false, product: action.payload }

		// On fail
		// product will contain the error as a payload
		// loading will be done, so false
		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload }

		// In any other case, just return the state
		default:
			return state
	}
}
