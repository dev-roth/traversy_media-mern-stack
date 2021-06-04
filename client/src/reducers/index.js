import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import itemReducer from "./itemReducer";

// Combines separate reducers (that manage individual parts of the global state) in a central object (root reducer)
// and provides access to them via properties (here: one reducer).
export default combineReducers({
	item: itemReducer,
	auth: authReducer,
	error: errorReducer,
});
