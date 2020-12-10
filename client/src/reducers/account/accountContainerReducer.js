import accountComponentsDisplayReducer from "./accountComponentsDisplayReducer";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";

import { ACCOUNT_CONTAINER } from "../containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";

const initialState = {
	// (undefined, {}) will cause each function to return their initial state
	componentsDisplay: accountComponentsDisplayReducer(undefined, {}),
	auth: authReducer(undefined, {}),
	info: accountReducer(undefined, {}),
};

export function accountContainerReducer(state = initialState, action) {
	switch (action.container) {
		case ACCOUNT_CONTAINER:
			if(action.type === RESET_CONTAINER) {
				return initialState
			} else {
				return {
					componentsDisplay: accountComponentsDisplayReducer(
						state.componentsDisplay,
						action
					),
					auth: authReducer(state.auth, action),
					info: accountReducer(state.info, action),
				};
			}
		default:
			return state;
	}
}