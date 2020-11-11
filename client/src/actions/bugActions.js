import axios from "axios";
import { bugContainerName } from "../reducers/containerNames";

import { BUG_CONTAINER } from "./constants/containers";
import { SET_LIST } from "./constants/types";

import {
	setInputErrors,
	logoutAccount,
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
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/bug/create", bugInfo, headers)
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
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const retrieveBugs = () => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/bug/retrieve", null, headers)
		.then((res) => {
			const { bugs } = res.data;
			dispatch(setBugs(bugs));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const updateBug = (bugInfo, bugComponentsDisplay) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/bug/update", bugInfo, headers)
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
					itemContainerEditInfo: false,
				})
			);
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const deleteBug = (id, massDeleteList, indexOfTargetBugId) => (
	dispatch
) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/bug/delete", id, headers)
		.then((res) => {
			const { bugs } = res.data;
			dispatch(setBugs(bugs));
			// Done here so following code only runs if deletion is succesful
			if (indexOfTargetBugId > -1) {
				massDeleteList.splice(indexOfTargetBugId, 1);
				dispatch(
					setProjectOrBugMassDeleteList(bugContainerName, massDeleteList)
				);
			}
			dispatch(
				setWhichBugComponentsDisplay({
					listContainer: true,
				})
			);
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const deleteMultipleBugs = (massDeleteList, bugComponentsDisplay) => (
	dispatch
) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/bug/delete-multiple", { bugsArray: massDeleteList }, headers)
		.then((res) => {
			const { bugs } = res.data;
			dispatch(setBugs(bugs));
			// Done here so following code only runs if deletion is succesful
			dispatch(setProjectOrBugMassDeleteList(bugContainerName, []));
			dispatch(
				setWhichBugComponentsDisplay({
					...bugComponentsDisplay,
					listContainerMassDeleteItemsModal: false,
				})
			);
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};
