import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({})

// Create initial state
const initialState = {}

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
