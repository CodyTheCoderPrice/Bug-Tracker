import {
	SET_AUTHENTICATION,
	SET_ACCOUNT,
	SET_INPUT_ERRORS,
	SET_MODAL_COMPONENT,
} from "./types";
export * from "./accountAxiosActions";

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

// Set input errors
export const setInputErrors = (inputErrors) => (dispatch) => {
	dispatch({
		type: SET_INPUT_ERRORS,
		inputErrors: inputErrors,
	});
};

// Clear input errors
export const clearInputErrors = () => (dispatch) => {
	dispatch({
		type: SET_INPUT_ERRORS,
		inputErrors: {},
	});
};

// set modal component
export const setModalComponent = (component) => (dispatch) => {
	dispatch({
		type: SET_MODAL_COMPONENT,
		component: component,
	});
};
