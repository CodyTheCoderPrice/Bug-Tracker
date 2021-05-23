import { SET_ACCOUNT_SETTING_SORT_CATEGORIES } from "../../actions/constants/types";

// Initial state for sort categories (empty since stored in database)
const initialState = []

/**
 * Used to set 'settingSortCategories' Array of Objects containing sort 
 * category data from the database into ACCOUNT_CONTAINER of the redux state
 * 
 * @param {{ 
 * 	sort_id: number, 
 * 	order_number: number, 
 * 	category: string, 
 * 	marks_default: boolean
 * }[]} state - Current Array of Objects (in the redux state) for sort category
 * data
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{ 
 * 	sort_id: number, 
 * 	order_number: number, 
 * 	category: string, 
 * 	marks_default: boolean
 * }[]} Array of Objects containing sort category data from the database
 */
export default function accountSettingSortCategoriesReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_SETTING_SORT_CATEGORIES:
			return action.accountSettingSortCategories;
		default:
			return state;
	}
}