import { PROJECT_CONTAINER, BUG_CONTAINER } from "./typeContainer";
import { SET_PROJECTS_SEARCH_FILTER_SORT, SET_MASS_DELETE_LIST } from "./types";
import {
	createProject,
	updateProject,
	deleteProject,
	deleteMultipleProjects,
} from "./projectActions";

export const setProjectOrBugSearchFilterSort = (
	containerName,
	searchFilterSort
) => (dispatch) => {
	switch (containerName) {
		case "projectContainer":
			dispatch({
				container: PROJECT_CONTAINER,
				type: SET_PROJECTS_SEARCH_FILTER_SORT,
				searchFilterSort: searchFilterSort,
			});
			break;
		case "bugContainer":
			dispatch({
				container: BUG_CONTAINER,
				type: SET_PROJECTS_SEARCH_FILTER_SORT,
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
		case "projectContainer":
			dispatch({
				container: PROJECT_CONTAINER,
				type: SET_MASS_DELETE_LIST,
				list: massDeleteList,
			});
			break;
		case "bugContainer":
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

export const createProjectOrBug = (containerName, projectInfo) => (
	dispatch
) => {
	switch (containerName) {
		case "projectContainer":
			dispatch(createProject(projectInfo));
			break;
		/* case "bugContainer":
			dispatch(createProject(projectInfo));
			break; */
		default:
			break;
	}
};

export const updateProjectOrBug = (
	containerName,
	projectInfo,
	projectComponentsDisplay
) => (dispatch) => {
	switch (containerName) {
		case "projectContainer":
			dispatch(updateProject(projectInfo, projectComponentsDisplay));
			break;
		/* case "bugContainer":
			dispatch(updateProject(projectInfo, projectComponentsDisplay));
			break; */
		default:
			break;
	}
};

export const deleteProjectOrBug = (
	containerName,
	project_id,
	massDeleteList,
	indexOfTargetProjectId
) => (dispatch) => {
	switch (containerName) {
		case "projectContainer":
			dispatch(deleteProject(project_id, massDeleteList, indexOfTargetProjectId));
			break;
		/* case "bugContainer":
			dispatch(deleteProject(project_id, massDeleteList, indexOfTargetProjectId));
			break; */
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
		case "projectContainer":
			dispatch(
				deleteMultipleProjects(projectOrBugArray, projectOrBugComponentsDisplay)
			);
			break;
		/* case "bugContainer":
			dispatch(
				deleteMultipleProjects(projectOrBugArray, projectOrBugComponentsDisplay)
			);
			break; */
		default:
			break;
	}
};
