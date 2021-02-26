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
 * determin where and what to do in the redux state), and any data addition
 * data needed based on the container name and type (typically data to updated
 * in the redux state)
 * @returns {JSON} - JSON for account setting sort categories to be stored in
 * the account container of the redux state
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_SETTING_SORT_CATEGORIES:
			return action.accountSettingSortCategories;
		default:
			return state;
	}
}