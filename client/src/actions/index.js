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
 * Sets JSON object containing the size info of multiple html elements (thats
 * size remains constant) in the size container of the redux state. This info
 * is mostly used to calulcate the resizing of other html elements, but is
 * sometimes used for other things
 *
 * @param {JSON} sizes - JSON containing size info for multiple html elements
 * (thats size remains constant)
 */
export const setDisplaySizeConstants = (sizes) => (dispatch) => {
	dispatch({
		container: SIZE_CONTAINER,
		type: SET_DISPLAY_SIZE_CONSTANTS,
		sizes: sizes,
	});
};

/**
 * Sets JSON object containing the current size info of the Window and Navbar
 * elements in the size container of the redux state. These sizes are updated
 * everytime they change. This info is mostly used to calulcate the resizing of
 * other html elements, but is sometimes used for other things
 *
 * @param {JSON} sizes - JSON containing current size info for Widnow and Navbar
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
 * @param {Number} fontSize - Number of current font size of the breadcrumb menu
 * button text elements
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
 * Sets JSON objects containing the developer set data for the project and the
 * bug priority/status tables (4 total) of the database used by the app to
 * convert priority/status integer values for projects/bugs to the string
 * options they represent, populate priority/status comboboxes, and dynamically
 * know if any particular option represents empty or completed. These JSON
 * objects are stored in their corresponding containers of the redux state
 *
 * @param {JSON} projectPriorityStatus - JSON containing the developer set data
 * in the project priority/status tables of the database, to be stored in the
 * project contianer of the redux state
 * @param {JSON} bugPriorityStatus - JSON containing the developer set data
 * in the bug priority/status tables of the database, to be stored in the
 * bug contianer of the redux state
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
 * Sets JSON object containing info on what went wrong during an http request
 * to be displayed to the user (typically input validation errors), in the
 * general container of the redux state
 *
 * @param {JSON} backendErrors - JSON containing info on what went wrong during
 * an http request
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
 * Clears JSON object for backend errors in the general container of the redux
 * state
 */
export const clearBackendErrors = () => (dispatch) => {
	dispatch({
		container: GENERAL_CONTAINER,
		type: SET_BACKEND_ERRORS,
		backendErrors: {},
	});
};

/**
 * Creates a header containing jwToken from localStorage (set during login)
 * so the server can both decode it to get the account_id for the call
 * as well as authenticate the call without being sent a password
 *
 * @returns {JSON} header containing jwToken from localStorage
 */
export const createHeader = () => {
	return { headers: { jwToken: localStorage.jwToken } };
};
