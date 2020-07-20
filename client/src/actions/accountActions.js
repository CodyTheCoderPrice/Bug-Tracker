import axios from "axios";
import setAuthorizationToken from "../utils/setAuthorizationToken"; // possibly delete
import jwt_decode from "jwt-decode";

import { SET_AUTH_TOKEN, SET_INPUT_ERRORS, SET_ACCOUNT_INFO } from "./types";

// Register account
export const registerAccount = (accountData, history) => (dispatch) => {
	axios
		.post("/api/account/register", accountData)
		.then(() => {
			// clears any previous input errors (since evertrhing has worked)
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: {},
			});
		})
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

			const decodedToken = jwt_decode(jwToken);

			dispatch({
				type: SET_AUTH_TOKEN,
				payload: decodedToken,
			});

			dispatch({
				type: SET_ACCOUNT_INFO,
				payload: account,
			}).catch((err) => {
				console.log(err);
			});

			// clears any previous input errors (since evertrhing has worked)
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: {},
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
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.get("/api/account/retrieve", headers)
		.then((res) =>
			dispatch({
				type: SET_ACCOUNT_INFO,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: err.response.data.inputErrors,
			});

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
			dispatch(retrieveAccount());

			// clears any previous input errors (since evertrhing has worked)
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: {},
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: err.response.data.inputErrors,
			});

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
			dispatch(retrieveAccount());

			// clears any previous input errors (since evertrhing has worked)
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: {},
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: err.response.data.inputErrors,
			});

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
			dispatch(retrieveAccount());

			// clears any previous input errors (since evertrhing has worked)
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: {},
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: err.response.data.inputErrors,
			});

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

			// clears any previous input errors (since evertrhing has worked)
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: {},
			});
		})
		.catch((err) =>
			dispatch({
				type: SET_INPUT_ERRORS,
				payload: err.response.data.inputErrors,
			})
		);
};

// Logout accout
export const logoutAccount = () => (dispatch) => {
	localStorage.removeItem("jwToken");
	dispatch({
		type: SET_AUTH_TOKEN,
		payload: {},
	});
	dispatch({
		type: SET_ACCOUNT_INFO,
		payload: {},
	});

	// clears any previous input errors (since evertrhing has worked)
	dispatch({
		type: SET_INPUT_ERRORS,
		payload: {},
	});

	console.log("Message: logged out");
};
