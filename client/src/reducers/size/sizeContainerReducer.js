import { SIZE_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";
// Other reducers used by this reducer
import displaySizeConstantsReducer from "./displaySizeConstantsReducer";
import displaySizeVariablesReducer from "./variables/displaySizeVariablesReducer";

// Initial state for 'SIZE_CONTAINER' of the redux state
const initialState = {
	// Passing undefined and {} causes reducers to return their initial state
	constants: displaySizeConstantsReducer(undefined, {}),
	variables: displaySizeVariablesReducer(undefined, {}),
};

/**
 * Used to set 'SIZE_CONTAINER' Object of the redux state.
 * 
 * Note: The purpose of this reducer is to be used by combineReducers function 
 * in store.js file to have properties relating to element sizes seperated into
 * their own Object of the redux state for organizational purposes.
 * 
 * @param {(Object|undefined)} state - Current 'SIZE_CONTAINER' Object in the 
 * redux state
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {Object} Updated 'SIZE_CONTAINER' Object for the redux state
 */
export function sizeContainerReducer(state = initialState, action) {
	switch (action.container) {
		case SIZE_CONTAINER:
			if(action.type === RESET_CONTAINER) {
				return initialState
			} else {
				return {
					// Must pass 'state.constants' or else default return will
					// ...be entire size container instead of just 'constants'
					constants: displaySizeConstantsReducer(state.constants, action),
					// Must pass 'state.variables' or else default return will
					// ...be entire size container instead of just 'variables'
					variables: displaySizeVariablesReducer(state.variables, action),
				};
			}
		default:
			return state;
	}
}
