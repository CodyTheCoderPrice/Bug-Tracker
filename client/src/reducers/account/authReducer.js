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
 * Used to set 'isAuthenticated' and 'auth' properties into ACCOUNT_CONTAINER 
 * of the redux state. The 'isAuthenticated' property contains a boolean for if
 * an account is currently logged into the app. The 'auth' property contains 
 * authentication data from the backend for the logged in account's id, as well
 * as the time the account was logged in, and when it's authentication will 
 * expire.
 * 
 * Note: The purpose of the 'isAuthenticated' property is to be another way of 
 * telling if an account is currently logged into the app (can also tell by 
 * checking if jwToken is present in localStorage). The purpose of the 'auth'
 * property is to be used to know if the account's current authentication 
 * is expired, and to loggout the account when it does.
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
