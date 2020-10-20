import displaySizeConstantsReducer from "./displaySizeConstantsReducer";
import displaySizeVariablesReducer from "./displaySizeVariablesReducer";

import { SIZE_CONTAINER } from "../../actions/typeContainer";
import { RESET_CONTAINER } from "../../actions/types";

const initialState = {
	// (undefined, {}) will cause each function to return their initial state
	constants: displaySizeConstantsReducer(undefined, {}),
	variables: displaySizeVariablesReducer(undefined, {}),
};

export function sizeContainerReducer(state = initialState, action) {
	switch (action.container) {
		case SIZE_CONTAINER:
			if(action.type === RESET_CONTAINER) {
				return initialState
			} else {
				return {
					constants: displaySizeConstantsReducer(state.constants, action),
					variables: displaySizeVariablesReducer(state.variables, action),
				};
			}
		default:
			return state;
	}
}
