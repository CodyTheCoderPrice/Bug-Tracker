import { SET_ERROR_MESSAGES } from "../../actions/constants/types";

// Initial state for errorMessages (no error messages appear by default)
const initialState = {};

/**
 * Used to set 'errorMessages' property containing error messages — recieved from
 * failed HTTP requests or redux actions recieving invalid data (e.g. user enters
 * wrong password when logging in or invalid data is recieved from the database)
 * — in 'GENERAL_CONTAINER' of the redux state.
 *
 * Note: The purpose of the 'errorMessages' property is to be used to display
 * error messages to the user so they can know why their attempt failed and
 * possibly how to fix it. These messages should be displayed in the component
 * from which they occured (e.g. an error message for failed login attempt should
 * display in AuthenticationLogin component).
 *
 * @param {({
 * 	server: (string|undefined),
 *  serverAccount: (string|undefined),
 * 	serverSettings: (string|undefined),
 * 	serverItem: (string|undefined),
 * 	serverPriorityStatus: (string|undefined),
 * 	serverConnection: (string|undefined),
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
 * }|undefined)} state - Current Object (in the redux state) for error messages
 * failed HTTP requests or redux actions recieving invalid data
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
 * }} Object containing error messages from failed HTTP requests or redux
 * actions recieving invalid data
 */
export default function errorMessageReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ERROR_MESSAGES:
			return action.errorMessages;
		default:
			return state;
	}
}
