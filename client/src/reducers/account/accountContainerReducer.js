import accountComponentsDisplayReducer from "./accountComponentsDisplayReducer";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";

import { ACCOUNT_CONTAINER } from "../../actions/typeContainer";

const initialState = {
	// (undefined, {type: null}) will cause each function to return their initial state
	componentsDisplay: accountComponentsDisplayReducer(undefined, { type: null }),
	auth: authReducer(undefined, { type: null }),
	info: accountReducer(undefined, { type: null }),
};

export default function (state = initialState, action) {
	switch (action.container) {
		case ACCOUNT_CONTAINER:
			return {
				componentsDisplay: accountComponentsDisplayReducer(
					state.componentsDisplay,
					action
				),
				auth: authReducer(state.auth, action),
				info: accountReducer(state.info, action),
			};
		default:
			return state;
	}
}
