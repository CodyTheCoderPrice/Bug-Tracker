import axios from "axios";
// Container names used to work with the redux state
import { PROJECT_CONTAINER } from "./constants/containerNames";
import { SET_LIST } from "./constants/types";
// Dispatch functions
import {
	createHeader,
	setErrorMessages,
	logoutAccount,
	setBugs,
	setComments,
	setWhichProjectComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "./index";

/**
 * Sets list of projects in 'list' property in 'PROJECT_CONTAINER' of the redux
 * state
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
 * }[]} projectList - Array of Objects containing the list of projects
 *
 * @example
 * // Sets a list of two projects. The dispatch function is from useDispatch()
 * // imported from react-redux.
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
		// Property is called 'list' instead of 'projectList' since redux reducer is
		// shared with setBugs in bugActions file
		list: projectList,
	});
};

/**
 * Calls /api/project/create route to create a new project in the database,
 * store the updated list of projects in 'list' property in 'PROJECT_CONTAINER'
 * of the redux state, and close the ListViewCreateItemSidbar component (for
 * projects)
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
 * listViewComponentShouldDisplay: boolean,
 * deleteModalComponentForListViewShouldDisplay: boolean,
 * listViewCreateItemSidbarComponentShouldDisplay: boolean,
 * itemViewComponentShouldDisplay: boolean,
 * deleteModalComponentForItemViewShouldDisplay: boolean,
 * itemViewEditItemInfoComponentShouldDisplay: boolean,
 * itemViewCurrentItem: ({
 * 		id: number,
 * 		account_id: number,
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
 * 		listViewComponentShouldDisplay: true,
 * 		deleteModalComponentForListViewShouldDisplay: false,
 * 		listViewCreateItemSidbarComponentShouldDisplay: true,
 * 		itemViewComponentShouldDisplay: false,
 * 		deleteModalComponentForItemViewShouldDisplay: false,
 * 		itemViewEditItemInfoComponentShouldDisplay: false,
 * 		itemViewCurrentItem: null
 * 	})
 * );
 */
export const createProject =
	(projectInfo, projectComponentsDisplay) => (dispatch) => {
		const header = createHeader();
		axios
			.post("/api/project/create", projectInfo, header)
			.then((res) => {
				const { projects } = res.data;
				dispatch(setProjects(projects));

				// Project creation successful, so closing ListViewCreateItemSidebar
				// component as the user most likely does not plan on immediately
				// creating another project
				dispatch(
					setWhichProjectComponentsDisplay({
						...projectComponentsDisplay,
						listViewCreateItemSidbarComponentShouldDisplay: false,
					})
				);
			})
			.catch((err) => {
				// sets error messages for what went wrong to be displayed to user
				dispatch(setErrorMessages(err.response.data.errorMessages));

				if (err.response.data.errorMessages.jwToken !== undefined) {
					// jwToken was invalid (likely expired), so user is logged out
					dispatch(logoutAccount());
					console.log("Logged out user due to invalid/expired jwToken");
				}
			});
	};

/**
 * Calls /api/project/retrieve route to retrieve list of projects from the
 * database and store it in 'list' property in 'PROJECT_CONTAINER' of the redux
 * state
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
			// sets error messages for what went wrong to be displayed to user
			dispatch(setErrorMessages(err.response.data.errorMessages));

			if (err.response.data.errorMessages.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls api/project/update route to update a project in the database, store
 * the updated list of projects in 'list' property in 'PROJECT_CONTAINER' of the
 * redux state, and turn off the editing mode for ItemView (for projects)
 * component
 *
 * @param {{
 * 		id: number,
 * 		account_id: number,
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
 * listViewComponentShouldDisplay: boolean,
 * deleteModalComponentForListViewShouldDisplay: boolean,
 * listViewCreateItemSidbarComponentShouldDisplay: boolean,
 * itemViewComponentShouldDisplay: boolean,
 * deleteModalComponentForItemViewShouldDisplay: boolean,
 * itemViewEditItemInfoComponentShouldDisplay: boolean,
 * itemViewCurrentItem: ({
 * 		id: number,
 * 		account_id: number,
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
 * // function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	updateProject({
 * 		id: 373,
 * 		account_id: 54,
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
 * 		listViewComponentShouldDisplay: true,
 * 		deleteModalComponentForListViewShouldDisplay: false,
 * 		listViewCreateItemSidbarComponentShouldDisplay: true,
 * 		itemViewComponentShouldDisplay: false,
 * 		deleteModalComponentForItemViewShouldDisplay: false,
 * 		itemViewEditItemInfoComponentShouldDisplay: false,
 * 		itemViewCurrentItem: null
 * 	})
 * );
 */
export const updateProject =
	(projectInfo, projectComponentsDisplay) => (dispatch) => {
		const header = createHeader();
		axios
			.post("/api/project/update", projectInfo, header)
			.then((res) => {
				const { projects } = res.data;
				dispatch(setProjects(projects));

				// Bug update successful, so closing ItemViewEditItemInfo component
				// as the user most likely does not plan to further edit the same bug
				dispatch(
					setWhichProjectComponentsDisplay({
						...projectComponentsDisplay,
						// If 'itemViewCurrentItem' was set to the pre-edited 
						// project, then it is updated to the post-edited project.
						// In the current website build, this should always be 
						// true, but this check exists just to be safe
						itemViewCurrentItem:
							projectComponentsDisplay.itemViewCurrentItem.id === projectInfo.id
								? projects.filter((project) => {
										return project.id === projectInfo.id;
								  })[0]
								: projectComponentsDisplay.itemViewCurrentItem,
						itemViewEditItemInfoComponentShouldDisplay: false,
					})
				);
			})
			.catch((err) => {
				// sets error messages for what went wrong to be displayed to user
				dispatch(setErrorMessages(err.response.data.errorMessages));

				if (err.response.data.errorMessages.jwToken !== undefined) {
					// jwToken was invalid (likely expired), so user is logged out
					dispatch(logoutAccount());
					console.log("Logged out user due to invalid/expired jwToken");
				}
			});
	};

/**
 * Calls /api/project/delete route to delete a project in the database, store
 * the updated list of projects, list of bugs, and list of comments their
 * corresponding containers (i.e. 'PROJECT_CONTAINER', 'BUG_CONTAINER' and
 * 'COMMENT_CONTAINER') of the redux state, update 'massDeleteList' property (if
 * it contained the deleted project) in 'PROJECT_CONTAINER' of the redux state,
 * and open the ListView (for projects) component while closeing all other
 * project components.
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
			// Since deleting a project also deletes the bugs and comments it
			// had, the list of bugs and comments are also updated in the redux
			// state
			const { projects, bugs, comments } = res.data;
			dispatch(setProjects(projects));
			dispatch(setBugs(bugs));
			dispatch(setComments(comments));

			const deletedProjectIndexInMassDeleteList =
				massDeleteList.indexOf(projectId);

			// checks if the deleted project id was in 'massDeleteList', and if
			// so, then updates 'massDeleteList' to no longer have that id
			if (deletedProjectIndexInMassDeleteList > -1) {
				massDeleteList.splice(deletedProjectIndexInMassDeleteList, 1);
				dispatch(
					setProjectOrBugMassDeleteList(PROJECT_CONTAINER, massDeleteList)
				);
			}

			// Project deletion successful, so closing DeleteModal component (for 
			// projects) as there is no longer any reason for it to stay open
			dispatch(
				setWhichProjectComponentsDisplay({
					listViewComponentShouldDisplay: true,
				})
			);
		})
		.catch((err) => {
			// sets error messages for what went wrong to be displayed to user
			dispatch(setErrorMessages(err.response.data.errorMessages));

			if (err.response.data.errorMessages.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls /api/project/delete-multiple route to delete multiple projects in the
 * database, store the updated list of projects, list of bugs, and list of
 * comments in their corresponding containers (i.e. 'PROJECT_CONTAINER',
 * 'BUG_CONTAINER' and 'COMMENT_CONTAINER') of the redux state, empty the
 * 'massDeleteList' property in 'PROJECT_CONTAINER' of the redux state, and close
 * ItemViewDeleteModal (for projects) component.
 *
 * @param {number[]} massDeleteList  - Array of ids for projects to be mass
 * deleted
 * @param {{
 * listViewComponentShouldDisplay: boolean,
 * deleteModalComponentForListViewShouldDisplay: boolean,
 * listViewCreateItemSidbarComponentShouldDisplay: boolean,
 * itemViewComponentShouldDisplay: boolean,
 * deleteModalComponentForItemViewShouldDisplay: boolean,
 * itemViewEditItemInfoComponentShouldDisplay: boolean,
 * itemViewCurrentItem: ({
 * 		id: number,
 * 		account_id: number,
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
 * 		listViewComponentShouldDisplay: true,
 * 		deleteModalComponentForListViewShouldDisplay: false,
 * 		listViewCreateItemSidbarComponentShouldDisplay: true,
 * 		itemViewComponentShouldDisplay: false,
 * 		deleteModalComponentForItemViewShouldDisplay: false,
 * 		itemViewEditItemInfoComponentShouldDisplay: false,
 * 		itemViewCurrentItem: null
 * 	})
 * );
 */
export const deleteMultipleProjects =
	(massDeleteList, projectComponentsDisplay) => (dispatch) => {
		const header = createHeader();
		axios
			.post(
				"/api/project/delete-multiple",
				{ arrayOfProjectIdsToBeDeleted: massDeleteList },
				header
			)
			.then((res) => {
				const { projects, bugs, comments } = res.data;
				// Since deleting a project also deletes the bugs and comments it
				// had, the 'list' of bugs and comments are also updated in the
				// redux state
				dispatch(setProjects(projects));
				dispatch(setBugs(bugs));
				dispatch(setComments(comments));

				// Empties the 'massDeleteList' in the redux state
				dispatch(setProjectOrBugMassDeleteList(PROJECT_CONTAINER, []));

				// Mass project deletion successful, so closing DeleteModal 
				// component (for projects) as there is no longer any reason 
				// for it to stay open
				dispatch(
					setWhichProjectComponentsDisplay({
						...projectComponentsDisplay,
						deleteModalComponentForListViewShouldDisplay: false,
						// if the itemViewCurrentItem was a deleted project, then sets it to null
						itemViewCurrentItem:
							projectComponentsDisplay.itemViewCurrentItem === null ||
							massDeleteList.filter(
								(itemId) =>
									itemId === projectComponentsDisplay.itemViewCurrentItem.id
							).length > 0
								? null
								: projectComponentsDisplay.itemViewCurrentItem,
					})
				);
			})
			.catch((err) => {
				// sets error messages for what went wrong to be displayed to user
				dispatch(setErrorMessages(err.response.data.errorMessages));

				if (err.response.data.errorMessages.jwToken !== undefined) {
					// jwToken was invalid (likely expired), so user is logged out
					dispatch(logoutAccount());
					console.log("Logged out user due to invalid/expired jwToken");
				}
			});
	};
