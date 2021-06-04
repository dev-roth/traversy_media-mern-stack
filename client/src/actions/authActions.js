import axios from "axios";
import { returnErrors } from "./errorActions";
import { AUTH_ERROR, USER_LOADED, USER_LOADING } from "./types";

// check token & load user (async via dispatch function)
export const loadUser = () => (dispatch, getState) => {
	// User loading
	dispatch({ type: USER_LOADING });

	axios
		.get("/api/auth/user", getTokenconfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data, // user object
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

export const getTokenconfig = (getState) => {
	// Get token from localstorage
	const token = getState().auth.token;
	// Create headers object used for REST calls
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};
	// Add token to header if available
	if (token) {
		config.headers["x-auth-token"] = token;
	}
	return config;
};
