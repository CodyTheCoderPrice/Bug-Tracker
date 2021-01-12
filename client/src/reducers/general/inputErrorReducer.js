import { SET_INPUT_ERRORS } from "../../actions/constants/types";

// Default state for input errors (no input errors appear by default)
const initialState = {};

/**
 * Used to set JSON for form input errors in the general container of the redux
 * state
 * 
 * @param {JSON} state - JSON for the current form input errors in the redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what to do in the redux state), and any data addition
 * data needed based on the container name and type (typically data to updated
 * in the redux state)
 * @returns {JSON} - JSON for form input errors to be stored in the general
 * container of the redux state
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_INPUT_ERRORS:
			return action.inputErrors;
		default:
			return state;
	}
}
