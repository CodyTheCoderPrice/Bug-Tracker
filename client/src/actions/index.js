import axios from "axios";
import { logoutAccountDueToError} from "./accountActions"
// Container names used to work with the redux state
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "./constants/containerNames";
import {
	SET_DISPLAY_SIZE_CONSTANTS,
	SET_DISPLAY_SIZE_VARIABLES_WINDOW_AND_MENUS,
	SET_THEMES,
	SET_SORT_CATEGORIES,
	SET_PRIORITY_STATUS,
	SET_ERROR_MESSAGES,
} from "./constants/types";

// Exporting redux dispatch functions from all other action files
export * from "./accountActions";
export * from "./projectActions";
export * from "./bugActions";
export * from "./commentActions";
export * from "./componentActions";
export * from "./switchActions";
export * from "./resetActions";

/**
 * Used to set 'errorMessages' property containing error messages — recieved from
 * failed HTTP requests or redux actions recieving invalid data (e.g. user enters 
 * wrong password when logging in or invalid data is recieved from the database)
 * — in 'GENERAL_CONTAINER' of the redux state. If the error is related to the
 * jwToken, then the user is logged out for security purposes.
 * 
 * Note: The purpose of the 'errorMessages' property is to be used to display
 * error messages to the user so they can know why their attempt failed and 
 * possibly how to fix it. These messages should be displayed in the component 
 * from which they occured (e.g. an error message for failed login attempt should
 * display in AuthenticationLogin component).
 *
 * @param {{
* 	server: (string|undefined),
*  serverAccount: (string|undefined),
* 	serverSettings: (string|undefined),
* 	serverItem: (string|undefined),
* 	serverPriorityStatus: (string|undefined),
*  serverConnection: (string|undefined),
* 	jwToken: (string|undefined),
* 	backendPasswordAuthorization: (string|undefined),
* 	databaseAccountNotFound: (string|undefined),
* 	validationAccount: (string|undefined),
* 	validationAccountFirstName: (string|undefined),
* 	validationAccountLastName: (string|undefined),
* 	validationAccountEmail: (string|undefined),
* 	validationAccountPassword: (string|undefined),
* 	validationAccountNewEmail: (string|undefined),
* 	validationAccountNewPassword: (string|undefined),
* 	currentPassword: (string|undefined),
* 	authWrongCurrentPassword: (string|undefined),
* 	validationAccountTypeOutCheck: (string|undefined),
* 	validationItem: (string|undefined),
* 	validationItemName: (string|undefined),
* 	validationItemDescription: (string|undefined),
* 	validationItemLocation: (string|undefined),
* 	validationComment: (string|undefined),
* 	validationCreateCommentDescription: (string|undefined),
* 	validationEditCommentDescription: (string|undefined),
* 	loginServerData: (string|undefined),
* }} errorMessages - Object containing error messages from failed HTTP 
* requests or redux actions recieving invalid data
*
* @example
* // error messages for invalid input when registering an account
* dispatch(
* 	setErrorMessages({
* 		validationAccountFirstName: "First name required",
* 		validationAccountLastName: "Last name longer than 35 characters",
* 		validationAccountEmail: "Email is invalid",
* 		validationAccountPassword: "Password not between 6-30 characters"
* 	})
* );
*
* @example
* // Clears all error messages
* dispatch(setErrorMessages({}));
*/
export const setErrorMessages = (errorMessages) => (dispatch) => {
   if (errorMessages.jwToken !== undefined) {
	   // Users should not be logged in
	   dispatch(
		   logoutAccountDueToError(
			   new Error(
				   `Logged out due to: ${errorMessages.jwToken}`
			   )
		   )
	   );
   }
   
   dispatch({
	   container: GENERAL_CONTAINER,
	   type: SET_ERROR_MESSAGES,
	   // If undefined, then there was an issue connecting to the server
	   errorMessages:
		   errorMessages !== undefined
			   ? errorMessages
			   : { serverConnection: "Server connection error" },
   });
};

/**
* Clears error messages in 'errorMessages' property in 'GENERAL_CONTAINER' of 
* the redux state.
*
* Note: The purpose of this to be used when closing a component that displays
* error messages, so if any error messages are currently being displayed, they
* do not continue to display if the user navigates back to the component
* later, as the error would no longer be relevant and would confuse the user.
*
* @example
* // Clears all error messages
* dispatch(clearAllErrorMessages());
*/
export const clearAllErrorMessages = () => (dispatch) => {
   dispatch(setErrorMessages({}));
};

/**
* Creates a header containing jwToken from localStorage (set during login)
* so the server can both decode it to get the account_id for the call
* as well as authenticate the call without being sent a password
*
* @returns {{
* 	headers: {
* 		jwToken: string
* 	}
* }} header containing jwToken from localStorage
*/
export const createHeader = () => {
   return { headers: { jwToken: localStorage.jwToken } };
};

