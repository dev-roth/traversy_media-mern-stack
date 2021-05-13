import { v4 as uuidv4 } from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
	items: [
		{ id: uuidv4(), name: "Eggs" },
		{ id: uuidv4(), name: "Milk" },
		{ id: uuidv4(), name: "Coffee" },
	],
};

// Actual logic of the state management is done here, within single reducer functions.
// Here the (current) state is returned, updated,... - based on the passed action.
export default function itemReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
			// returns a copy of the current state
			return {
				...state,
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
				items: state.items.filter((item) => item.id !== action.payload),
			};
		default:
			return state;
	}
}
