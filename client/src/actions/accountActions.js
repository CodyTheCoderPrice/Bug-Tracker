import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_AUTHENTICATION, SET_ACCOUNT } from "./types";
import { setInputErrors } from "./index";
import { retrieveProjects } from "./projectActions";

// Set authentication
export const setAuthentication = (decodedToken) => (dispatch) => {
	dispatch({
		type: SET_AUTHENTICATION,
		decodedToken: decodedToken,
	});
};

// Set account
export const setAccount = (account) => (dispatch) => {
	dispatch({
		type: SET_ACCOUNT,
		account: account,
	});
};

// Register account
export const registerAccount = (accountData, history) => (dispatch) => {
	axios
		.post("/api/account/register", accountData)
		//.then((res) => history.push("/login"))
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));
		});
};

// Login and then retrieve account
export const loginAccount = (accountData) => (dispatch) => {
	axios
		.post("/api/account/login", accountData)
		.then((res) => {
			const { jwToken, account } = res.data;
			localStorage.setItem("jwToken", jwToken);

			const decodedToken = jwt_decode(jwToken);

			dispatch(setAuthentication(decodedToken));

			dispatch(setAccount(account));
			dispatch(retrieveProjects());
		})
		.catch((err) => {
			if (err.response !== undefined) {
				dispatch(setInputErrors(err.response.data.inputErrors));
			}
		});
};

// Retrieve account only
export const retrieveAccount = () => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/account/retrieve", null, headers)
		.then((res) => {
			const { account } = res.data;
			dispatch(setAccount(account));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

// Update account info
export const updateAccountInfo = (accountData) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/account/update-info", accountData, headers)
		.then((res) => {
			const { account } = res.data;
			dispatch(setAccount(account));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

// Update account email
export const updateAccountEmail = (accountData) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/account/update-email", accountData, headers)
		.then((res) => {
			const { account } = res.data;
			dispatch(setAccount(account));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

// Update account password
export const updateAccountPassword = (accountData) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/account/update-password", accountData, headers)
		.then((res) => {
			const { account } = res.data;
			dispatch(setAccount(account));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

// Delete account
export const deleteAccount = (accountData) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/account/delete", accountData, headers)
		.then((res) => {
			dispatch(logoutAccount());
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));
		});
};

// Logout accout
export const logoutAccount = () => (dispatch) => {
	localStorage.removeItem("jwToken");

	// clear auth and account
	dispatch(setAuthentication({}));
	dispatch(setAccount({}));

	console.log("Message: logged out");
};
