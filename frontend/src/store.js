import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
})

// Get cartItems from local storage
const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

// Create initial state
const initialState = {
	cart: { cartItems: cartItemsFromStorage },
}

// Set middleware to thunk middleware
const middleware = [thunk]

// Create store
// Pass initial state to load things at that point
// Setup redux-devtools-extension
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
