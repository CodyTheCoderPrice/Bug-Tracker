import axios from "axios";
import { SET_PRIORITY_STATUS_OPTIONS, SET_INPUT_ERRORS } from "./types";

export * from "./accountActions";
export * from "./projectActions";
export * from "./componentActions";

export const retrievePriorityStatusOptions = () => (dispatch) => {
	axios.get("/api/priority-status/retrieve").then((res) => {
		const {
			projectPriorityOptions,
			projectStatusOptions,
			bugPriorityOptions,
			bugStatusOptions,
		} = res.data;
		dispatch({
			type: SET_PRIORITY_STATUS_OPTIONS,
			projectPriorityOptions: projectPriorityOptions,
			projectStatusOptions: projectStatusOptions,
			bugPriorityOptions: bugPriorityOptions,
			bugStatusOptions: bugStatusOptions,
		});
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
