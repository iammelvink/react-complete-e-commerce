import axios from 'axios'
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
} from '../constants/userConstants'

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
	dispatch({ type: USER_LOGOUT })
}
