import axios from "axios";

// Redux containers
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "./constants/containerNames";
// Redux types
import {
	SET_DISPLAY_SIZE_CONSTANTS,
	SET_DISPLAY_SIZE_VARIABLES,
	SET_PRIORITY_STATUS,
	SET_INPUT_ERRORS,
} from "./constants/types";

// Exporting redux dispatch functions from all other action files
export * from "./accountActions";
export * from "./projectActions";
export * from "./bugActions";
export * from "./commentActions";
export * from "./componentActions";
export * from "./switchActions";
export * from "./resetActions";

export const setDisplaySizeConstants = (sizes) => (dispatch) => {
	dispatch({
		container: SIZE_CONTAINER,
		type: SET_DISPLAY_SIZE_CONSTANTS,
		sizes: sizes,
	});
};

export const setDisplaySizeVariables = (sizes) => (dispatch) => {
	dispatch({
		container: SIZE_CONTAINER,
		type: SET_DISPLAY_SIZE_VARIABLES,
		sizes: sizes,
	});
};

export const setPriorityStatus = (
	projectPriorityStatus,
	bugPriorityStatus
) => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: SET_PRIORITY_STATUS,
		priorityStatusInfo: projectPriorityStatus,
	});
	dispatch({
		container: BUG_CONTAINER,
		type: SET_PRIORITY_STATUS,
		priorityStatusInfo: bugPriorityStatus,
	});
};

export const retrievePriorityStatusArrays = () => (dispatch) => {
	axios.get("/api/priority-status/retrieve").then((res) => {
		const { projectPriorityStatus, bugPriorityStatus } = res.data;
		dispatch(
			setPriorityStatus(
				projectPriorityStatus,
				bugPriorityStatus
			)
		);
	}).catch((err) => {
		console.log(err);
	});
};

export const setInputErrors = (inputErrors) => (dispatch) => {
	dispatch({
		container: GENERAL_CONTAINER,
		type: SET_INPUT_ERRORS,
		inputErrors: inputErrors,
	});
};

export const clearInputErrors = () => (dispatch) => {
	dispatch({
		container: GENERAL_CONTAINER,
		type: SET_INPUT_ERRORS,
		inputErrors: {},
	});
};

/**
* Creates a header containing jwToken from localStorage (set during login)
* so the server can both decode it to get the account_id for the call
* as well as authenticate the call without being sent a password
* 
* @returns {JSON} header containing jwToken from localStorage
*/
export const createHeader = () => {
   return { headers: { jwToken: localStorage.jwToken } }; 
}
