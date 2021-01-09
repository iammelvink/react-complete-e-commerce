import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_RESET,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_RESET,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAIL,
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
			return {
				loading: false,
				products: action.payload.products,
				pages: action.payload.pages,
				page: action.payload.page,
			}

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
// productDeleteReducer for admin users
export const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		// loading will NOT be done yet, so true
		case PRODUCT_DELETE_REQUEST:
			return { loading: true }

		// On success
		// loading will be done, so false
		case PRODUCT_DELETE_SUCCESS:
			return { loading: false, success: true }

		// On fail
		// the error will contain the payload
		// loading will be done, so false
		case PRODUCT_DELETE_FAIL:
			return { loading: false, error: action.payload }

		// In any other case, just return the state
		default:
			return state
	}
}
// productCreateReducer for admin users
export const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		// loading will NOT be done yet, so true
		case PRODUCT_CREATE_REQUEST:
			return { loading: true }

		// On success
		// loading will be done, so false
		case PRODUCT_CREATE_SUCCESS:
			return { loading: false, success: true, product: action.payload }

		// On fail
		// the error will contain the payload
		// loading will be done, so false
		case PRODUCT_CREATE_FAIL:
			return { loading: false, error: action.payload }

		case PRODUCT_CREATE_RESET:
			return {}

		// In any other case, just return the state
		default:
			return state
	}
}
// productUpdateReducer for admin users
export const productUpdateReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		// loading will NOT be done yet, so true
		case PRODUCT_UPDATE_REQUEST:
			return { loading: true }

		// On success
		// loading will be done, so false
		case PRODUCT_UPDATE_SUCCESS:
			return { loading: false, success: true, product: action.payload }

		// On fail
		// the error will contain the payload
		// loading will be done, so false
		case PRODUCT_UPDATE_FAIL:
			return { loading: false, error: action.payload }

		case PRODUCT_UPDATE_RESET:
			return { product: {} }

		// In any other case, just return the state
		default:
			return state
	}
}
// productReviewCreateReducer for logged in users
export const productReviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		// loading will NOT be done yet, so true
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return { loading: true }

		// On success
		// loading will be done, so false
		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return { loading: false, success: true }

		// On fail
		// the error will contain the payload
		// loading will be done, so false
		case PRODUCT_CREATE_REVIEW_FAIL:
			return { loading: false, error: action.payload }

		case PRODUCT_CREATE_REVIEW_RESET:
			return {}

		// In any other case, just return the state
		default:
			return state
	}
}
// productTopRatedReducer
export const productTopRatedReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		// loading will NOT be done yet, so true
		case PRODUCT_TOP_REQUEST:
			return { loading: true, products: [] }

		// On success
		// loading will be done, so false
		case PRODUCT_TOP_SUCCESS:
			return { loading: false, products: action.payload }

		// On fail
		// the error will contain the payload
		// loading will be done, so false
		case PRODUCT_TOP_FAIL:
			return { loading: false, error: action.payload }

		// In any other case, just return the state
		default:
			return state
	}
}