/**
 * Sets size info of multiple html elements (thats size remains constant) in
 * 'constants' property in 'SIZE_CONTAINER' of the redux state.
 *
 * Note: The purpose of this info is mostly to calulcate the resizing of other
 * html elements, but also is sometimes used for other things.
 *
 * @param {{
 * 	scrollbarWidth: (number|null),
 * 	listViewTopBarComponentHeight: (number|null),
 * 	listViewTableComponentRowElementHeight: (number|null),
 *  itemViewComponentPaddingContainerElementLeftPadding: (number|null),
 * 	itemViewComponentOuterDividingContainerElementMinWidth: (number|null),
 * 	itemViewTopBarComponentHeight: (number|null),
 * }} sizes - Object containing size info for multiple html elements (whose
 * size remains constant)
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setDisplaySizeConstants({
 * 		scrollbarWidth: 17,
 * 		listViewTopBarComponentHeight: 48,
 * 		listViewTableComponentRowElementHeight: 50,
 * 		itemViewComponentPaddingContainerElementLeftPadding: 25,
 * 		itemViewComponentOuterDividingContainerElementMinWidth: 560,
 * 		itemViewTopBarComponentHeight: 48,
 * 	})
 * );
 */
export const setDisplaySizeConstants = (sizes) => (dispatch) => {
	dispatch({
		container: SIZE_CONTAINER,
		type: SET_DISPLAY_SIZE_CONSTANTS,
		sizes: sizes,
	});
};

/**
 * Sets current size info of the Window, NavPanel and Navbar elements in
 * 'variables' property in 'SIZE_CONTAINER' of the redux state.
 *
 * Note: These sizes should be updated everytime they change. Also the purpose
 * of this info is mostly to be used to calulcate the resizing of other html
 * elements, but is also sometimes used for other things.
 *
 * @param {{
 * 	window: ({
 * 		height: number,
 * 		width: number
 * 	}|null),
 * 	navPanel: ({
 * 		height: number,
 * 		width: number
 * 	}|null),
 * 	navbar: ({
 * 		height: number,
 * 		width: number
 * 	}|null)
 * }} sizes - Object containing current size info for Window, NavPanel and Navbar
 *  elements
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setDisplaySizeVariablesWindowAndMenus({
 * 		window: {
 * 			height: 453,
 * 			width: 1536
 * 		},
 * 		navPanel: {
 * 			height: 453,
 * 			width: 250
 * 		},
 * 		navbar: {
 * 			height: 56,
 * 			width: 1536
 * 		}
 * 	})
 * );
 */
export const setDisplaySizeVariablesWindowAndMenus = (sizes) => (dispatch) => {
	dispatch({
		container: SIZE_CONTAINER,
		type: SET_DISPLAY_SIZE_VARIABLES_WINDOW_AND_MENUS,
		sizes: sizes,
	});
};

/**
 * Sets themes info (from theme table in the database) in 'themes' property in
 * 'GENERAL_CONTAINER' of the redux state.
 *
 * @param {{
 * 	theme_id: number,
 * 	order_number: number,
 * 	color: string,
 * 	marks_default: boolean
 * }[]} themes - Array of Objects containing themes
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setThemes([
 * 		{ theme_id: 1, order_number: 0, color: "blue-turkish", marks_default: true },
 * 		{ theme_id: 2, order_number: 1, color: "blue-queen", marks_default: false },
 * 		{ theme_id: 4, order_number: 2, color: "blue-sky", marks_default: false },
 * 		{ theme_id: 6, order_number: 3, color: "blue-turquoise", marks_default: false },
 * 		{ theme_id: 5, order_number: 4, color: "purple-rain", marks_default: false },
 * 	])
 * );
 */
export const setThemes = (themes) => (dispatch) => {
	dispatch({
		container: GENERAL_CONTAINER,
		type: SET_THEMES,
		themes: themes,
	});
};

/**
 * Calls api/reference-data/retrieve-themes route to retrieve themes from the
 * database and store it in 'themes' property of 'GENERAL_CONTAINER' of the redux
 * state
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(retrieveThemes());
 */
export const retrieveThemes = () => (dispatch) => {
	axios
		.get("/api/reference-data/retrieve-themes")
		.then((res) => {
			const { themes } = res.data;
			dispatch(setThemes(themes));
		})
		.catch((err) => {
			console.log(err);
		});
};

/**
 * Sets sort categories info in 'sortCategories' of 'GENERAL_CONTAINER' of the
 * redux state
 *
 * @param {{
 * 	sort_id: number,
 * 	order_number: number,
 * 	category: string,
 * 	marks_default: boolean
 * }[]} sortCategories - Array of Objects containing sort categories
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setSortCategories([
 * 		{ sort_id: 1, order_number: 0, category: "Name", marks_default: false },
 * 		{ sort_id: 2, order_number: 1, category: "Status", marks_default: true },
 * 		{ sort_id: 3, order_number: 2, category: "Priority", marks_default: false },
 * 		{ sort_id: 4, order_number: 3, category: "Created on", marks_default: false },
 * 		{ sort_id: 5, order_number: 4, category: "Start Date", marks_default: false },
 * 		{ sort_id: 6, order_number: 5, category: "Due Date", marks_default: false },
 * 	])
 * );
 */
