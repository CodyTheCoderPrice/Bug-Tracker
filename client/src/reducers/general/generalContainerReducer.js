import generalComponentsDisplayReducer from "./generalComponentsDisplayReducer";
import inputErrorReducer from "./inputErrorReducer";

import { GENERAL_CONTAINER } from "../../actions/typeContainer";

const initialState = {
	// (undefined, {}) will cause each function to return their initial state
	componentsDisplay: generalComponentsDisplayReducer(undefined, {}),
	inputErrors: inputErrorReducer(undefined, {}),
};

export function generalContainerReducer(state = initialState, action) {
	switch (action.container) {
		case GENERAL_CONTAINER:
			return {
				componentsDisplay: generalComponentsDisplayReducer(
					state.componentsDisplay,
					action
				),
				inputErrors: inputErrorReducer(state.inputErrors, action),
			};
		default:
			return state;
	}
}