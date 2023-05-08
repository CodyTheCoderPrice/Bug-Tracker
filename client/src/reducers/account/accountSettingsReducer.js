import { SET_ACCOUNT_SETTINGS } from "../../actions/constants/types";

// Set to an empty Object since no account is logged in by default
const initialState = {}

/**
 * Uses 'accountSettings' prop to set 'settings' Object (containing the logged 
 * in account's settings data from the database) into 'ACCOUNT_CONTAINER' of the
 * redux state.
 * 
 * Note: The purpose of the 'settings' Object is to be used to display (e.g.
 * displays current settings in AccountModalEditSettings component) and use 
 * (e.g. functions in colorUtils use dark_mode property) the logged in account's
 * settings without constantly needing to refetch it from the database.
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
 * } | {} | undefined)} state - Current Object (in the redux state) for the logged
 * in account's settings data
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
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
 * } | {})} Updated Object containing the logged in account's settings data from
 * the database
 */
export default function accountSettingsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_SETTINGS:
			return action.accountSettings;
		default:
			return state;
	}
}