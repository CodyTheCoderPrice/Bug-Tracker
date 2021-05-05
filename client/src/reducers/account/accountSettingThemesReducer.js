import { SET_ACCOUNT_SETTING_THEMES } from "../../actions/constants/types";

// Default state for themes (empty since stored in database)
const initialState = []

/**
 * Used to set array of Objects containing themes data from the database in the
 * account container of the redux state
 * 
 * @param {({ 
 * 	theme_id: number, 
 * 	order_number: number, 
 * 	color: string, 
 * 	marks_default: boolean 
 * }[] | [])} state - Array of Objects for themes data in the redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {({ 
 * 	theme_id: number, 
 * 	order_number: number, 
 * 	color: string, 
 * 	marks_default: boolean 
 * }[] | [])} Array of Objects for themes to be stored in the account container
 * of the redux state
 */
export default function accountSettingThemesReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_SETTING_THEMES:
			return action.accountSettingThemes;
		default:
			return state;
	}
}