import generalComponentsDisplayReducer from "./generalComponentsDisplayReducer";
import globalConstantsReducer from "./globalConstantsReducer";
import inputErrorReducer from "./inputErrorReducer";

import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";

// Default state for the general container (each reducers initial state)
const initialState = {
	// passing 'undefined, {}' causes reducers to return their initial state
	componentsDisplay: generalComponentsDisplayReducer(undefined, {}),
	inputErrors: inputErrorReducer(undefined, {}),
	// Passed nothing since this reducer takes no parameters
	globalConstants: globalConstantsReducer(),
};

/**
 * Used to set JSON for the general container of the redux state
 *
 * @param {JSON} state - JSON containing all current data for the general
 * container of the redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what to do in the redux state), and any data addition
 * data needed based on the container name and type (typically data to updated
 * in the redux state)
 * @returns {JSON} - JSON containing all data for the general container of the
 * redux state
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
					inputErrors: inputErrorReducer(state.inputErrors, action),
					// Passed nothing since this reducer takes no parameters
					globalConstants: globalConstantsReducer(),
				};
			}
		default:
			return state;
	}
}
