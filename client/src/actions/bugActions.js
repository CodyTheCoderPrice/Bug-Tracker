import axios from "axios";

// Redux containers
import { BUG_CONTAINER } from "./constants/containerNames";
// Redux types
import { SET_LIST } from "./constants/types";
// Redux dispatch functions
import {
	createHeader,
	setInputErrors,
	logoutAccount,
	setComments,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "./index";

export const setBugs = (list) => (dispatch) => {
	dispatch({
		container: BUG_CONTAINER,
		type: SET_LIST,
		list: list,
	});
};

export const createBug = (bugInfo, bugComponentsDisplay) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/bug/create", bugInfo, header)
		.then((res) => {
			const { bugs } = res.data;
			dispatch(setBugs(bugs));
			// Done here so components only changes when update is succesful
			dispatch(
				setWhichBugComponentsDisplay({
					...bugComponentsDisplay,
					listContainerCreateItemSidbar: false,
				})
			);
		})
		.catch((err) => {
			// sets input errors for what went wrong to be displayed to user
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

export const retrieveBugs = () => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/bug/retrieve", null, header)
		.then((res) => {
			const { bugs } = res.data;
			dispatch(setBugs(bugs));
		})
		.catch((err) => {
			// sets input errors for what went wrong to be displayed to user
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

export const updateBug = (bugInfo, bugComponentsDisplay) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/bug/update", bugInfo, header)
		.then((res) => {
			const { bugs } = res.data;
			dispatch(setBugs(bugs));
			// Done here so components only changes when update is succesful
			dispatch(
				setWhichBugComponentsDisplay({
					...bugComponentsDisplay,
					// Set redux target bug to match bug update on server side
					targetItem: bugs.filter((bug) => {
						return bug.id === bugInfo.id;
					})[0],
					itemContainerEditItemInfo: false,
				})
			);
		})
		.catch((err) => {
			// sets input errors for what went wrong to be displayed to user
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

export const deleteBug = (idJson, massDeleteList) => (
	dispatch
) => {
	const header = createHeader();
	axios
		.post("/api/bug/delete", idJson, header)
		.then((res) => {
			const { bugs, comments } = res.data;
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));

			const deletedBugIndexInMassDeleteList = massDeleteList.indexOf(
				idJson.id
			);

			// Done here so following code only runs if deletion is succesful
			if (deletedBugIndexInMassDeleteList > -1) {
				massDeleteList.splice(deletedBugIndexInMassDeleteList, 1);
				dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER, massDeleteList));
			}
			dispatch(
				setWhichBugComponentsDisplay({
					listContainer: true,
				})
			);
		})
		.catch((err) => {
			// sets input errors for what went wrong to be displayed to user
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

export const deleteMultipleBugs = (massDeleteList, bugComponentsDisplay) => (
	dispatch
) => {
	const header = createHeader();
	axios
		.post("/api/bug/delete-multiple", { bugsArray: massDeleteList }, header)
		.then((res) => {
			const { bugs, comments } = res.data;
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));
			// Done here so following code only runs if deletion is succesful
			dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER, []));
			dispatch(
				setWhichBugComponentsDisplay({
					...bugComponentsDisplay,
					listContainerMassDeleteItemsModal: false,
					targetItem:
						bugComponentsDisplay.targetItem === null ||
						massDeleteList.filter(
							(itemId) => itemId === bugComponentsDisplay.targetItem.id
						).length > 0
							? null
							: bugComponentsDisplay.targetItem,
				})
			);
		})
		.catch((err) => {
			// sets input errors for what went wrong to be displayed to user
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};
