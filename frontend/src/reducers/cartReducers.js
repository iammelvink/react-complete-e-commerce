import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			// Get item from the payload
			const item = action.payload

			// Assign existItem to item.product if their prpduct ids match
			const existItem = state.cartItems.find((x) => x.product === item.product)

			// Check if item exists or Not
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.product === existItem.product ? item : x
					),
				}
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				}
			}

		case CART_REMOVE_ITEM:
			// Filter out cart item id that does NOT match with payload
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.product !== action.payload),
			}
		// In any other case, just return the state
		default:
			return state
	}
}
