import {
	SET_INPUT_ERRORS,
} from "./types";

export * from "./accountActions";
export * from "./projectActions";
export * from "./componentActions";

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