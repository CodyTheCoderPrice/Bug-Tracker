import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import jwt_decode from "jwt-decode";

import {
	AUTHENTICATE_ACCOUNT,
	SET_INPUT_ERRORS,
	SET_ACCOUNT_INFO,
} from "./types";

// Register account
export const registerAccount = (accountData, history) => (dispatch) => {
	axios
		.post("/api/account/register", accountData)
		//.then((res) => history.push("/login"))
		.catch((err) =>
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: err.response.data.inputErrors,
			})
		);
};

// Login and then retrieve account
export const loginThenRetrieveAccount = (accountData) => (dispatch) => {
	axios
		.post("/api/account/login", accountData)
		.then((res) => {
			const { jwToken, account } = res.data;
			localStorage.setItem("jwToken", jwToken);

			// Adds the token the header of all http requests
			setAuthorizationToken(jwToken);

			const decodedToken = jwt_decode(jwToken);
			dispatch({
				type: AUTHENTICATE_ACCOUNT,
				payload: decodedToken,
			});

			dispatch({
				type: SET_ACCOUNT_INFO,
				payload: account,
			}).catch((err) => {
				console.log(err);
			});
		})
		.catch((err) => {
			if (err.response !== undefined) {
				dispatch({
					type: SET_INPUT_ERRORS,
					payload: err.response.data.inputErrors,
				});
			}
		});
};

// Retrieve account only
export const retrieveAccount = () => (dispatch) => {
	console.log("You got here");
	axios
		.get("/api/account/retrieve")
		.then((res) =>
			dispatch({
				type: SET_ACCOUNT_INFO,
				payload: res.data,
			})
		)
		.catch((err) => {
			console.log(err);
			if (err.response.data.inputErrors.jwToken !== undefined) {
			}
		});
};

// Update account info
export const updateAccountInfo = (accountData) => (dispatch) => {
	axios
		.post("/api/account/update-info", accountData)
		.then((res) => {
			retrieveAccount();
		})
		.catch((err) => {
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: err.response.data.inputErrors,
			});

			if (err.response.data.inputErrors.jwToken !== undefined) {
				console.log("Got here boi!");
			}
		});
};

// Update account email
export const updateAccountEmail = (accountData) => (dispatch) => {
	axios.post("/api/account/update-email", accountData).catch((err) =>
		dispatch({
			type: SET_INPUT_ERRORS,
			payload: err.response.data.inputErrors,
		})
	);
};

// Update account password
export const updateAccountPassword = (accountData) => (dispatch) => {
	axios.post("/api/account/update-password", accountData).catch((err) =>
		dispatch({
			type: SET_INPUT_ERRORS,
			payload: err.response.data.inputErrors,
		})
	);
};

// Delete account
export const deleteAccount = (accountData) => (dispatch) => {
	axios.post("/api/account/delete", accountData).catch((err) =>
		dispatch({
			type: SET_INPUT_ERRORS,
			payload: err.response.data.inputErrors,
		})
	);
};

// Logout accout
export const logoutAccount = () => (dispatch) => {
	localStorage.removeItem("jwToken");
	setAuthorizationToken(false);
	dispatch({
		type: AUTHENTICATE_ACCOUNT,
		payload: {},
	});
	dispatch({
		type: SET_ACCOUNT_INFO,
		payload: {},
	});
	console.log("Logged out");
};
