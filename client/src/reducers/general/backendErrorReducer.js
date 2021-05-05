import { SET_BACKEND_ERRORS } from "../../actions/constants/types";

// Default state for backend errors (no backend errors appear by default)
const initialState = {};

/**
 * Used to set Object for backend errors containing info on what went wrong 
 * during an http request (typically input validation errors) to be displayed 
 * to the user, stored in the general container of the redux state
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
 * }} state - Object for the current backend errors in the redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
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
 * }} Object for backend errors to be stored in the general container of the 
 * redux state
 */
export default function backendErrorReducer(state = initialState, action) {
	switch (action.type) {
		case SET_BACKEND_ERRORS:
			return action.backendErrors;
		default:
			return state;
	}
}
