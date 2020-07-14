import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_ACCOUNT, GET_INPUT_ERRORS } from "./types";

// Register account
export const registerAccount = (accountData, history) => (dispatch) => {
	axios
		.post("/api/account/register", accountData)
		.then((res) => history.push("/login"))
		.catch((err) =>
			dispatch({
				type: GET_INPUT_ERRORS,
				payload: err.response.data,
			})
		);
};

// Login account
export const loginAccount = (accountData) => (dispatch) => {
	axios
		.post("/api/account/login", accountData)
		.then((res) => {
			const { token } = res.data;
			localStorage.setItem("jwtToken", token);

			// Adds the token the header of all http requests
			setAuthorizationToken(token);

			const decodedToken = jwt_decode(token);
			dispatch({
				type: SET_CURRENT_ACCOUNT,
				payload: decodedToken,
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_INPUT_ERRORS,
				payload: err.response.data,
			})
		);
};

// Update account info
export const updateAccountInfo = (accountData) => (dispatch) => {
	axios.post("/api/account/update-info", accountData).catch((err) =>
		dispatch({
			type: GET_INPUT_ERRORS,
			payload: err.response.data,
		})
	);
};

// Update account email
export const updateAccountEmail = (accountData) => (dispatch) => {
	axios.post("/api/account/update-email", accountData).catch((err) =>
		dispatch({
			type: GET_INPUT_ERRORS,
			payload: err.response.data,
		})
	);
};

// Update account password
export const updateAccountPassword = (accountData) => (dispatch) => {
	axios.post("/api/account/update-password", accountData).catch((err) =>
		dispatch({
			type: GET_INPUT_ERRORS,
			payload: err.response.data,
		})
	);
};

// Logout accout
export const logoutAccount = () => (dispatch) => {
	localStorage.removeItem("jwtToken");
	setAuthorizationToken(false);
	dispatch({
		type: SET_CURRENT_ACCOUNT,
		payload: {},
	});
};
