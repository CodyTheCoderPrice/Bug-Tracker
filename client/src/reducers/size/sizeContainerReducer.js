import displaySizeConstantsReducer from "./displaySizeConstantsReducer";
import displaySizeVariablesReducer from "./variables/displaySizeVariablesReducer";

import { SIZE_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";

// Default state for the size container (each reducers inital state)
const initialState = {
	// passing 'undefined, {}' causes reducers to return their initial state
	constants: displaySizeConstantsReducer(undefined, {}),
	variables: displaySizeVariablesReducer(undefined, {}),
};

/**
 * Used to set JSON for the size container of the redux state
 * 
 * @param {JSON} state - JSON containing all current data for the size
 * container of the redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} - JSON containing all data for the size container of the
 * redux state
 */
export function sizeContainerReducer(state = initialState, action) {
	switch (action.container) {
		case SIZE_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of the redux state to default
			if(action.type === RESET_CONTAINER) {
				return initialState
			} else {
				return {
					// Must pass state.constants or else default return will
					// ...be entire size container
					constants: displaySizeConstantsReducer(state.constants, action),
					// Must pass state.variables or else default return will
					// ...be entire size container
					variables: displaySizeVariablesReducer(state.variables, action),
				};
			}
		default:
			return state;
	}
}
