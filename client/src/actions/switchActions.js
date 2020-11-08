import {
	projectContainerName,
	bugContainerName,
} from "../reducers/containerNames";

import { PROJECT_CONTAINER, BUG_CONTAINER } from "./constants/containers";
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
		case projectContainerName:
			dispatch(setWhichProjectComponentsDisplay(displays));
			break;
		case bugContainerName:
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
		case projectContainerName:
			dispatch({
				container: PROJECT_CONTAINER,
				type: SET_SEARCH_FILTER_SORT,
				searchFilterSort: searchFilterSort,
			});
			break;
		case bugContainerName:
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
		case projectContainerName:
			dispatch({
				container: PROJECT_CONTAINER,
				type: SET_MASS_DELETE_LIST,
				list: massDeleteList,
			});
			break;
		case bugContainerName:
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

export const createProjectOrBug = (containerName, itemInfo) => (dispatch) => {
	switch (containerName) {
		case projectContainerName:
			dispatch(createProject(itemInfo));
			break;
		case bugContainerName:
			dispatch(createBug(itemInfo));
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
		case projectContainerName:
			dispatch(updateProject(itemInfo, componentsDisplay));
			break;
		case bugContainerName:
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
		case projectContainerName:
			dispatch(deleteProject(id, massDeleteList, indexOfTargetItemId));
			break;
		case bugContainerName:
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
		case projectContainerName:
			dispatch(
				deleteMultipleProjects(projectOrBugArray, projectOrBugComponentsDisplay)
			);
			break;
		case bugContainerName:
			dispatch(
				deleteMultipleBugs(projectOrBugArray, projectOrBugComponentsDisplay)
			);
			break;
		default:
			break;
	}
};
