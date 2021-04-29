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
 * display JSON will be stored in that contianer in the redux state
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} containerName - name of
 * either the project or bug container of the redux state
 * @param {{
 * 	listView: (Boolean|undefined),
 * 	listViewDeleteModal: (Boolean|undefined),
 * 	listViewCreateItemSidbar: (Boolean|undefined),
 * 	itemView: (Boolean|undefined),
 * 	itemView: (Boolean|undefined),
 * 	itemViewEditItemInfo: (Boolean|undefined),
 * 	itemViewDeleteModal: (Boolean|undefined),
 * 	itemViewCurrentItem: ({
 * 		account_id: (Number|undefined),
 * 		project_id: (Number,undefined),
 * 		id: Number,
 * 		name: String,
 * 		description: String,
 * 		location: (String|undefined),
 * 		creation_date: String,
 * 		start_date: (String|null),
 * 		due_date: (String|null),
 * 		completion_date: (String|null),
 * 		priority_id: Number,
 * 		priority_option: String,
 * 		status_id: Number,
 * 		status_option: String,
 * 		last_edited_timestamp: String
 * 	}|null|undefined)
 * }} displays - JSON containing info for how either project or bug components
 * should be displyed in the app. Any project or bug components set to
 * undefined or excluded from this param will be set to their default value.
 *
 * @example
 * // Inside project container of the redux state - sets listView to true, and
 * // ...all other bug components to their default values
 * dispatch(
 * 	setWhichProjectOrBugComponentsDisplay("PROJECT_CONTAINER", {
 * 		listView: true
 * 	})
 * );
 *
 * @example
 * // Inside bug container of the redux state - sets all bug components to
 * // ...their default values
 * dispatch(setWhichProjectOrBugComponentsDisplay("BUG_CONTAINER", {}));
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
 * is stored in that container of the redux state containing the necessary info
 * to search, filter, and sort a list of items (projects or bugs)
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} containerName - name of
 * either the project or bug container of the redux state
 * @param {{
 * 	priorityFilter: Number[],
 * 	searchKeyWordString: String,
 * 	sortAscending: Boolean,
 * 	sortId: Number,
 * statusFilter: Number[],
 * }} searchFilterSort - JSON containing the necessary info to search, filter,
 * and sort a list for projects or bugs
 *
 * @example
 * // Inside bug container of the redux state - sets searchFilterSort object
 * dispatch(
 * 	setProjectOrBugSearchFilterSort("BUG_CONTAINER", {
 * 		priorityFilter: [ 2, 3 ],
 * 		searchKeyWordString: "",
 * 		​sortAscending: true,
 * 		​sortId: 2,
 * 		​statusFilter: [ 4, 2 ],
 * 	})
 * );
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
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} containerName - name of
 * either the project or bug container of the redux state
 * @param {Number[]} massDeleteList - array of ids for either projects or bugs
 * to be mass deleted
 *
 * @example
 * // Inside bug container of the redux state - sets massDeleteList
 * dispatch(setProjectOrBugMassDeleteList("BUG_CONTAINER", [ 341, 328, 331 ]));
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
 * Depending on which container name is passed (project or bug) with create an 
 * item (project or bug) in that container of the redux state
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} containerName - name of
 * either the project or bug container of the redux state
 * @param {{
 * 		project_id: (Number|undefined),
 * 		name: String,
 * 		description: String,
 * 		location: (String|undefined),
 * 		start_date: (String|null),
 * 		due_date: (String|null),
 * 		completion_date: (String|null),
 * 		priority_id: Number,
 * 		status_id: Number,
 * }} itemInfo - JSON containing the info to create a new project or bug
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		account_id: (Number|undefined),
 * 		project_id: (Number|undefined),
 * 		id: Number,
 * 		name: String,
 * 		description: String,
 * 		location: (String|undefined),
 * 		priority_id: Number,
 * 		priority_option: String,
 * 		status_id: Number,
 * 		status_option: String,
 * 		creation_date: String,
 * 		start_date: (String|null),
 * 		due_date: (String|null),
 * 		completion_date: (String|null),
 * 		last_edited_timestamp: String,
 * 	}|null),
 * }} componentsDisplay - JSON from redux state containing which project or bug
 * components are currently being displayed
 *
 * @example
 * // Inside project container of the redux state - creates project
 * dispatch(
 * 	createProjectOrBug("PROJECT_CONTAINER", {
 * 		name: "Cool project",
 * 		description: "Cool description",
 * 		priority_id: 4,
 * 		status_id: 4,
 * 		start_date: "2021-04-29",
 * 		due_date: "2021-05-21",
 * 		completion_date: ""
 * 	}, {
 * 		listView: true,
 * 		listViewDeleteModal: false,
 * 		listViewCreateItemSidbar: true,
 * 		itemView: false,
 * 		itemViewEditItemInfo: false,
 * 		itemViewDeleteModal: false,
 * 		itemViewCurrentItem: null
 * 	})
 * );
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
 * Depending on which container name is passed (project or bug) will update the
 * item (project or bug) in that container of the redux state
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} containerName - name of
 * either the project or bug container of the redux state
 * @param {{
 * 		id: Number,
 * 		name: String,
 * 		description: String,
 * 		location: (String|undefined),
 * 		priority_id: Number,
 * 		priority_option: String,
 * 		status_id: Number,
 * 		creation_date: String,
 * 		start_date: (String|null),
 * 		due_date: (String|null),
 * 		completion_date: (String|null),
 * }} itemInfo - JSON containing the info to update a project or bug
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		account_id: (Number|undefined),
 * 		project_id: (Number|undefined),
 * 		id: Number,
 * 		name: String,
 * 		description: String,
 * 		location: (String|undefined),
 * 		priority_id: Number,
 * 		priority_option: String,
 * 		status_id: Number,
 * 		status_option: String,
 * 		creation_date: String,
 * 		start_date: (String|null),
 * 		due_date: (String|null),
 * 		completion_date: (String|null),
 * 		last_edited_timestamp: String,
 * 	}|null),
 * }} componentsDisplay - JSON from redux state containing which project or bug
 * components are currently being displayed
 * 
 * @example
 * // Inside project container of the redux state - updates project
 * dispatch(
 * 	updateProjectOrBug("PROJECT_CONTAINER", {
 * 		id: 373
 * 		name: "Cool project updated",
 * 		description: "Cool description updated",
 * 		priority_id: 4,
 * 		priorityOption: "High",
 * 		status_id: 4,
 * 		statusOption: "Testing",
 * 		creation_date: "04-29-2021",
 * 		start_date: "2021-04-29",
 * 		due_date: "2021-05-21",
 * 		completion_date: ""
 * 	}, {
 * 		listView: true,
 * 		listViewDeleteModal: false,
 * 		listViewCreateItemSidbar: true,
 * 		itemView: false,
 * 		itemViewEditItemInfo: false,
 * 		itemViewDeleteModal: false,
 * 		itemViewCurrentItem: null
 * 	})
 * );
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
 * Depending on which container name is passed (project or bug) will delete the
 * item (project or bug) and update the massDeleteList (if it contained the to 
 * be deleted item) in that container of the redux state, will update lists in
 * other containers of the redux state as needed, and close the 
 * itemViewDeleteModal
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} containerName - name of
 * either the project or bug container of the redux state
 * @param {{ 
 * id: Number, 
 * project_id: (Number|undefined)
 * }} idJson - JSON containing the id of the project or bug to be deleted (if 
 * bug, then also the id of the project it belongs to)
 * @param {Number[]} massDeleteList - array of ids for projects or bugs to be
 * mass deleted (needed since if massDeleteList contains the to be deleted 
 * project or bug, it will need to be updated)
 * 
 * @example
 *  // Inside bug container of the redux state - deletes bug and updates
 *  // ...massDeleteList to no longer contain deleted bug
 * dispatch(
 * 	deleteProjectOrBug("BUG_CONTAINER", {
 * 		id: 133, 
 * 		project_id: 341
 * 	}, 
 * 	[ 93, 96, 133 ]
 * 	)
 * );
 */
