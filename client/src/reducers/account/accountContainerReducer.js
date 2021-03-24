import accountComponentsDisplayReducer from "./accountComponentsDisplayReducer";
import authReducer from "./authReducer";
import accountReducer from "./accountReducer";
import accountSettingsReducer from "./accountSettingsReducer";
import accountSettingThemesReducer from "./accountSettingThemesReducer";
import accountSettingSortCategoriesReducer from "./accountSettingSortCategoriesReducer";

import { ACCOUNT_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";

// Default state for the account container (each reducers initial state)
const initialState = {
	// passing 'undefined, {}' causes reducers to return their initial state
	componentsDisplay: accountComponentsDisplayReducer(undefined, {}),
	auth: authReducer(undefined, {}),
	accountInfo: accountReducer(undefined, {}),
	settings: accountSettingsReducer(undefined, {}),
	settingThemes: accountSettingThemesReducer(undefined, {}),
	settingSortCategories: accountSettingSortCategoriesReducer(
		undefined,
		{}
	),
};

/**
 * Used to set JSON for the account container of the redux state
 *
 * @param {JSON} state - JSON containing all current data for the account
 * container of the redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} - JSON containing all data for the account container of the
 * redux state
 */
export function accountContainerReducer(state = initialState, action) {
	switch (action.container) {
		case ACCOUNT_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of the redux state to default
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
					settingThemes: accountSettingThemesReducer(
						state.settingThemes,
						action
					),
					settingSortCategories: accountSettingSortCategoriesReducer(
						state.settingSortCategories,
						action
					),
				};
			}
		default:
			return state;
	}
}
