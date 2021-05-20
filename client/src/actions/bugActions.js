import axios from "axios";
// Container names used to work with the redux state
import { BUG_CONTAINER } from "./constants/containerNames";
import { SET_LIST } from "./constants/types";
// Dispatch functions
import {
	createHeader,
	seBackendErrors,
	logoutAccount,
	setComments,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "./index";

/**
 * Sets bugs list in 'list' Object in BUG_CONTAINER of the redux state
 *
 * @param {{
 * 	id: number, 
 * 	project_id: number, 
 * 	name: string, 
 * 	description: string, 
 *	location: string, 	
 * 	priority_id: number, 
 * 	status_id: number, 
 * 	creation_date: string, 
 * 	start_date: string, 
 * 	due_date: (string|null), 
 * 	completion_date: (string|null), 
 * 	last_edited_timestamp: string, 
 * 	priority_option: string, 
 * 	status_option: string
 * }[]} bugList - Array of Objects containing the bugs list
 * 
 * @example
 * // Sets a list of two bugs belonging to a project with the id 373. The 
 * // ...dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setProjects([{ 
 * 		id: 50, 
 * 		project_id: 373, 
 * 		name: "Api request errors", 
 * 		description: "Requests to the api returns errors", 
 * 		location: "Backend", 
 * 		priority_id: 4, 
 * 		status_id: 5, 
 * 		creation_date: "2019-03-05T05:00:00.000Z", 
 * 		start_date: "2019-03-05T05:00:00.000Z", 
 * 		due_date: "2019-05-17T04:00:00.000Z", 
 * 		completion_date: null, 
 * 		last_edited_timestamp: "1610389329", 
 * 		priority_option: "High", 
 * 		status_option: "Testing" 
 * 	}, { 
 * 		id: 51, 
 * 		project_id: 373, 
 * 		name: "Bootstrap not displaying correctly", 
 * 		description: "Data does not fit correctly into bootstrap table", 
 * 		location: "Home page",
 * 		priority_id: 2, 
 * 		status_id: 3, 
 * 		creation_date: "2019-09-08T04:00:00.000Z", 
 * 		start_date: "2019-09-08T04:00:00.000Z", 
 * 		due_date: null, 
 * 		completion_date: null, 
 * 		last_edited_timestamp: "1615672259", 
 * 		priority_option: "Low", 
 * 		status_option: "Planning" 
 * 	}])
 * );
 */
export const setBugs = (bugList) => (dispatch) => {
	dispatch({
		container: BUG_CONTAINER,
		type: SET_LIST,
		// Property called 'list' instead of 'bugList' since redux reducer is
		// ...shared with setProjects in projectActions file
		list: bugList,
	});
};

/**
 * Calls /api/bug/create route to create a new bug in the database, store the
 * updated bugs list in 'list' Object in BUG_CONTAINER of the redux state, and
 * close the ListViewCreateItemSidbar (for bugs) component
 *
 * @param {{
 * 		project_id: number,
 * 		name: string,
 * 		description: string,
 * 		location: string,
 * 		priority_id: number,
 * 		status_id: number,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * }} bugInfo - Object containing the info to create a new bug
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		project_id: number,
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: string,
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
 * }} bugComponentsDisplay - Object from redux state containing which bug 
 * components are currently being displayed
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	createBug({ 
 * 		project_id: 373,
 * 		name: "Wrong todos being deleted", 
 * 		description: "Clicking the delete button deletes the wrong todo", 
 * 		location: "Todos page", 
 * 		priority_id: 2, 
 * 		status_id: 2, 
 * 		start_date: "2021-04-29", 
 * 		due_date: "2021-05-12", 
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
export const createBug = (bugInfo, bugComponentsDisplay) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/bug/create", bugInfo, header)
		.then((res) => {
			const { bugs } = res.data;
			dispatch(setBugs(bugs));

			// bug creation was succesful, so closing the
			// ...listViewCreateItemSidbar
			dispatch(
				setWhichBugComponentsDisplay({
					...bugComponentsDisplay,
					listViewCreateItemSidbar: false,
				})
			);
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls /api/bug/retrieve route to retrieve bugs list from the database and
 * store it in 'list' Object in BUG_CONTAINER of the redux state
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(retrieveBugs());
 */
export const retrieveBugs = () => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/bug/retrieve", null, header)
		.then((res) => {
			const { bugs } = res.data;
			dispatch(setBugs(bugs));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls /api/bug/update route to update a bug in the database, store the
 * updated bugs list in 'list' Object in BUG_CONTAINER of the redux state, and
 * turn off the editing mode for ItemView (for bugs) component
 *
 * @param {{
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: string,
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * }} bugInfo - Object containing the info to update a bug
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		id: number,
 * 		project_id: number,
 * 		name: string,
 * 		description: string,
 * 		location: string,
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
 * }} bugComponentsDisplay - Object from redux state containing which bug 
 * components are currently being displayed
 * 
 * @example
 * // updates bug with id 50 to have the following data. The dispatch function 
 * // ...is from useDispatch() imported from react-redux.
 * dispatch(
 * 	updateBug({
 * 		id: 50,  
 * 		name: "Create todo Api error", 
 * 		description: "Api requests for creating todos throws errors", 
 * 		location: "Backend",  
 * 		priority_id: 4, 
 * 		priority_option: "High",
 * 		status_id: 4,
 * 		statusOption: "Closed",
 * 		creation_date: "04-29-2021",
 * 		start_date: "2021-04-29",
 * 		due_date: "2021-05-21",
 * 		completion_date: "2021-05-10"
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
export const updateBug = (bugInfo, bugComponentsDisplay) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/bug/update", bugInfo, header)
		.then((res) => {
			const { bugs } = res.data;
			dispatch(setBugs(bugs));

			// bug update was succesful, so closing itemViewEditItemInfo
			dispatch(
				setWhichBugComponentsDisplay({
					...bugComponentsDisplay,
					// if itemViewCurrentItem was set to the pre-edited bug, then it
					// ...is updated to the post-edited bug
					itemViewCurrentItem:
						bugComponentsDisplay.itemViewCurrentItem.id !== bugInfo.id
							? bugComponentsDisplay.itemViewCurrentItem
							: bugs.filter((bug) => {
									return bug.id === bugInfo.id;
							  })[0],
					itemViewEditItemInfo: false,
				})
			);
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls /api/bug/delete route to delete a bug in the database, store the
 * updated bugs and comments list in their corresponding containers (i.e.
 *  BUG_CONTAINER and COMMENT_CONTAINER) of the redux state, update 
 * 'massDeleteList' Object (if it contained the deleted bug) in BUG_CONTAINER
 * of the redux state, and open the ListView (for bugs) component while 
 * closeing all other bug components
 *
 * @param {{ 
 * id: number, 
 * project_id: number
 * }} idsObject - Object containing the id of the bug to be deletedand the id 
 * of the project it belongs to
 * @param {number[]} massDeleteList - Array of ids for bugs to be mass deleted 
 * (needed since if massDeleteList contains the to be deleted project, it will 
 * need to be updated)
 * 
 * @example
 * // Deletes bug and updates massDeleteList to no longer contain deleted bug.
 * // ...The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(deleteBug({ id: 134, project_id: 341 }, [ 134, 96, 93 ]));
 */
export const deleteBug = (idsObject, massDeleteList) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/bug/delete", idsObject, header)
		.then((res) => {
			// since deleting a bug also deletes the comments it had, the
			// ...comments lists is also updated in redux state
			const { bugs, comments } = res.data;
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));

			const deletedBugIndexInMassDeleteList = massDeleteList.indexOf(idsObject.id);

			// checks if the deleted bug id was in the massDeleteList, and if
			// ...so removes it and updates 'massDeleteList' Object in 
			// ...BUG_CONTAINER of the redux state
			if (deletedBugIndexInMassDeleteList > -1) {
				massDeleteList.splice(deletedBugIndexInMassDeleteList, 1);
				dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER, massDeleteList));
			}

			// bug deletion was succesful, so closing itemViewDeleteModal
			dispatch(
				setWhichBugComponentsDisplay({
					listView: true,
				})
			);
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls /api/bug/delete-multiple route to delete multiple bugs in the database,
 * store the updated bugs and comments list in their corresponding containers 
 * (i.e. BUG_CONTAINER and COMMENT_CONTAINER) of the redux state, empty the 
 * 'massDeleteList' Object in BUG_CONTAINER of the redux state, and close
 * ItemViewDeleteModal (for bugs) component
 *
 * @param {number[]} massDeleteList - Array of ids for bugs to be mass deleted
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
 * }} bugComponentsDisplay - Object from redux state containing which bug 
 * components are currently being displayed (may need updating if a deleted 
 * item is the itemViewCurrentItem)
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	deleteMultipleBugs([ 93, 96, 133 ],
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
export const deleteMultipleBugs = (massDeleteList, bugComponentsDisplay) => (
	dispatch
) => {
	const header = createHeader();
	axios
		.post("/api/bug/delete-multiple", { arrayOfBugIdsToBeDeleted: massDeleteList }, header)
		.then((res) => {
			// since deleting a bug also deletes the comments it had, the
			// ...comments lists is also updated in redux state
			const { bugs, comments } = res.data;
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));

			// emptys the massDeleteList in the redux state
			dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER, []));

			// mass bug deletion was succesful, so closing itemViewDeleteModal
			dispatch(
				setWhichBugComponentsDisplay({
					...bugComponentsDisplay,
					listViewDeleteModal: false,
					// if the itemViewCurrentItem was a deleted bug, then sets it to null
					itemViewCurrentItem:
						bugComponentsDisplay.itemViewCurrentItem === null ||
						massDeleteList.filter(
							(itemId) => itemId === bugComponentsDisplay.itemViewCurrentItem.id
						).length > 0
							? null
							: bugComponentsDisplay.itemViewCurrentItem,
				})
			);
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};
