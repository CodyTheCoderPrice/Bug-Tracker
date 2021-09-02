import { ACCOUNT_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";
// Other reducers used by this reducer
import accountComponentsDisplayReducer from "./accountComponentsDisplayReducer";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
import accountSettingsReducer from "./accountSettingsReducer";

// Initial state for 'ACCOUNT_CONTAINER' of the redux state
const initialState = {
	// Passing 'undefined, {}' causes reducers to return their initial state
	componentsDisplay: accountComponentsDisplayReducer(undefined, {}),
	auth: authReducer(undefined, {}),
	accountInfo: accountReducer(undefined, {}),
	settings: accountSettingsReducer(undefined, {}),
};

/**
 * Used to set 'ACCOUNT_CONTAINER' property of the redux state.
 * 
 * Note: The purpose of this reducer is to be used by combineReducers function 
 * in store.js to have properties relating to accounts seperated into their own
 * Object of the redux state for organizational purposes.
 *
 * @param {Object} state - Current 'ACCOUNT_CONTAINER' Object in the redux state
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {Object} Object containing all updated data for 'ACCOUNT_CONTAINER'
 * of the redux state
 */
export function accountContainerReducer(state = initialState, action) {
	switch (action.container) {
		case ACCOUNT_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of redux state containers to their initial state
			if (action.type === RESET_CONTAINER) {
				return initialState;
			} else {
				return {
					componentsDisplay: accountComponentsDisplayReducer(
						state.componentsDisplay,
						action
					),
					auth: authReducer(state.auth, action),
					accountInfo: accountReducer(state.accountInfo, action),
					settings: accountSettingsReducer(state.settings, action),
				};
			}
		default:
			return state;
	}
}
