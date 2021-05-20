// Container names used to work with the redux state
import { PROJECT_CONTAINER, BUG_CONTAINER } from "./constants/containerNames";
import {
	SET_SEARCH_FILTER_SORT,
	SET_MASS_DELETE_LIST,
} from "./constants/types";
// Dispatch functions
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
 * Depending on which container name is passed (i.e. PROJECT_CONTAINER or 
 * BUG_CONTAINER) sets info in 'componentsDisplay' Object in that container of 
 * the redux state for how those components should be displayed by the app
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - name of
 * either the project or bug container of the redux state
 * @param {{
 * 	listView: (boolean|undefined),
 * 	listViewDeleteModal: (boolean|undefined),
 * 	listViewCreateItemSidbar: (boolean|undefined),
 * 	itemView: (boolean|undefined),
 * 	itemView: (boolean|undefined),
 * 	itemViewEditItemInfo: (boolean|undefined),
 * 	itemViewDeleteModal: (boolean|undefined),
 * 	itemViewCurrentItem: ({
 * 		account_id: (number|undefined),
 * 		project_id: (number,undefined),
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: (string|undefined),
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		last_edited_timestamp: string
 * 	}|null|undefined)
 * }} displays - Object containing info for how either project or bug
 * components should be displyed in the app. Any project or bug components set
 * to undefined or excluded from this param will be set to their default value.
 *
 * @example
 * // Inside PROJECT_CONTAINER of the redux state - sets listView to true, and
 * // ...all other project components to their default values. The dispatch
 * // ...function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setWhichProjectOrBugComponentsDisplay("PROJECT_CONTAINER", {
 * 		listView: true
 * 	})
 * );
 *
 * @example
 * // Inside BUG_CONTAINER of the redux state - sets all bug components to
 * // ...their default values. The dispatch function is from useDispatch()
 * // ...imported from react-redux.
 * dispatch(setWhichProjectOrBugComponentsDisplay("BUG_CONTAINER", {}));
 */
