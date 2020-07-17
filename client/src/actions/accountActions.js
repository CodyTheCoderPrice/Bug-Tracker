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
			const { token, account } = res.data;
			localStorage.setItem("jwtToken", token);

			// Adds the token the header of all http requests
			setAuthorizationToken(token);

			const decodedToken = jwt_decode(token);
			dispatch({
				type: AUTHENTICATE_ACCOUNT,
				payload: decodedToken,
			});

			dispatch({
				type: SET_ACCOUNT_INFO,
				payload: account,
			}).catch((err) => {
				console.log(err);
			})
		})
		.catch((err) => {
			if (err.response !== undefined) {
				dispatch({
					type: SET_INPUT_ERRORS,
					payload: err.response.data.inputErrors,
				})
			}
		});
};

// Retrieve account only
export const retrieveAccount = (accountData) => (dispatch) => {
	console.log("got here");
	axios.get("/api/account/retrieve", accountData).then((res) =>
		dispatch({
			type: SET_ACCOUNT_INFO,
			payload: res.data,
		}).catch((err) => {
			console.log(err);
		})
	);
};

// Update account info
export const updateAccountInfo = (accountData) => (dispatch) => {
	axios.post("/api/account/update-info", accountData).catch((err) =>
		dispatch({
			type: SET_INPUT_ERRORS,
			payload: err.response.data.inputErrors,
		})
	);
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

// Logout accout
export const logoutAccount = () => (dispatch) => {
	localStorage.removeItem("jwtToken");
	setAuthorizationToken(false);
	dispatch({
		type: AUTHENTICATE_ACCOUNT,
		payload: {},
	});
};
