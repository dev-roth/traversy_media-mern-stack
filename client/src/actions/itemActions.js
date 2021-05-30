import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios"; // Promise based HTTP client 

// function "getItems" is an (Redux) action creator, therefore returning resp. dispatching the corresponding action.
export const getItems = () => (dispatch) => {
	// In a real project, dispatching the dispatched ITEMS_LOADING action would trigger some loading spinner
	dispatch(setItemsLoading());
	axios
		// Due to the configured proxy within the client/package.json, there is no need to specify the host & port.
		.get("/api/items")
		.then((res) =>
			dispatch(
				// The returned resp. dispatched POJO is a Redux action with the obligatory "type" property (could be named differently though).
				// The action can have additional properties added like a payload the reducer may need to process.
				// Dispatched actions are the only way in Redux to chamge the state (within the store by the particulat reducers).
				{
					type: GET_ITEMS,
					payload: res.data,
				}
			)
		);
};

export const addItem = (item) => (dispatch) => {
	// "item" (2nd arg) is the body request payload
	axios.post("/api/items", item).then((res) =>
		dispatch({
			type: ADD_ITEM,
			payload: res.data,
		})
	);
};

export const deleteItem = (id) => (dispatch) => {
	// "id" is passed as path variable
	axios.delete(`/api/items/${id}`).then((res) =>
		dispatch({
			type: DELETE_ITEM,
			payload: id,
		})
	);
};

export const setItemsLoading = () => {
	// would trigger some loading spinner in a real project
	return {
		type: ITEMS_LOADING,
	};
};