export const setSortCategories = (sortCategories) => (dispatch) => {
	dispatch({
		container: GENERAL_CONTAINER,
		type: SET_SORT_CATEGORIES,
		sortCategories: sortCategories,
	});
};

/**
 * Calls api/reference-data/retrieve-sort-categories route to retrieve sort
 * categories from the database and store it in 'sortCategories' of
 * 'GENERAL_CONTAINER' of the redux state
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(retrieveSortCategories());
 */
export const retrieveSortCategories = () => (dispatch) => {
	axios
		.get("/api/reference-data/retrieve-sort-categories")
		.then((res) => {
			const { sortCategories } = res.data;
			dispatch(setSortCategories(sortCategories));
		})
		.catch((err) => {
			console.log(err);
		});
};

/**
 * Sets Objects containing developer set data for priority/status tables (2
 * tables for projects; 2 tables for bugs) of the database in
 * 'priorityStatusOptions' properties in their corresponding containers (i.e.
 * 'PROJECT_CONTAINER' and 'BUG_CONTAINER') of the redux state.
 *
 * Note: The purpose of these Objects is to be used by the app to convert
 * priority/status integer values for projects/bugs to the string options they
 * represent, populate priority/status comboboxes, and dynamically know if any
 * particular option represents empty or completed.
 *
 * @param {{
 * 	priorityList: [
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 	],
 * 	priorityEmptyId: (number|null),
 * 	statusList: [
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 	],
 * 	statusEmptyId: (number|null),
 * 	statusCompletionId: number,
 * }} projectPriorityStatus - Object containing the developer set data in the
 * project priority/status tables of the database, to be stored in the project
 * contianer of the redux state
 * @param {{
 * 	priorityList: [
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 	],
 * 	priorityEmptyId: (number|null),
 * 	statusList: [
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 	],
 * 	statusEmptyId: (number|null),
 * 	statusCompletionId: number,
 * }} bugPriorityStatus - Object containing the developer set data in the bug
 * priority/status tables of the database, to be stored in the bug contianer of
 * the redux state
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setPriorityStatus({
 * 		priorityList: [
 * 			{ id: 1, option: "None" },
 * 			{ id: 2, option: "Low" },
 * 			{ id: 3, option: "Medium" },
 * 			{ id: 4, option: "High" },
 * 		],
 * 		priorityEmptyId: 1,
 * 		statusList: [
 * 			{ id: 1, option: "None", color: "gray" },
 * 			{ id: 2, option: "On Hold", color: "red" },
 * 			{ id: 3, option: "Planning", color: "blue" },
 * 			{ id: 4, option: "Developing", color: "purple" },
 * 			{ id: 5, option: "Testing", color: "orange" },
 * 			{ id: 6, option: "Completed", color: "green" },
 * 		],
 * 		statusEmptyId: 1,
 * 		statusCompletionId: 6,
 * 	}, {
 * 		priorityList: [
 * 			{ id: 1, option: "None" },
 * 			{ id: 2, option: "Low" },
 * 			{ id: 3, option: "Medium" },
 * 			{ id: 4, option: "High" },
 * 		],
 * 		priorityEmptyId: 1,
 * 		statusList: [
 * 			{ id: 1, option: "Open", color: "blue" },
 * 			{ id: 2, option: "In Progress", color: "purple" },
 * 			{ id: 3, option: "Testing", color: "orange" },
 * 			{ id: 4, option: "Closed", color: "green" },
 * 		],
 * 		statusEmptyId: null,
 * 		statusCompletionId: 4,
 * 	})
 * );
 */
export const setPriorityStatus =
	(projectPriorityStatus, bugPriorityStatus) => (dispatch) => {
		dispatch({
			container: PROJECT_CONTAINER,
			type: SET_PRIORITY_STATUS,
			priorityStatusInfo: projectPriorityStatus,
		});
		dispatch({
			container: BUG_CONTAINER,
			type: SET_PRIORITY_STATUS,
			priorityStatusInfo: bugPriorityStatus,
		});
	};

/**
 * Calls /api/priority-status/retrieve route to retrieve info containing
 * developer set data for priority/status tables (2 tables for projects; 2
 * tables for bugs) of the database and store it in 'priorityStatusOptions'
 * property in their corresponding containers (i.e. 'PROJECT_CONTAINER' and
 * 'BUG_CONTAINER') of the redux state.
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(retrievePriorityStatusArrays({}));
 */
export const retrievePriorityStatusArrays = () => (dispatch) => {
	axios
		.get("/api/reference-data/retrieve-priority-status")
		.then((res) => {
			const { projectPriorityStatus, bugPriorityStatus } = res.data;
			dispatch(setPriorityStatus(projectPriorityStatus, bugPriorityStatus));
		})
		.catch((err) => {
			console.log(err);
		});
};
