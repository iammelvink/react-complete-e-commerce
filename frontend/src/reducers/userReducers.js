import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
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
