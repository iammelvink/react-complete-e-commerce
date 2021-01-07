import axios from 'axios'
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

// Actions to login
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// Make post request to login
		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		)

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})
		// Set user to local storage
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to logout
export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	localStorage.removeItem('cartItems')
	localStorage.removeItem('shippingAddress')
	localStorage.removeItem('paymentMethod')
	dispatch({ type: USER_LOGOUT })
	dispatch({ type: USER_DETAILS_RESET })
	dispatch({ type: ORDER_LIST_MY_RESET })
	dispatch({ type: USER_LIST_RESET })
	document.location.href = '/login'
}
// Actions to register
export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		// Make post request to register
		const { data } = await axios.post(
			'/api/users',
			{ name, email, password },
			config
		)
		// Dispatch register
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})
		// Auto login after registration
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})
		// Set user to local storage
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to get user details
export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST })

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

		// Make get request to get user details
		const { data } = await axios.get(`/api/users/${id}`, config)
		// Dispatch user details
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to get user details
export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

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

		// Make put request to update user profile
		const { data } = await axios.put('/api/users/profile', user, config)
		// Dispatch update profile
		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		})
		// Dispatch user login success
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		})
		// Set user to local storage
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to get user details
export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LIST_REQUEST })

		// Get userInfo from userLogin by destructuring
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// Make get request to get list of users
		const { data } = await axios.get('/api/users', config)

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to delete user
export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST })

		// Get userInfo from userLogin by destructuring
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// Make delete request to delete a user
		await axios.delete(`/api/users/${id}`, config)

		dispatch({ type: USER_DELETE_SUCCESS })
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				// Send a custom error message
				// Else send a generic error message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
// Actions to update user
export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST })

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

		// Make put request to update a user
		const { data } = await axios.put(`/api/users/${user._id}`, user, config)

		dispatch({ type: USER_UPDATE_SUCCESS })
		dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
		dispatch({ type: USER_DETAILS_RESET })
	} catch (error) {
		const message = // Send a custom error message
			// Else send a generic error message
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: USER_UPDATE_FAIL,
			payload: message,
		})
	}
}
