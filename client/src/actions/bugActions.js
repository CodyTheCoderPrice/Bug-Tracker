import axios from "axios";

// Redux containers
import { BUG_CONTAINER } from "./constants/containerNames";
// Redux types
import { SET_LIST } from "./constants/types";
// Redux dispatch functions
import {
	createHeader,
	seBackendErrors,
	logoutAccount,
	setComments,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "./index";

/**
 * Sets the bugs list inside the bug container of the redux state
 *
 * @param {JSON} list - JSON containing the bugs list
 */
export const setBugs = (list) => (dispatch) => {
	dispatch({
		container: BUG_CONTAINER,
		type: SET_LIST,
		list: list,
	});
};

/**
 * Calls /api/bug/create route to create a new bug in the database, store the
 * updated bugs list in the bug container of the redux state, and close the
 * listViewCreateItemSidbar
 *
 * @param {{
 * 		project_id: Number,
 * 		name: String,
 * 		description: String,
 * 		location: String,
 * 		priority_id: Number,
 * 		status_id: Number,
 * 		start_date: (String|null),
 * 		due_date: (String|null),
 * 		completion_date: (String|null),
 * }} bugInfo - JSON containing the info to create a new bug
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		project_id: Number,
 * 		id: Number,
 * 		name: String,
 * 		description: String,
 * 		location: String,
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
 * }} bugComponentsDisplay - JSON from redux state containing which bug 
 * components are currently being displayed
 * 
 * @example
 * // Creates bug
 * dispatch(
 * 	createBug({ 
 * 		project_id: 372,
 * 		name: "Cool bug", 
 * 		description: "Cool description", 
 * 		location: "Cool location", 
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
			}
		});
};

/**
 * Calls /api/bug/retrieve route to retrieve the bugs list from the database
 * and store it in the bug container of the redux state
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
			}
		});
};

/**
 * Calls /api/bug/update route to update a bug in the database, store the
 * updated bugs list in the bug container of the redux state, and close the
 * itemViewEditItemInfo
 *
 * @param {{
 * 		id: Number,
 * 		name: String,
 * 		description: String,
 * 		location: String,
 * 		priority_id: Number,
 * 		priority_option: String,
 * 		status_id: Number,
 * 		creation_date: String,
 * 		start_date: (String|null),
 * 		due_date: (String|null),
 * 		completion_date: (String|null),
 * }} bugInfo - JSON containing the info to update a bug
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		project_id: Number,
 * 		id: Number,
 * 		name: String,
 * 		description: String,
 * 		location: String,
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
 * }} bugComponentsDisplay - JSON from redux state containing which bug 
 * components are currently being displayed
 * 
 * @example
 * // Updates bug
 * dispatch(
 * 	updateBug({
 * 		id: 373
 * 		name: "Cool bug updated",
 * 		description: "Cool bug updated",
 * 		location: "Cool location updated", 
 * 		priority_id: 2, 
 * 		priorityOption: "Low",
 * 		status_id: 2,
 * 		statusOption: "Open",
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
			}
		});
};

/**
 * Calls /api/bug/delete route to delete a bug in the database, store the
 * updated bugs and comments list in their corresponding containers in the
 * redux state, update the massDeleteList (if it contained the deleted bug) in
 * the bug container of the redux state, store the updated bugs and comments 
 * list in their corresponding containers in the redux state, and close the
 * itemViewDeleteModal
 *
 * @param {{ 
 * id: Number, 
 * project_id: Number
 * }} idJson - JSON containing the id of the bug to be deletedand the id of the
 * project it belongs to
 * @param {Number[]} massDeleteList - array of ids for bugs to be mass deleted 
 * (needed since if massDeleteList contains the to be deleted project, it will 
 * need to be updated)
 * 
 * @example
 * // Deletes bug and updates massDeleteList to no longer contain deleted bug
 * dispatch(deleteBug({ id: 134, project_id: 341 }, [ 134, 96, 93 ]));
 */
export const deleteBug = (idJson, massDeleteList) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/bug/delete", idJson, header)
		.then((res) => {
			// since deleting a bug also deletes the comments it had, the
			// ...comments lists is also updated in redux state
			const { bugs, comments } = res.data;
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));

			const deletedBugIndexInMassDeleteList = massDeleteList.indexOf(idJson.id);

			// checks if the deleted bug id was in the massDeleteList, and if
			// ...so removes it and updates the massDeleteList in the bug
			// ...container of the redux state
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
			}
		});
};

/**
 * Calls /api/bug/delete-multiple route to delete multiple bugs in the database,
 * store the updated bugs and comments list in their corresponding containers
 * in the redux state, empty the massDeleteList in the bug container of the
 * redux state, and close the itemViewDeleteModal
 *
 * @param {Number[]} massDeleteList - array of ids for bugs to be mass deleted
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
 * }} bugComponentsDisplay - JSON from redux state containing which bug 
 * components are currently being displayed (may need updating if a deleted 
 * item is the itemViewCurrentItem)
 * 
 * @example
 * // Deletes all bugs in massDeleteList
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
		.post("/api/bug/delete-multiple", { bugsArray: massDeleteList }, header)
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
			}
		});
};