export const setWhichProjectOrBugComponentsDisplay = (
	reduxContainerName,
	displays
) => (dispatch) => {
	switch (reduxContainerName) {
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
 * Depending on which container name is passed (i.e. PROJECT_CONTAINER or 
 * BUG_CONTAINER) sets search/filter/sort info in 'searchFilterSort' Object in 
 * that container of the redux state.
 * 
 * This info is used to search, filter, and sort the 'list' Object in that 
 * container of the redux state.
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - name of
 * either the project or bug container of the redux state
 * @param {{
 * 	priorityFilter: number[],
 * 	searchKeyWordString: string,
 * 	sortAscending: boolean,
 * 	sortId: number,
 * statusFilter: number[],
 * }} searchFilterSort - Object containing the necessary info to search,
 * filter, and sort a list for projects or bugs
 *
 * @example
 * // Inside BUG_CONTAINER of the redux state - sets 'searchFilterSort' object 
 * // ...with the following data. The dispatch function is from useDispatch()
 * // ...imported from react-redux.
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
	reduxContainerName,
	searchFilterSort
) => (dispatch) => {
	switch (reduxContainerName) {
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
 * Depending on which container name is passed (i.e. PROJECT_CONTAINER or 
 * BUG_CONTAINER) an Array of items (either projects or bugs depending on which
 * container) ids to be mass deleted is stored in 'massDeleteList' Object in 
 * that container of the redux state
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - name of
 * either the project or bug container of the redux state
 * @param {number[]} massDeleteList - Array of ids for either projects or bugs
 * to be mass deleted
 *
 * @example
 * // Inside BUG_CONTAINER of the redux state - sets 'massDeleteList' to have 
 * // ...three bug ids. The dispatch function is from useDispatch() imported
 * // ...from react-redux.
 * dispatch(setProjectOrBugMassDeleteList("BUG_CONTAINER", [ 341, 328, 331 ]));
 */
export const setProjectOrBugMassDeleteList = (
	reduxContainerName,
	massDeleteList
) => (dispatch) => {
	switch (reduxContainerName) {
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
 * Depending on which container name is passed (i.e. PROJECT_CONTAINER or 
 * BUG_CONTAINER) will create an item (either project or bug depending on which
 * container) in that container of the redux state
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - name of
 * either the project or bug container of the redux state
 * @param {{
 * 		project_id: (number|undefined),
 * 		name: string,
 * 		description: string,
 * 		location: (string|undefined),
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		priority_id: number,
 * 		status_id: number,
 * }} itemInfo - Object containing the info to create a new project or bug
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		account_id: (number|undefined),
 * 		project_id: (number|undefined),
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: (string|undefined),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		last_edited_timestamp: string,
 * 	}|null),
 * }} componentsDisplay - Object from redux state containing which project or
 * bug components are currently being displayed
 *
 * @example
 * // Inside PROJECT_CONTAINER of the redux state - creates a project. The
 * // ...dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	createProjectOrBug("PROJECT_CONTAINER", {
 * 		name: "Todo website",
 * 		description: "Website to keep track of todos",
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
	reduxContainerName,
	itemInfo,
	componentsDisplay
) => (dispatch) => {
	switch (reduxContainerName) {
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
 * Depending on which container name is passed (i.e. PROJECT_CONTAINER or 
 * BUG_CONTAINER) will update the item (either project or bug depending on 
 * which container) in that container of the redux state
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - name of
 * either the project or bug container of the redux state
 * @param {{
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: (string|undefined),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * }} itemInfo - Object containing the info to update a project or bug
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		account_id: (number|undefined),
 * 		project_id: (number|undefined),
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: (string|undefined),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		last_edited_timestamp: string,
 * 	}|null),
 * }} componentsDisplay - Object from redux state containing which project or
 * bug components are currently being displayed
 *
 * @example
 * // Inside PROJECT_CONTAINER of the redux state - updates project of id 373
 * // ...to have the following data. The dispatch function is from
 * // ...useDispatch() imported from react-redux.
 * dispatch(
 * 	updateProjectOrBug("PROJECT_CONTAINER", {
 * 		id: 373
 * 		name: "Todo tracker website",
 * 		description: "Website for tracking todos",
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
	reduxContainerName,
	itemInfo,
	componentsDisplay
) => (dispatch) => {
	switch (reduxContainerName) {
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
 * Depending on which container name is passed (i.e. PROJECT_CONTAINER or 
 * BUG_CONTAINER) will delete the item (either project or bug depending on which
 * container) and update 'massDeleteList' Object (if it contained the to be
 * deleted item) in that container of the redux state, will update 'list' 
 * Objects in other containers of the redux state as needed, and open the 
 * ListView (for passed container) component while closeing all other 
 * components (for passed container)
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - name of
 * either the project or bug container of the redux state
 * @param {{
 * id: number,
 * project_id: (number|undefined)
 * }} idsObject - Object containing the id of the project or bug to be deleted
 * (if bug, then also the id of the project it belongs to)
 * @param {number[]} massDeleteList - Array of ids for projects or bugs to be
 * mass deleted (needed since if massDeleteList contains the to be deleted
 * project or bug, it will need to be updated)
 *
 * @example
 * // Inside BUG_CONTAINER of the redux state - deletes bug and updates
 * // ...'massDeleteList' Object to no longer contain deleted bug. The dispatch
 * // ...function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	deleteProjectOrBug("BUG_CONTAINER", {
 * 		id: 133,
 * 		project_id: 341
 * 	},
 * 	[ 93, 96, 133 ]
 * 	)
 * );
 */
export const deleteProjectOrBug = (
	reduxContainerName,
	idsObject,
	massDeleteList
) => (dispatch) => {
	switch (reduxContainerName) {
		case PROJECT_CONTAINER:
			dispatch(deleteProject(idsObject.id, massDeleteList));
			break;
		case BUG_CONTAINER:
			dispatch(deleteBug(idsObject, massDeleteList));
			break;
		default:
			break;
	}
};

/**
 * Depending on which container name is passed (i.e. PROJECT_CONTAINER or 
 * BUG_CONTAINER) will delete all items (either project or bug depending on 
 * which container) in 'massDelteList' Object in that container of the redux 
 * state, will update 'list' Objects in other containers of the redux state as
 * needed, and close ItemViewDeleteModal (for passed container) component.
 *
 * @param {("PROJECT_CONTAINER"|"BUG_CONTAINER")} reduxContainerName - name of
 * either the project or bug container of the redux state
 * @param {number[]} massDeleteList - Array of ids for projects or bugs to be
 * mass deleted
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		account_id: (number|undefined),
 * 		project_id: (number|undefined),
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: (string|undefined),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		last_edited_timestamp: string,
 * 	}|null),
 * }} componentsDisplay - Object from redux state containing which project or
 * bug components are currently being displayed (may need updating if a deleted
 * item is the itemViewCurrentItem)
 *
 * @example
 * // Inside bug container of the redux state - deletes all bugs in
 * // ...massDeleteList. The dispatch function is from useDispatch() imported
 * // ...from react-redux.
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
	reduxContainerName,
	massDeleteList,
	componentsDisplay
) => (dispatch) => {
	switch (reduxContainerName) {
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
