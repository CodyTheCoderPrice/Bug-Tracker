import axios from "axios";
import { SET_PRIORITY_STATUS_ARRAYS, SET_INPUT_ERRORS } from "./types";

export * from "./accountActions";
export * from "./projectActions";
export * from "./componentActions";

export const retrievePriorityStatusArrays = () => (dispatch) => {
	axios.get("/api/priority-status/retrieve").then((res) => {
		const {
			projectPriority,
			projectStatus,
			projectStatusCompletionIndex,
			bugPriority,
			bugStatus,
			bugStatusCompletionIndex
		} = res.data;
		dispatch({
			type: SET_PRIORITY_STATUS_ARRAYS,
			projectPriority: projectPriority,
			projectStatus: projectStatus,
			projectStatusCompletionIndex: projectStatusCompletionIndex,
			bugPriority: bugPriority,
			bugStatus: bugStatus,
			bugStatusCompletionIndex: bugStatusCompletionIndex,
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
