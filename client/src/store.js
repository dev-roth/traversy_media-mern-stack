import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// A "thunk" is a subroutine used to inject an additional function call into another subroutine, basically delaying the function call (async).
// The term "thunk" originated as a humorous, incorrect, past participle of "think".
// In this context, the middleware "redux-thunk" looks at every action that passes through the system, and if it’s a function, it calls that function.
const middleware = [thunk];
const initialState = {};

// Creates the central, one and only Redux store. A store holds the whole state tree of your application. 
// The store is however just an object with a few methods on it. 
const store = createStore(
	// rootReducer can be one or multiple, combined reducer functions
	rootReducer,
	initialState,
	// "compose" is a convenience, functional programming utiliy to apply several store enhancers in a row
	compose(
		// "Middleware" in this context is a way to extend Redux with custom functionality (here with "redux-thunk")
		applyMiddleware(...middleware),
		// enable Redux DevTools in Browser (for more details/ options: https://github.com/reduxjs/redux-devtools)
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
