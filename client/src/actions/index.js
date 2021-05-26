import axios from "axios";
// Container names used to work with the redux state
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "./constants/containerNames";
import {
	SET_DISPLAY_SIZE_CONSTANTS,
	SET_DISPLAY_SIZE_VARIABLES_WINDOW_NAVBAR,
	SET_DISPLAY_SIZE_VARIABLES_BREADCRUMB_FONT_SIZE,
	SET_THEMES,
	SET_SORT_CATEGORIES,
	SET_PRIORITY_STATUS,
	SET_BACKEND_ERRORS,
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
 * Sets size info of multiple html elements (thats size remains constant) in
 * 'constants' Object in SIZE_CONTAINER of the redux state.
 *
 * This info is mostly used to calulcate the resizing of other html elements,
 * but is sometimes used for other things.
 *
 * @param {{
 * 	scrollbarWidth: (number|null),
 * 	navbarAccountButtonWidth: (number|null),
 * 	navbarBreadcrumbButtonTextBaseFontSize: (number|null),
 * 	navbarBreadcrumbArrowWidth: (number|null),
 * 	navbarHamburgerStyles: ({
 * 		buttonLeft: number,
 * 		titleLeft: number,
 * 		titleBaseFontSize: number }|null),
 * 	listViewTopBarHeight: (number|null),
 * 	listViewTableRowHeight: (number|null),
 * 	itemViewTopBarHeight: (number|null),
 * 	itemViewListSidebarWidth: (number|null),
 * 	itemViewOuterDividingContainerMinWidth: (number|null),
 * 	itemViewPaddingContainerPadding: (number|null)
 * }} sizes - Object containing size info for multiple html elements (whose
 * size remains constant)
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setDisplaySizeConstants({
 * 		scrollbarWidth: 17,
 * 		navbarAccountButtonWidth: 170,
 * 		navbarBreadcrumbButtonTextBaseFontSize: 18,
 * 		navbarBreadcrumbArrowWidth: 20,
 * 		navbarHamburgerStyles: {
 * 			buttonLeft: 10,
 * 			titleLeft: 52,
 * 			titleBaseFontSize: 18 },
 * 		listViewTopBarHeight: 48,
 * 		listViewTableRowHeight: 50,
 * 		itemViewTopBarHeight: 48,
 * 		itemViewListSidebarWidth: 275,
 * 		itemViewOuterDividingContainerMinWidth: 560,
 * 		itemViewPaddingContainerPadding: 25
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
 * Sets current size info of the Window and Navbar elements in 'variables'
 * Object in SIZE_CONTAINER of the redux state.
 *
 * These sizes should be updated everytime they change. This info is mostly
 * used to calulcate the resizing of other html elements, but is sometimes used
 * for other things
 *
 * @param {{
 * 	window: ({
 * 		height: number,
 * 		width: number
 * 	}|null),
 * 	navbar: ({
 * 		height: number,
 * 		width: number
 * 	}|null)
 * }} sizes - Object containing current size info for Widnow and Navbar
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setDisplaySizeVariablesWindowAndNavbar({
 * 		window: {
 * 			height: 453,
 * 			width: 1536
 * 		},
 * 		navbar: {
 * 			height: 56,
 * 			width: 1536
 * 		}
 * 	})
 * );
 */
export const setDisplaySizeVariablesWindowAndNavbar = (sizes) => (dispatch) => {
	dispatch({
		container: SIZE_CONTAINER,
		type: SET_DISPLAY_SIZE_VARIABLES_WINDOW_NAVBAR,
		sizes: sizes,
	});
};

/**
 * Sets current font size of element's with breadcrumb-button__text className
 * (in NavbarBreadcrumb component) in 'variables' Object in SIZE_CONTAINER of
 * the redux state.
 *
 * These sizes should be updated everytime they change. The font size is used
 * to know when the switch to the hamburger menu (e.g. when breadcrumb button
 * text element's font size gets to be too small).
 *
 * @param {number} fontSize - Number of current font size of the breadcrumb menu
 * button text elements
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(setDisplaySizeVariablesBreadcrumbFontSize(18));
 */
export const setDisplaySizeVariablesBreadcrumbFontSize =
	(fontSize) => (dispatch) => {
		dispatch({
			container: SIZE_CONTAINER,
			type: SET_DISPLAY_SIZE_VARIABLES_BREADCRUMB_FONT_SIZE,
			fontSize: fontSize,
		});
	};

/**
 * Sets themes info (from theme table in the database) in 'themes' Object in
 * GENERAL_CONTAINER of the redux state.
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
 * database and store it in 'themes' Object of GENERAL_CONTAINER of the redux
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
 * Sets sort categories info in 'sortCategories' of GENERAL_CONTAINER of the
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
 * GENERAL_CONTAINER of the redux state
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
 * Sets info containing developer set data for priority/status tables (2 tables
 * for projects; 2 tables for bugs) of the database in 'priorityStatusOptions'
 * Object in their corresponding containers (i.e. PROJECT_CONTAINER and
 * BUG_CONTAINER) of the redux state.
 *
 * This info is used by the app to convert priority/status integer values for
 * projects/bugs to the string options they represent, populate priority/status
 * comboboxes, and dynamically know if any particular option represents empty
 * or completed.
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
 * Object in their corresponding containers (i.e. PROJECT_CONTAINER and
 * BUG_CONTAINER) of the redux state.
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

/**
 * Sets info of what went wrong during an http request (e.g. invalid user
 * input, server error, ect.) in 'backendErrors' Object in GENERAL_CONTAINER of
 * the redux state.
 *
 * This info is mostly used to be displayed to the user, but may also be used
 * for security (e.g. to loggout an account if an API request is made with an
 * expire jwTowken).
 *
 * @param {{
 * 	server: (string|undefined),
 *  serverAccount: (string|undefined),
 * 	serverSettings: (string|undefined),
 * 	serverItem: (string|undefined),
 * 	serverPriorityStatus: (string|undefined),
 *  serverConnection: (string|undefined),
 * 	jwToken: (string|undefined),
 * 	authorization: (string|undefined),
 * 	account: (string|undefined),
 * 	validationAccount: (string|undefined),
 * 	validationAccountFirstName: (string|undefined),
 * 	validationAccountLastName: (string|undefined),
 * 	validationAccountEmail: (string|undefined),
 * 	validationAccountPassword: (string|undefined),
 * 	validationAccountNewEmail: (string|undefined),
 * 	validationAccountNewPassword: (string|undefined),
 * 	currentPassword: (string|undefined),
 * 	validationAccountTypeOutCheck: (string|undefined),
 * 	validationItem: (string|undefined),
 * 	validationItemName: (string|undefined),
 * 	validationItemDescription: (string|undefined),
 * 	validationItemLocation: (string|undefined),
 * 	validationComment: (string|undefined),
 * 	validationCreateCommentDescription: (string|undefined),
 * 	validationEditCommentDescription: (string|undefined),
 * }} backendErrors - Object containing info on what went wrong during an http
 * request
 *
 * @example
 * // Backend errors for invalid input when registering an account. The
 * // ...dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	seBackendErrors({
 * 		validationAccountFirstName: "First name required",
 * 		validationAccountLastName: "Last name longer than 35 characters",
 * 		validationAccountEmail: "Email is invalid",
 * 		validationAccountPassword: "Password not between 6-30 characters"
 * 	})
 * );
 *
 * @example
 * // Clears backend errors. The dispatch function is from useDispatch()
 * // ...imported from react-redux.
 * dispatch(seBackendErrors({}));
 */
export const seBackendErrors = (backendErrors) => (dispatch) => {
	dispatch({
		container: GENERAL_CONTAINER,
		type: SET_BACKEND_ERRORS,
		// If undefined, then there was an issue connecting to the server
		backendErrors:
			backendErrors !== undefined
				? backendErrors
				: { serverConnection: "Server connection error" },
	});
};

/**
 * Clears info in 'backendErrors' Object in GENERAL_CONTAINER of the redux
 * state.
 *
 * This typically used so backend errors do not continue to display when a user
 * navigates back to the component they last had a backend error for.
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(clearBackendErrors());
 */
export const clearBackendErrors = () => (dispatch) => {
	dispatch(seBackendErrors({}));
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