export const deleteProjectOrBug = (containerName, idJson, massDeleteList) => (
	dispatch
) => {
	switch (containerName) {
		case PROJECT_CONTAINER:
			dispatch(deleteProject(idJson.id, massDeleteList));
			break;
		case BUG_CONTAINER:
			dispatch(deleteBug(idJson, massDeleteList));
			break;
		default:
			break;
	}
};

/**
 * Depending on which container name is passed (project or bug) will delete all
 * items (projects or bugs) in the massDelteList, update all lists in the redux
 * state as needed, and close the itemViewDeleteModal
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} containerName - name of
 * either the project or bug container of the redux state
 * @param {Number[]} massDeleteList - array of ids for projects or bugs to be
 * mass deleted
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		account_id: (Number|undefined),
 * 		project_id: (Number|undefined),
 * 		id: Number,
 * 		name: String,
 * 		description: String,
 * 		location: (String|undefined),
 * 		priority_id: Number,
 * 		priority_option: String,
 * 		status_id: Number,
 * 		status_option: String,
 * 		creation_date: String,
 * 		start_date: (String|null),
 * 		due_date: (String|null),
 * 		completion_date: (String|null),
 * 		last_edited_timestamp: String,
 * 	}|null),
 * }} componentsDisplay - JSON from redux state containing which project or bug
 * components are currently being displayed (may need updating if a deleted 
 * item is the itemViewCurrentItem)
 * 
 * @example
 * // Inside bug container of the redux state - deletes all bugs in 
 * // ...massDeleteList
 * dispatch(
 * 	deleteMultipleProjectsOrBugs("BUG_CONTAINER", [ 93, 96, 133 ],
 * 	{
 * 		listView: true,
 * 		listViewDeleteModal: false,
 * 		listViewCreateItemSidbar: true,
 * 		itemView: false,
 * 		itemViewEditItemInfo: false,
 * 		itemViewDeleteModal: false,
 * 		itemViewCurrentItem: null
 * 	})
 * );
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
