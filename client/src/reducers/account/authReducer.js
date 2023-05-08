import { SET_AUTHENTICATION } from "../../actions/constants/types";
const isEmpty = require("is-empty");

const initialState = {
	// Set to false since no account is logged in by default
	isAuthenticated: false,
	// Set to an empty Object since no account is logged in by default
	decodedToken: {},
};

/**
 * Uses 'decodedToken' prop to set 'auth' Object (containing authentication data
 * from the backend -- i.e. is an account logged in, logged in account's id,
 * time of login, and when authentication will expire) into 'ACCOUNT_CONTAINER'
 * of the redux state.
 *
 * Note: Inside the 'auth' Object, the purpose of the 'isAuthenticated' boolean
 * is to be another way of telling if an account is currently logged into the
 * app (can also tell by checking if jwToken is present in localStorage), and
 * the purpose of the 'decodedToken' Object is to give the frontend access to
 * the jwToken decoded (not currently used for anything, but is nice to have).
 *
 * @param {({
 * 	isAuthenticated: Boolean,
 * 	decodedToken: ({
 *		account_id: Number,
 * 		iat: number,
 * 		exp: number
 * 	} | {})
 * }|undefined)} state - Current Object (in the redux state) for account authentication
 * data
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	isAuthenticated: boolean,
 * 	decodedToken: ({
 *		account_id: number,
 * 		iat: number,
 * 		exp: number
 * 	} | {})
 * }} Object containing account authentication data
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
