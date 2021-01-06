import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
} from '../constants/userConstants'

// userLoginReducer for all users
export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		// loading will NOT be done yet, so true
		case USER_LOGIN_REQUEST:
			return { loading: true }

		// On success
		// userInfo will contain data as a payload
		// loading will be done, so false
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload }

		// On fail
		// the error will contain the payload
		// loading will be done, so false
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload }

		// On Logout
		case USER_LOGOUT:
			return {}

		// In any other case, just return the state
		default:
			return state
	}
}

// userRegisterReducer for all users
export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		// loading will NOT be done yet, so true
		case USER_REGISTER_REQUEST:
			return { loading: true }

		// On success
		// userInfo will contain data as a payload
		// loading will be done, so false
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload }

		// On fail
		// the error will contain the payload
		// loading will be done, so false
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload }

		// In any other case, just return the state
		default:
			return state
	}
}
