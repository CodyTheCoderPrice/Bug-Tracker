import displaySizeConstantsReducer from "./displaySizeConstantsReducer";
import displaySizeVariablesReducer from "./displaySizeVariablesReducer";

import { SIZE_CONTAINER } from "../../actions/typeContainer";

const initialState = {
	// (undefined, {}) will cause each function to return their initial state
	constants: displaySizeConstantsReducer(undefined, {}),
	variables: displaySizeVariablesReducer(undefined, {}),
};

export function sizeContainerReducer(state = initialState, action) {
	switch (action.container) {
		case SIZE_CONTAINER:
			return {
				constants: displaySizeConstantsReducer(state.constants, action),
				variables: displaySizeVariablesReducer(state.variables, action),
			};
		default:
			return state;
	}
}
