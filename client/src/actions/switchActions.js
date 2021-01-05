// Redux containers
import { PROJECT_CONTAINER, BUG_CONTAINER } from "./constants/containerNames";
// Redux types
import {
	SET_SEARCH_FILTER_SORT,
	SET_MASS_DELETE_LIST,
} from "./constants/types";
// Redux dispatch functions
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

/**
 * Depending on which container name is passed (project or bug) the components
 * display JSON will be stored in for that contianer in the redux state
 *
 * @param {String} containerName - name of either the project or bug
 * container of the redux state
 * @param {JSON} displays - JSON containing info for how either project or bug
 * components should be displyed in the app
 */
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

/**
 * Depending on which container name is passed (project or bug) a JSON object
 * containing the necessary info to search, filter, and sort a list for
 * projects or bugs is stored in that container of the redux state
 *
 * @param {String} containerName - name of either the project or bug
 * container of the redux state
 * @param {JSON} searchFilterSort - JSON containing the necessary info to
 * search, filter, and sort a list for projects or bugs
 */
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

/**
 * Depending on which container name is passed (project or bug) an array of ids
 * for either projects or bugs to be mass deleted is stored in that container
 * of the redux state
 *
 * @param {String} containerName - name of either the project or bug
 * container of the redux state
 * @param {Number[]} massDeleteList - array of ids for either projects or bugs
 * to be mass deleted
 */
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

/**
 * Depending on which container name is passed (project or bug) calls that
 * categories create action
 *
 * @param {String} containerName - name of either the project or bug
 * container of the redux state
 * @param {JSON} itemInfo - JSON containing the info to create a new project
 * or bug
 * @param {JSON} componentsDisplay - JSON from redux state containing
 * which project or bug components are currently being displayed
 */
export const createProjectOrBug = (
	containerName,
	itemInfo,
	componentsDisplay
) => (dispatch) => {
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

/**
 * Depending on which container name is passed (project or bug) calls that
 * categories update action
 *
 * @param {String} containerName - name of either the project or bug container
 * of the redux state
 * @param {JSON} itemInfo - JSON containing the info to update a project or bug
 * @param {JSON} componentsDisplay - JSON from redux state containing which
 * project or bug components are currently being displayed
 */
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

/**
 * Depending on which container name is passed (project or bug) calls that
 * categories delete action
 *
 * @param {String} containerName - name of either the project or bug
 * container of the redux state
 * @param {JSON} idJson - JSON containing the id of the project or bug to be
 * deleted (if bug, then also the id of the project it belongs to)
 * @param {Number[]} massDeleteList - array of ids for projects or bugs to be
 * mass deleted
 */
export const deleteProjectOrBug = (containerName, idJson, massDeleteList) => (
	dispatch
) => {
	switch (containerName) {
		case PROJECT_CONTAINER:
			dispatch(deleteProject(idJson, massDeleteList));
			break;
		case BUG_CONTAINER:
			dispatch(deleteBug(idJson, massDeleteList));
			break;
		default:
			break;
	}
};

/**
 * Depending on which container name is passed (project or bug) calls that
 * categories delete multiple action
 *
 * @param {String} containerName - name of either the project or bug
 * container of the redux state
 * @param {Number[]} massDeleteList - array of ids for projects or bugs to be
 * mass deleted
 * @param {JSON} componentsDisplay - JSON from redux state containing which
 * project or bug components are currently being displayed
 */
export const deleteMultipleProjectsOrBugs = (
	containerName,
	massDeleteList,
	componentsDisplay
) => (dispatch) => {
	switch (containerName) {
		case PROJECT_CONTAINER:
			dispatch(deleteMultipleProjects(massDeleteList, componentsDisplay));
			break;
		case BUG_CONTAINER:
			dispatch(deleteMultipleBugs(massDeleteList, componentsDisplay));
			break;
		default:
			break;
	}
};
