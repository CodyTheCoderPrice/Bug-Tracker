import axios from "axios";
import { PROJECT_CONTAINER } from "./typeContainer";
import {
	SET_DISPLAY_SIZE_CONSTANTS,
	SET_DISPLAY_SIZE_VARIABLES,
	SET_PRIORITY_STATUS_ARRAYS,
	SET_PROJECTS_SEARCH_FILTER_SORT,
	SET_MASS_DELETE_LIST,
	SET_INPUT_ERRORS,
} from "./types";

export * from "./accountActions";
export * from "./projectActions";
export * from "./componentActions";

export const setDisplaySizeConstants = (sizes) => (dispatch) => {
	dispatch({
		type: SET_DISPLAY_SIZE_CONSTANTS,
		sizes: sizes,
	});
};

export const setDisplaySizeVariables = (sizes) => (dispatch) => {
	dispatch({
		type: SET_DISPLAY_SIZE_VARIABLES,
		sizes: sizes,
	});
};

export const retrievePriorityStatusArrays = () => (dispatch) => {
	axios.get("/api/priority-status/retrieve").then((res) => {
		const {
			projectPriority,
			projectStatus,
			projectStatusCompletionId,
			bugPriority,
			bugStatus,
			bugStatusCompletionId,
		} = res.data;
		dispatch({
			type: SET_PRIORITY_STATUS_ARRAYS,
			projectPriority: projectPriority,
			projectStatus: projectStatus,
			projectStatusCompletionId: projectStatusCompletionId,
			bugPriority: bugPriority,
			bugStatus: bugStatus,
			bugStatusCompletionId: bugStatusCompletionId,
		});
	});
};

export const setProjectsSearchFilterSort = (searchFilterSort) => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: SET_PROJECTS_SEARCH_FILTER_SORT,
		searchFilterSort: searchFilterSort,
	});
};

export const setMassDeleteList = (containerName, massDeleteList) => (dispatch) => {
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
		type: SET_INPUT_ERRORS,
		inputErrors: inputErrors,
	});
};

export const clearInputErrors = () => (dispatch) => {
	dispatch({
		type: SET_INPUT_ERRORS,
		inputErrors: {},
	});
};
