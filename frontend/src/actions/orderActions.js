import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
} from '../constants/orderConstants'

// Actions to create a new order
export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST })

		// Get userInfo from userLogin by destructuring
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// Make post request to create an order
		const { data } = await axios.post('/api/orders', order, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		})
		dispatch({
			type: CART_CLEAR_ITEMS,
			payload: data,
		})
		localStorage.removeItem('cartItems')
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to create a new order
export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST })

		// Get userInfo from userLogin by destructuring
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// Make get request to get an order
		const { data } = await axios.get(`/api/orders/${id}`, config)

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to create a new order
export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST })

		// Get userInfo from userLogin by destructuring
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// Make put request to make payment
		const { data } = await axios.put(
			`/api/orders/${orderId}/pay`,
			paymentResult,
			config
		)

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to list my orders
export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_MY_REQUEST })

		// Get userInfo from userLogin by destructuring
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// Make get request to get my orders
		const { data } = await axios.get('/api/orders/myorders', config)

		dispatch({
			type: ORDER_LIST_MY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_LIST_MY_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to list all orders
export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_REQUEST })

		// Get userInfo from userLogin by destructuring
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// Make get request to get all orders
		const { data } = await axios.get('/api/orders', config)

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_LIST_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to create a new order
export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DELIVER_REQUEST })

		// Get userInfo from userLogin by destructuring
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// Make put request to mark order as out for delivery
		const { data } = await axios.put(
			`/api/orders/${order._id}/deliver`,
			{},
			config
		)

		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
