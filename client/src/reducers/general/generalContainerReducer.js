import generalComponentsDisplayReducer from "./generalComponentsDisplayReducer";
import generalDropdownsDisplayReducer from "./generalDropdownsDisplayReducer";
import globalConstantsReducer from "./globalConstantsReducer";
import backendErrorReducer from "./backendErrorReducer";

import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";

// Default state for the general container (each reducers initial state)
const initialState = {
	// passing 'undefined, {}' causes reducers to return their initial state
	componentsDisplay: generalComponentsDisplayReducer(undefined, {}),
	dropdownsDisplay: generalDropdownsDisplayReducer(undefined, {}),
	backendErrors: backendErrorReducer(undefined, {}),
	// Passed nothing since this reducer takes no parameters
	globalConstants: globalConstantsReducer(),
};

/**
 * Used to set Object for the general container of the redux state
 *
 * @param {Object} state - Object containing all current data for the general
 * container of the redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {Object} Object containing all data for the general container of 
 * the redux state
 */
export function generalContainerReducer(state = initialState, action) {
	switch (action.container) {
		case GENERAL_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of the redux state to default
			if (action.type === RESET_CONTAINER) {
				return initialState;
			} else {
				return {
					componentsDisplay: generalComponentsDisplayReducer(
						state.componentsDisplay,
						action
					),
					dropdownsDisplay: generalDropdownsDisplayReducer(
						state.dropdownsDisplay,
						action
					),
					backendErrors: backendErrorReducer(state.backendErrors, action),
					// Passed nothing since this reducer takes no parameters
					globalConstants: globalConstantsReducer(),
				};
			}
		default:
			return state;
	}
}
