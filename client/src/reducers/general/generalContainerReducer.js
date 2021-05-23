import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";
// Other reducers used by this reducer
import generalComponentsDisplayReducer from "./generalComponentsDisplayReducer";
import generalDropdownsDisplayReducer from "./generalDropdownsDisplayReducer";
import globalConstantsReducer from "./globalConstantsReducer";
import backendErrorReducer from "./backendErrorReducer";

// Initial state for GENERAL_CONTAINER of the redux state
const initialState = {
	// Passing 'undefined, {}' causes reducers to return their initial state
	componentsDisplay: generalComponentsDisplayReducer(undefined, {}),
	dropdownsDisplay: generalDropdownsDisplayReducer(undefined, {}),
	backendErrors: backendErrorReducer(undefined, {}),
	// Passed nothing since this reducer takes no parameters
	globalConstants: globalConstantsReducer(),
};

/**
 * Used to set 'GENERAL_CONTAINER' Object of the redux state
 *
 * @param {Object} state - Current COMMENT_CONTAINER Object in the redux state
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {Object} Object containing all data for GENERAL_CONTAINER of 
 * the redux state
 */
export function generalContainerReducer(state = initialState, action) {
	switch (action.container) {
		case GENERAL_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of redux state containers to their initial state
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
