import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_AUTHENTICATION, SET_ACCOUNT } from "./types";
import { setInputErrors } from "./index";
import { setWhichAuthComponentsDisplay } from "./componentActions";
import { retrieveProjects } from "./projectActions";

export const setAuthentication = (decodedToken) => (dispatch) => {
	dispatch({
		type: SET_AUTHENTICATION,
		decodedToken: decodedToken,
	});
};

export const setAccount = (account) => (dispatch) => {
	dispatch({
		type: SET_ACCOUNT,
		account: account,
	});
};

export const registerAccount = (accountData) => (dispatch) => {
	axios
		.post("/api/account/register", accountData)
		.then(() => {
			dispatch(setWhichAuthComponentsDisplay({ login: true }));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));
		});
};

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
			dispatch(setWhichAuthComponentsDisplay({ home: true }));
		})
		.catch((err) => {
			if (err.response !== undefined) {
				dispatch(setInputErrors(err.response.data.inputErrors));
			}
		});
};

export const retrieveAccount = () => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/account/retrieve", null, headers)
		.then((res) => {
			const { account } = res.data;
			dispatch(setAccount(account));
			dispatch(setWhichAuthComponentsDisplay({ home: true }));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

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

export const logoutAccount = () => (dispatch) => {
	localStorage.removeItem("jwToken");

	// clear auth and account
	dispatch(setAuthentication({}));
	dispatch(setAccount({}));
	dispatch(setWhichAuthComponentsDisplay({ login: true }));

	console.log("Message: logged out");
};
