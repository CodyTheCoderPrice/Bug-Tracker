import { SET_ACCOUNT_SETTINGS } from "../../actions/constants/types";

// Default state for account (empty since no account is logged in by default)
const initialState = {}

/**
 * Used to set JSON containing account settings data from the database in the
 * account container of the redux state
 * 
 * @param {JSON} state - JSON for the current account settings data in the
 * redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} JSON for account settings to be stored in the account
 * container of the redux state
 */
export default function accountSettingsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_SETTINGS:
			return action.accountSettings;
		default:
			return state;
	}
}