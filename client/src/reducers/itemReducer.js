import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "../actions/types";

const initialState = {
	items: [],
	loading: false
};

// Actual logic of the state management is done here, within single reducer functions.
// Here the (current) state is returned, updated,... - based on the passed action.
export default function itemReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
			// returns a copy of the current state including the (new) items from the payload (fetched from the server)
			return {
				...state,
				items: action.payload,
				loading: false
			};
		case ADD_ITEM:
			// returns a copy of the current state including the item being added (defined by the payload)
			return {
				...state,
				items: [action.payload, ...state.items],
			};
		case DELETE_ITEM:
			// returns a copy of the current state exluding the item being deleted (defined by the payload)
			return {
				...state,
				items: state.items.filter((item) => item._id !== action.payload),
			};
		case ITEMS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
