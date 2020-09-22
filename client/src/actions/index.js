import axios from "axios";
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "./typeContainer";
import {
	SET_DISPLAY_SIZE_CONSTANTS,
	SET_DISPLAY_SIZE_VARIABLES,
	SET_PRIORITY_STATUS_OPTIONS,
	SET_MASS_DELETE_LIST,
	SET_INPUT_ERRORS,
} from "./types";

export * from "./accountActions";
export * from "./projectActions";
export * from "./componentActions";
export * from "./switchActions";

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

export const retrievePriorityStatusArrays = () => (dispatch) => {
	axios.get("/api/priority-status/retrieve").then((res) => {
		const { projectPriorityStatusOptions, bugPriorityStatusOptions } = res.data;
		dispatch({
			container: PROJECT_CONTAINER,
			type: SET_PRIORITY_STATUS_OPTIONS,
			priorityOptions: projectPriorityStatusOptions.priorityOptions,
			statusOptions: projectPriorityStatusOptions.statusOptions,
			statusCompletionId: projectPriorityStatusOptions.statusCompletionId,
		});
		dispatch({
			container: BUG_CONTAINER,
			type: SET_PRIORITY_STATUS_OPTIONS,
			priorityOptions: bugPriorityStatusOptions.priorityOptions,
			statusOptions: bugPriorityStatusOptions.statusOptions,
			statusCompletionId: bugPriorityStatusOptions.statusCompletionId,
		});
	});
};

export const setProjectsMassDeleteList = (containerName, massDeleteList) => (dispatch) => {
	if (containerName === "project"){
		containerName = PROJECT_CONTAINER;
	} /* else if (containerName === "bug"){
		containerName = 
	} */
	
	dispatch({
		container: containerName,
		type: SET_MASS_DELETE_LIST,
		list: massDeleteList,
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
