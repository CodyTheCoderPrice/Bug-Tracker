import { SET_AUTHENTICATION } from "../../actions/constants/types";
const isEmpty = require("is-empty");

// Default state for user authentication (set as not authenticated since no
// ...acount is logged in by default)
const initialState = {
	// Is the account currently authenticated by the backend
	isAuthenticated: false,
	// The account info
	info: {},
};

/**
 * Used to set Object containing authentication data for the current user of the
 * site in the account container of the redux state
 * 
 * @param {Object} state - Object for the current user authentication data in the
 * redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {Object} Object containing authentication data for the current user
 * of the site to be stored in the account container of the redux state
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
