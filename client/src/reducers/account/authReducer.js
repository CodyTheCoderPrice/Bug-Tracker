import { SET_AUTHENTICATION } from "../../actions/constants/types";
const isEmpty = require("is-empty");

// Default state for user authentication (set as not authenticated since no
// ...acount is logged in by default)
const initialState = {
	isAuthenticated: false,
	info: {},
};

/**
 * Used to set JSON containing authentication data for the current user of the
 * site in the account container of the redux state
 * 
 * @param {JSON} state - JSON for the current user authentication data in the
 * redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what to do in the redux state), and any data addition
 * data needed based on the container name and type (typically data to updated
 * in the redux state)
 * @returns {JSON} - JSON containing authentication data for the current user
 * of the site to be stored in the account container of the redux state
 */
export default function (state = initialState, action) {
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
