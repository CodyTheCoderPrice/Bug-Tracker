import { SET_MASS_DELETE_LIST } from "../../actions/constants/types";

// Default state for either the project or bug massDeleteList (reducer used by
// ...both containers) (empty array since massDeleteList should be empty by
// ...default)
const initialState = [];

/**
 * Used to set Object containing either the project or bug massDeleteList
 * (reducer used by both containers) in either the project or bug container
 * of the redux state
 *
 *
 * @param {Object} state - Object for either the current project or bug
 * massDeleteList (reducer used by both containers) in the redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {Object} Object for either the project or bug massDeleteList (reducer
 * used by both containers) to be stored in either the project or bug container
 * of the redux state
 */
export default function massDeleteReducer(state = initialState, action) {
	switch (action.type) {
		case SET_MASS_DELETE_LIST:
			// Ternary operator is used to reset the list if passed undefined
			return action.list !== undefined ? action.list : [];
		default:
			return state;
	}
}
