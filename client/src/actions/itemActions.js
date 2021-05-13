import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types";

// function "getItems" is an (Redux) action creator, therefore returning the corresponding action.
export const getItems = () => {
	// The returned POJO/ simple JSON object is a Redux action with the obligatory "type" property (could be named differently though).
	// The action can have additional properties added like some kind of payload the reducers may need to process.
	return {
		type: GET_ITEMS,
	};
};

export const addItem = (item) => {
	return {
		type: ADD_ITEM,
		payload: item,
	};
};

export const deleteItem = (id) => {
	return {
		type: DELETE_ITEM,
		payload: id,
	};
};
