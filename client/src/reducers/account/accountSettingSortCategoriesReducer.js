import { SET_ACCOUNT_SETTING_SORT_CATEGORIES } from "../../actions/constants/types";

// Default state for account (empty since no account is logged in by default)
const initialState = {}

/**
 * Used to set JSON containing account setting sort categories data from the
 * database in the account container of the redux state
 * 
 * @param {JSON} state - JSON for account setting sort categories data in the
 * redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} JSON for account setting sort categories to be stored in
 * the account container of the redux state
 */
export default function accountSettingSortCategoriesReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_SETTING_SORT_CATEGORIES:
			return action.accountSettingSortCategories;
		default:
			return state;
	}
}