import axios from "axios";

// Redux containers
import { PROJECT_CONTAINER } from "./constants/containerNames";
// Redux types
import { SET_LIST } from "./constants/types";
// Redux dispatch functions
import {
	createHeader,
	setInputErrors,
	logoutAccount,
	setBugs,
	setComments,
	setWhichProjectComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "./index";

/**
 * Sets the project's list inside the project container of the redux state
 *
 * @param {JSON} list - JSON containing the project list
 */
export const setProjects = (list) => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: SET_LIST,
		list: list,
	});
};

/**
 * Calls /api/project/create route in order to create a new project in
 * the database, then stores the updated projects list in the projects
 * contianer of the redux state
 *
 * @param {JSON} projectInfo - JSON containing the info to create a new project
 * @param {JSON} projectComponentsDisplay - JSON from redux state containing
 * which project components are currently being displayed
 */
export const createProject = (projectInfo, projectComponentsDisplay) => (
	dispatch
) => {
	const header = createHeader();
	axios
		.post("/api/project/create", projectInfo, header)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
			// project creation was succesful, so closing the create project sidebar
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
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

/**
 * Calls /api/project/retrieve route to retrieve the projects list from the
 * database and store it in the project container of the redux state
 */
export const retrieveProjects = () => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/project/retrieve", null, header)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
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

/**
 * Calls api/project/update route to update a project in the database, then
 * store the updated projects list in the projects container of the redux state
 *
 * @param {JSON} projectInfo - JSON containing the info to update a project
 * @param {JSON} projectComponentsDisplay - JSON from redux state containing
 * which project components are currently being displayed
 */
export const updateProject = (projectInfo, projectComponentsDisplay) => (
	dispatch
) => {
	const header = createHeader();
	axios
		.post("/api/project/update", projectInfo, header)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
			// project update was succesful, so closing the edit project view
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
					// since targetItem (what determins which project displays)
					// ...will be set to the pre-edited project, it will need
					// ...to be replaced with the updated project
					targetItem: projects.filter((project) => {
						return project.id === projectInfo.id;
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

/**
 * Calls /api/project/delete route to delete a project in the database, then
 * store the updated projects, bugs, and comment list in their corresponding
 * containers in the redux state. Also updates the massDeleteList if it
 * contained the deleted project and updates it in the projects container of
 * the redux state.
 *
 * @param {JSON} idJson - JSON containing the id of the project to be deleted
 * (explaination for why JSON instead of Number in ItemContainerDeleteModal)
 * @param {Number[]} massDeleteList - array of project ids the user selected
 * on the project table to possibly be mass deleted
 */
export const deleteProject = (idJson, massDeleteList) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/project/delete", idJson, header)
		.then((res) => {
			// since deleting a project also deletes bugs and comments it had,
			// ...the bugs and comments lists are also updated in redux state
			const { projects, bugs, comments } = res.data;
			dispatch(setProjects(projects));
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));

			const deletedProjectIndexInMassDeleteList = massDeleteList.indexOf(
				idJson.id
			);

			// checks if the id deleted project id was in the massDeleteList,
			// ...and if so removes it and updates the massDeleteList in the
			// ...project container of the redux state
			if (deletedProjectIndexInMassDeleteList > -1) {
				massDeleteList.splice(deletedProjectIndexInMassDeleteList, 1);
				dispatch(
					setProjectOrBugMassDeleteList(PROJECT_CONTAINER, massDeleteList)
				);
			}

			// project deletion was succesful, so closing the delete project modal
			dispatch(
				setWhichProjectComponentsDisplay({
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

/**
 * Calls /api/project/delete-multiple route to delete multiple projects in the
 * database, stores the updated projects, bugs, and comment list in their
 * corresponding containers in the redux state, then emptys the massDeleteList
 * in the projects container of the redux state.
 *
 * @param {Number[]} massDeleteList - array of project ids the user selected
 * on the project table to possibly be mass deleted
 * @param {JSON} projectComponentsDisplay - JSON from redux state containing
 * which project components are currently being displayed
 */
export const deleteMultipleProjects = (
	massDeleteList,
	projectComponentsDisplay
) => (dispatch) => {
	const header = createHeader();
	axios
		.post(
			"/api/project/delete-multiple",
			{ projectsArray: massDeleteList },
			header
		)
		.then((res) => {
			const { projects, bugs, comments } = res.data;
			// since deleting a project also deletes bugs and comments it had,
			// ...the bugs and comments lists are also updated in redux state
			dispatch(setProjects(projects));
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));

			// emptys the massDeleteList in the redux state
			dispatch(setProjectOrBugMassDeleteList(PROJECT_CONTAINER, []));

			// mass project deletion was succesful, so closing the delete project modal
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
					listContainerMassDeleteItemsModal: false,
					// if the targetItem was a deleted project, then sets it to null
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
			// sets input errors for what went wrong to be displayed to user
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};
