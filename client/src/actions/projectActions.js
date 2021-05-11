import axios from "axios";

// Redux containers
import { PROJECT_CONTAINER } from "./constants/containerNames";
// Redux types
import { SET_LIST } from "./constants/types";
// Redux dispatch functions
import {
	createHeader,
	seBackendErrors,
	logoutAccount,
	setBugs,
	setComments,
	setWhichProjectComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "./index";

/**
 * Sets the projects list inside the project container of the redux state
 *
 * @param {{ 
 * 	id: number, 
 * 	account_id: number, 
 * 	name: string, 
 * 	description: string, 
 * 	priority_id: number, 
 * 	status_id: number, 
 * 	creation_date: string, 
 * 	start_date: string, 
 * 	due_date: (string|null), 
 * 	completion_date: (string|null), 
 * 	last_edited_timestamp: string, 
 * 	priority_option: string, 
 * 	status_option: string
 * }[]} projectList - Array of Objects containing the projects list
 * 
 * @example
 * // Sets a list of two projects. The dispatch function is from useDispatch()
 * // ...imported from react-redux.
 * dispatch(
 * 	setProjects([{ 
 * 		id: 373, 
 * 		account_id: 54, 
 * 		name: "Todo website", 
 * 		description: "Website to keep track of todos", 
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
 * 		id: 374, 
 * 		account_id: 54, 
 * 		name: "Health app", 
 * 		description: "App to track your health", 
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
export const setProjects = (projectList) => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: SET_LIST,
		// Property called list instead of projectList since redux reducer is
		// ...shared with setBugs in bugActions
		list: projectList,
	});
};

/**
 * Calls /api/project/create route to create a new project in the database, 
 * store the updated projects list in the project container of the redux 
 * state, and close the listViewCreateItemSidbar
 *
 * @param {{
 * 		name: string,
 * 		description: string,
 * 		priority_id: number,
 * 		status_id: number,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * }} projectInfo - Object containing the info to create a new project
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		account_id: number,
 * 		id: number,
 * 		name: string,
 * 		description: string,
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
 * }} projectComponentsDisplay - Object from redux state containing which 
 * project components are currently being displayed
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	createProject({ 
 * 		name: "Ecommerce Website", 
 * 		description: "Website for selling items", 
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
export const createProject = (projectInfo, projectComponentsDisplay) => (
	dispatch
) => {
	const header = createHeader();
	axios
		.post("/api/project/create", projectInfo, header)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));

			// project creation was succesful, so closing the
			// ...listViewCreateItemSidbar
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
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
 * Calls /api/project/retrieve route to retrieve the projects list from the
 * database and store it in the project container of the redux state
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(retrieveProjects());
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
 * Calls api/project/update route to update a project in the database, store
 * the updated projects list in the project container of the redux state, and
 * close the itemViewEditItemInfo
 *
 * @param {{
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * }} projectInfo - Object containing the info to update a project
 * @param {{
 * listView: boolean,
 * listViewDeleteModal: boolean,
 * listViewCreateItemSidbar: boolean,
 * itemView: boolean,
 * itemViewEditItemInfo: boolean,
 * itemViewDeleteModal: boolean,
 * itemViewCurrentItem: ({
 * 		account_id: number,
 * 		id: number,
 * 		name: string,
 * 		description: string,
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
 * }} projectComponentsDisplay - Object from redux state containing which 
 * project components are currently being displayed
 * 
 * @example
 * // updates project with id 373 to have the following data. The dispatch 
 * // ...function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	updateProject({
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
export const updateProject = (projectInfo, projectComponentsDisplay) => (
	dispatch
) => {
	const header = createHeader();
	axios
		.post("/api/project/update", projectInfo, header)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));

			// project update was succesful, so closing itemViewEditItemInfo
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
					// if itemViewCurrentItem was set to the pre-edited project, then it
					// ...is updated to the post-edited project
					itemViewCurrentItem:
						projectComponentsDisplay.itemViewCurrentItem.id !== projectInfo.id
							? projectComponentsDisplay.itemViewCurrentItem
							: projects.filter((project) => {
									return project.id === projectInfo.id;
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
 * Calls /api/project/delete route to delete a project in the database, store
 * the updated projects, bugs, and comments list in their corresponding
 * containers in the redux state, update the massDeleteList (if it contained
 * the deleted project) in the project container of the redux state, store the 
 * updated projects, bugs, and comments list in their corresponding containers 
 * in the redux state, and close the itemViewDeleteModal
 *
 * @param {number} projectId - Object containing the id of the project to be 
 * deleted
 * @param {number[]} massDeleteList - Array of ids for projects to be mass
 * deleted (needed since if massDeleteList contains the to be deleted project,
 * it will need to be updated)
 * 
 * @example
 * // Deletes project and updates massDeleteList to no longer contain deleted 
 * // ...project. The dispatch function is from useDispatch() imported from
 * // ...react-redux.
 * dispatch(deleteProject({ id: 379 }, [ 341, 330, 379 ]));
 */
export const deleteProject = (projectId, massDeleteList) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/project/delete", { id: projectId }, header)
		.then((res) => {
			// since deleting a project also deletes bugs and comments it had,
			// ...the bugs and comments lists are also updated in redux state
			const { projects, bugs, comments } = res.data;
			dispatch(setProjects(projects));
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));

			const deletedProjectIndexInMassDeleteList = massDeleteList.indexOf(
				projectId
			);

			// checks if the deleted project id was in the massDeleteList, and
			// ...if so removes it and updates the massDeleteList in the
			// ...project container of the redux state
			if (deletedProjectIndexInMassDeleteList > -1) {
				massDeleteList.splice(deletedProjectIndexInMassDeleteList, 1);
				dispatch(
					setProjectOrBugMassDeleteList(PROJECT_CONTAINER, massDeleteList)
				);
			}

			// project deletion was succesful, so closing itemViewDeleteModal
			dispatch(
				setWhichProjectComponentsDisplay({
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
 * Calls /api/project/delete-multiple route to delete multiple projects in the
 * database, store the updated projects, bugs, and comments list in their
 * corresponding containers in the redux state, empty the massDeleteList in the
 * project container of the redux state, and close the itemViewDeleteModal
 *
 * @param {number[]} massDeleteList  - Array of ids for projects to be mass
 * deleted
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
 * }} projectComponentsDisplay - Object from redux state containing which 
 * project components are currently being displayed (may need updating if a 
 * deleted item is the itemViewCurrentItem)
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	deleteMultipleProjects([ 341, 330, 379 ],
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
export const deleteMultipleProjects = (
	massDeleteList,
	projectComponentsDisplay
) => (dispatch) => {
	const header = createHeader();
	axios
		.post(
			"/api/project/delete-multiple",
			{ arrayOfProjectIdsToBeDeleted: massDeleteList },
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

			// mass project deletion was succesful, so closing itemViewDeleteModal
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
					listViewDeleteModal: false,
					// if the itemViewCurrentItem was a deleted project, then sets it to null
					itemViewCurrentItem:
						projectComponentsDisplay.itemViewCurrentItem === null ||
						massDeleteList.filter(
							(itemId) => itemId === projectComponentsDisplay.itemViewCurrentItem.id
						).length > 0
							? null
							: projectComponentsDisplay.itemViewCurrentItem,
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
