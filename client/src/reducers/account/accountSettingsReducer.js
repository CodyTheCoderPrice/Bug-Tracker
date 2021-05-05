import { SET_ACCOUNT_SETTINGS } from "../../actions/constants/types";

// Default state for account settings (empty since no account is logged in by 
// ...default)
const initialState = {}

/**
 * Used to set Object containing account settings data from the database in the
 * account container of the redux state
 * 
 * @param {({ 
 * 	setting_id: number, 
 * 	filter_completed_projects_by_default: boolean, 
 * 	filter_completed_bugs_by_default: boolean, 
 * 	dark_mode: boolean, 
 * 	theme_id: number, 
 * 	theme_color: string, 
 * 	project_sort_id: number, 
 * 	project_sort_ascending: boolean, 
 * 	bug_sort_id: number, 
 * 	bug_sort_ascending: boolean, 
 * 	last_edited_timestamp: string 
 * } | {})} state - Object for the current account settings data in the redux
 * state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {({ 
 * 	setting_id: number, 
 * 	filter_completed_projects_by_default: boolean, 
 * 	filter_completed_bugs_by_default: boolean, 
 * 	dark_mode: boolean, 
 * 	theme_id: number, 
 * 	theme_color: string, 
 * 	project_sort_id: number, 
 * 	project_sort_ascending: boolean, 
 * 	bug_sort_id: number, 
 * 	bug_sort_ascending: boolean, 
 * 	last_edited_timestamp: string 
 * } | {})} Object for account settings to be stored in the account container 
 * of the redux state
 */
export default function accountSettingsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_SETTINGS:
			return action.accountSettings;
		default:
			return state;
	}
}