import axios from "axios";
import jwt_decode from "jwt-decode";

import { ACCOUNT_CONTAINER } from "./constants/containers";
import { SET_AUTHENTICATION, SET_ACCOUNT } from "./constants/types";
import { retrievePriorityStatusArrays, setInputErrors, resetRedux } from "./index";
import {
	setWhichGeneralComponentsDisplay,
	setWhichAccountComponentsDisplay,
} from "./componentActions";
import { retrieveProjects } from "./projectActions";
import { retrieveBugs } from "./bugActions";

export const setAuthentication = (decodedToken) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_AUTHENTICATION,
		decodedToken: decodedToken,
	});
};

export const setAccount = (account) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_ACCOUNT,
		account: account,
	});
};

export const registerAccount = (accountInfo) => (dispatch) => {
	axios
		.post("/api/account/register", accountInfo)
		.then(() => {
			dispatch(setWhichGeneralComponentsDisplay({ login: true }));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));
		});
};

export const loginAccount = (accountInfo) => (dispatch) => {
	axios
		.post("/api/account/login", accountInfo)
		.then((res) => {
			const { jwToken, account } = res.data;
			localStorage.setItem("jwToken", jwToken);

			const decodedToken = jwt_decode(jwToken);

			dispatch(setAuthentication(decodedToken));

			dispatch(setAccount(account));
			dispatch(retrieveProjects());
			dispatch(retrieveBugs());
			dispatch(setWhichGeneralComponentsDisplay({ home: true }));
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
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const updateAccountInfo = (accountInfo) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/account/update-info", accountInfo, headers)
		.then((res) => {
			const { account } = res.data;
			dispatch(setAccount(account));
			dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const updateAccountEmail = (accountInfo) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/account/update-email", accountInfo, headers)
		.then((res) => {
			const { account } = res.data;
			dispatch(setAccount(account));
			dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const updateAccountPassword = (accountInfo) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/account/update-password", accountInfo, headers)
		.then((res) => {
			const { account } = res.data;
			dispatch(setAccount(account));
			dispatch(setWhichAccountComponentsDisplay({}));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const deleteAccount = (accountInfo) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/account/delete", accountInfo, headers)
		.then((res) => {
			dispatch(logoutAccount());
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));
		});
};

export const logoutAccount = () => (dispatch) => {
	localStorage.removeItem("jwToken");

	// Reset redux
	dispatch(resetRedux());
	// Refetch priority and status options encase logging back in
	dispatch(retrievePriorityStatusArrays());

	console.log("Message: logged out");
};
