import { SET_MASS_DELETE_LIST } from "../../actions/constants/types";

// Initial state for either the project or bug massDeleteList (reducer used for 
// ...PROJECT_CONTAINER and BUG_CONTAINER). Empty array since no projects or 
// ...bugs should be selected for mass deletion by default.
const initialState = [];

/**
 * Used to set 'massDeleteList' property containing an Array of ids of either
 * projects or bugs (not both) to be deleted, stored into either PROJECT_CONATINER
 * or BUG_CONTAINER (reducer used for both) of the redux state
 *
 * @param {number[]} state - Current Array (in the redux state) containing ids
 * of either projects or bugs (not both) to be deleted
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {number[]} Array containing ids of either projects or bugs (not 
 * both) to be deleted
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
