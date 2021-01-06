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
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstants'

// userLoginReducer for users
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
// userRegisterReducer for users
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
// userDetailsReducer for users
export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		// loading will NOT be done yet, so true
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true }

		// On success
		// user will contain data as a payload
		// loading will be done, so false
		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload }

		// On fail
		// the error will contain the payload
		// loading will be done, so false
		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload }

		// In any other case, just return the state
		default:
			return state
	}
}
// userUpdateProfileReducer for users
export const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		// loading will NOT be done yet, so true
		case USER_UPDATE_PROFILE_REQUEST:
			return { loading: true }

		// On success
		// userInfo will contain data as a payload
		// loading will be done, so false
		case USER_UPDATE_PROFILE_SUCCESS:
			return { loading: false, success: true, userInfo: action.payload }

		// On fail
		// the error will contain the payload
		// loading will be done, so false
		case USER_UPDATE_PROFILE_FAIL:
			return { loading: false, error: action.payload }

		// Then reset
		case USER_UPDATE_PROFILE_RESET:
			return {}

		// In any other case, just return the state
		default:
			return state
	}
}
