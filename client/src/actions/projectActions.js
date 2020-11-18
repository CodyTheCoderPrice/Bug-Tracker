import axios from "axios";
import { projectContainerName } from "../reducers/containerNames";

import { PROJECT_CONTAINER } from "./constants/containers";
import { SET_LIST } from "./constants/types";

import {
	setInputErrors,
	logoutAccount,
	setBugs,
	setComments,
	setWhichProjectComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "./index";

export const setProjects = (list) => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: SET_LIST,
		list: list,
	});
};

export const createProject = (projectInfo, projectComponentsDisplay) => (
	dispatch
) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/create", projectInfo, headers)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
			// Done here so components only changes when update is succesful
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
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

export const retrieveProjects = () => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/retrieve", null, headers)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const updateProject = (projectInfo, projectComponentsDisplay) => (
	dispatch
) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/update", projectInfo, headers)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
			// Done here so components only changes when update is succesful
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
					// Set redux target project to match project update on server side
					targetItem: projects.filter((project) => {
						return project.id === projectInfo.id;
					})[0],
					itemContainerEditItemInfo: false,
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

export const deleteProject = (id, massDeleteList, indexOfTargetProjectId) => (
	dispatch
) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/delete", id, headers)
		.then((res) => {
			const { projects, bugs, comments } = res.data;
			dispatch(setProjects(projects));
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));
			// Done here so following code only runs if deletion is succesful
			if (indexOfTargetProjectId > -1) {
				massDeleteList.splice(indexOfTargetProjectId, 1);
				dispatch(
					setProjectOrBugMassDeleteList(projectContainerName, massDeleteList)
				);
			}
			dispatch(
				setWhichProjectComponentsDisplay({
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

export const deleteMultipleProjects = (
	massDeleteList,
	projectComponentsDisplay
) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post(
			"/api/project/delete-multiple",
			{ projectsArray: massDeleteList },
			headers
		)
		.then((res) => {
			console.log(res.data);
			const { projects, bugs, comments } = res.data;
			dispatch(setProjects(projects));
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));
			// Done here so following code only runs if deletion is succesful
			dispatch(setProjectOrBugMassDeleteList(projectContainerName, []));
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
					listContainerMassDeleteItemsModal: false,
					targetItem:
						projectComponentsDisplay.targetItem === null ||
						massDeleteList.filter(
							(itemId) => itemId === projectComponentsDisplay.targetItem.id
						).length > 0
							? null
							: projectComponentsDisplay.targetItem,
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
