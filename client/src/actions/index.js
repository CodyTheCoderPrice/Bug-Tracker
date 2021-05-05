import axios from "axios";

// Redux containers
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "./constants/containerNames";
// Redux types
import {
	SET_DISPLAY_SIZE_CONSTANTS,
	SET_DISPLAY_SIZE_VARIABLES_WINDOW_NAVBAR,
	SET_DISPLAY_SIZE_VARIABLES_BREADCRUMB_FONT_SIZE,
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
 * Sets Object containing the size info of multiple html elements (thats
 * size remains constant) in the size container of the redux state. This info
 * is mostly used to calulcate the resizing of other html elements, but is
 * sometimes used for other things
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
 * Sets Object containing the current size info of the Window and Navbar
 * elements in the size container of the redux state. These sizes are updated
 * everytime they change. This info is mostly used to calulcate the resizing of
 * other html elements, but is sometimes used for other things
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
 * Sets the current font size of the breadcrumb menu button text elements in
 * the size container of the redux state. The fontsize is updated everytime it
 * changes. The font size is used to know when the switch to the hamburger menu
 * (i.e. when breadcrumb button text element's font size gets to be too small)
 *
 * @param {number} fontSize - Number of current font size of the breadcrumb menu
 * button text elements
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(setDisplaySizeVariablesBreadcrumbFontSize(18));
 */
export const setDisplaySizeVariablesBreadcrumbFontSize = (fontSize) => (
	dispatch
) => {
	dispatch({
		container: SIZE_CONTAINER,
		type: SET_DISPLAY_SIZE_VARIABLES_BREADCRUMB_FONT_SIZE,
		fontSize: fontSize,
	});
};

/**
 * Sets Objects containing the developer set data for the project and the bug
 * priority/status tables (4 total) of the database used by the app to convert
 * priority/status integer values for projects/bugs to the string options they
 * represent, populate priority/status comboboxes, and dynamically know if any
 * particular option represents empty or completed. These Objects are stored in
 * their corresponding containers of the redux state
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
export const setPriorityStatus = (projectPriorityStatus, bugPriorityStatus) => (
	dispatch
) => {
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
 * Calls /api/priority-status/retrieve route to retrieve the project and the
 * bug priority/status tables (4 total) info from the database and store it
 * in their corresponding containers of the redux state
 *
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(retrievePriorityStatusArrays({}));
 */
export const retrievePriorityStatusArrays = () => (dispatch) => {
	axios
		.get("/api/priority-status/retrieve")
		.then((res) => {
			const { projectPriorityStatus, bugPriorityStatus } = res.data;
			dispatch(setPriorityStatus(projectPriorityStatus, bugPriorityStatus));
		})
		.catch((err) => {
			console.log(err);
		});
};

/**
 * Sets Object containing info on what went wrong during an http request to be
 * displayed to the user (typically input validation errors), to be stored in
 * the general container of the redux state
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
 * Clears Object for backend errors in the general container of the redux state
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
