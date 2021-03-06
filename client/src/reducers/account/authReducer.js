import { SET_AUTHENTICATION } from "../../actions/constants/types";
const isEmpty = require("is-empty");

// Initial state for user authentication (set as not authenticated since no
// ...acount is logged in by default)
const initialState = {
	// Is the account currently authenticated by the backend
	isAuthenticated: false,
	// The account info
	info: {},
};

/**
 * Used to set 'auth' property containing authentication data for the logged in
 * account of into ACCOUNT_CONTAINER of the redux state
 * 
 * @param {{
 * 	isAuthenticated: boolean,
 * 	info: ({
 *		account_id: number,
 * 		iat: number, 
 * 		exp: number 
 * 	} | {})
 * }} state - Current Object (in the redux state) for the logged in account's
 * authentication data
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	isAuthenticated: boolean,
 * 	info: ({
 *		account_id: number,
 * 		iat: number, 
 * 		exp: number 
 * 	} | {})
 * }} Object containing authentication data for the logged in account
 */
export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATION:
			return {
				isAuthenticated: !isEmpty(action.decodedToken),
				decodedToken: action.decodedToken,
			};
		default:
			return state;
	}
}
