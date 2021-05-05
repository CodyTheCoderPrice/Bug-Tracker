import { SET_ACCOUNT_SETTING_SORT_CATEGORIES } from "../../actions/constants/types";

// Default state for sort categories (empty since stored in database)
const initialState = []

/**
 * Used to set array of Objects containing sort categories data from the 
 * database in the account container of the redux state
 * 
 * @param {({ 
 * 	sort_id: number, 
 * 	order_number: number, 
 * 	category: string, 
 * 	marks_default: boolean
 * }[] | [])} state - Array of Objects for sort categories data in the redux
 * state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {({ 
 * 	sort_id: number, 
 * 	order_number: number, 
 * 	category: string, 
 * 	marks_default: boolean
 * }[] | [])} Array of Objects for sort categories to be stored in the account
 * container of the redux state
 */
export default function accountSettingSortCategoriesReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_SETTING_SORT_CATEGORIES:
			return action.accountSettingSortCategories;
		default:
			return state;
	}
}