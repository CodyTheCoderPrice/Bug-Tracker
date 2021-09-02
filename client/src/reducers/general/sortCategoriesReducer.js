import { SET_SORT_CATEGORIES } from "../../actions/constants/types";

// Initial state for sort categories (empty since stored in database)
const initialState = []

/**
 * Used to set 'sortCategories' property containing Array of Objects containing
 * sort category data from the database into 'GENERAL_CONTAINER' of the redux 
 * state.
 * 
 * Note: The purpose of the 'sortCategories' property is to be used to display
 * (e.g. display all sort catogoires in AccountModalEditSeetings component) and
 * use (e.g. map sort catogies to the table headers in ListViewTable component)
 * the sort categories without constantly needing to refetch it from the database.
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
export default function sortCategoriesReducer(state = initialState, action) {
	switch (action.type) {
		case SET_SORT_CATEGORIES:
			return action.sortCategories;
		default:
			return state;
	}
}