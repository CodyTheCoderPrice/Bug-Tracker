import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "./constants/containerNames";

import {
	SET_SEARCH_FILTER_SORT,
	SET_MASS_DELETE_LIST,
} from "./constants/types";

import {
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	createProject,
	updateProject,
	deleteProject,
	deleteMultipleProjects,
	createBug,
	updateBug,
	deleteBug,
	deleteMultipleBugs,
} from "./index";

export const setWhichProjectOrBugComponentsDisplay = (
	containerName,
	displays
) => (dispatch) => {
	switch (containerName) {
		case PROJECT_CONTAINER:
			dispatch(setWhichProjectComponentsDisplay(displays));
			break;
		case BUG_CONTAINER:
			dispatch(setWhichBugComponentsDisplay(displays));
			break;
		default:
			break;
	}
};

export const setProjectOrBugSearchFilterSort = (
	containerName,
	searchFilterSort
) => (dispatch) => {
	switch (containerName) {
		case PROJECT_CONTAINER:
			dispatch({
				container: PROJECT_CONTAINER,
				type: SET_SEARCH_FILTER_SORT,
				searchFilterSort: searchFilterSort,
			});
			break;
		case BUG_CONTAINER:
			dispatch({
				container: BUG_CONTAINER,
				type: SET_SEARCH_FILTER_SORT,
				searchFilterSort: searchFilterSort,
			});
			break;
		default:
			break;
	}
};

export const setProjectOrBugMassDeleteList = (
	containerName,
	massDeleteList
) => (dispatch) => {
	switch (containerName) {
		case PROJECT_CONTAINER:
			dispatch({
				container: PROJECT_CONTAINER,
				type: SET_MASS_DELETE_LIST,
				list: massDeleteList,
			});
			break;
		case BUG_CONTAINER:
			dispatch({
				container: BUG_CONTAINER,
				type: SET_MASS_DELETE_LIST,
				list: massDeleteList,
			});
			break;
		default:
			break;
	}
};

export const createProjectOrBug = (containerName, itemInfo, componentsDisplay) => (dispatch) => {
	switch (containerName) {
		case PROJECT_CONTAINER:
			dispatch(createProject(itemInfo, componentsDisplay));
			break;
		case BUG_CONTAINER:
			dispatch(createBug(itemInfo, componentsDisplay));
			break;
		default:
			break;
	}
};

export const updateProjectOrBug = (
	containerName,
	itemInfo,
	componentsDisplay
) => (dispatch) => {
	switch (containerName) {
		case PROJECT_CONTAINER:
			dispatch(updateProject(itemInfo, componentsDisplay));
			break;
		case BUG_CONTAINER:
			dispatch(updateBug(itemInfo, componentsDisplay));
			break;
		default:
			break;
	}
};

export const deleteProjectOrBug = (
	containerName,
	id,
	massDeleteList,
	indexOfTargetItemId
) => (dispatch) => {
	switch (containerName) {
		case PROJECT_CONTAINER:
			dispatch(deleteProject(id, massDeleteList, indexOfTargetItemId));
			break;
		case BUG_CONTAINER:
			dispatch(deleteBug(id, massDeleteList, indexOfTargetItemId));
			break;
		default:
			break;
	}
};

export const deleteMultipleProjectsOrBugs = (
	containerName,
	projectOrBugArray,
	projectOrBugComponentsDisplay
) => (dispatch) => {
	switch (containerName) {
		case PROJECT_CONTAINER:
			dispatch(
				deleteMultipleProjects(projectOrBugArray, projectOrBugComponentsDisplay)
			);
			break;
		case BUG_CONTAINER:
			dispatch(
				deleteMultipleBugs(projectOrBugArray, projectOrBugComponentsDisplay)
			);
			break;
		default:
			break;
	}
};
