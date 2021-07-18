import { SET_BACKEND_ERRORS } from "../../actions/constants/types";

// Initial state for backend errors (no backend errors appear by default)
const initialState = {};

/**
 * Used to set 'backendErrors' property containing info on what went wrong during
 * any given http request (usually input validation errors, e.g. incorrect 
 * password) to be displayed to the user, stored into GENERAL_CONTAINER of the
 * redux state
 * 
 * @param {{
 * 	server: (string|undefined),
 *  serverAccount: (string|undefined),
 * 	serverSettings: (string|undefined),
 * 	serverItem: (string|undefined),
 * 	serverPriorityStatus: (string|undefined),
 * 	serverConnection: (string|undefined),
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
 * }} state - Current Object (in the redux state) for the backend errors 
 * containing info on what went wrong during any given http request
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	server: (string|undefined),
 *  serverAccount: (string|undefined),
 * 	serverSettings: (string|undefined),
 * 	serverItem: (string|undefined),
 * 	serverPriorityStatus: (string|undefined),
 * 	serverConnection: (string|undefined),
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
 * }} Object containing info on what went wrong during any given http request
 */
export default function backendErrorReducer(state = initialState, action) {
	switch (action.type) {
		case SET_BACKEND_ERRORS:
			return action.backendErrors;
		default:
			return state;
	}
}
