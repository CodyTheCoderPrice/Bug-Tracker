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
 * @param {JSON} bugInfo - JSON containing the info to create a new bug
 * @param {JSON} bugComponentsDisplay - JSON from redux state containing
 * which bug components are currently being displayed
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
 * @param {JSON} bugInfo - JSON containing the info to update a bug
 * @param {JSON} bugComponentsDisplay - JSON from redux state containing
 * which bug components are currently being displayed
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
 * the bug container of the redux state, and close the itemViewDeleteModal
 *
 * @param {JSON} idJson - JSON containing the id of the bug to be deleted
 * and the id of the project it belongs to
 * @param {Number[]} massDeleteList - array of ids for bugs to be mass deleted
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
 * @param {JSON} bugComponentsDisplay - JSON from redux state containing
 * which bug components are currently being displayed
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
