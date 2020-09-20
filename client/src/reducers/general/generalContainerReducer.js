import coreComponentsDisplayReducer from "./coreComponentsDisplayReducer";
import inputErrorReducer from "./inputErrorReducer";

import { GENERAL_CONTAINER } from "../../actions/typeContainer";

const initialState = {
	// (undefined, {type: null}) will cause each function to return their initial state
	coreComponentsDisplay: coreComponentsDisplayReducer(undefined, {
		type: null,
	}),
	inputErrors: inputErrorReducer(undefined, { type: null }),
};

export default function (state = initialState, action) {
	switch (action.container) {
		case GENERAL_CONTAINER:
			return {
				coreComponentsDisplay: coreComponentsDisplayReducer(
					state.coreComponentsDisplay,
					action
				),
				inputErrors: inputErrorReducer(state.inputErrors, action),
			};
		default:
			return state;
	}
}
