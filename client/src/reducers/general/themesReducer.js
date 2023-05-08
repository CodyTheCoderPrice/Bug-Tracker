import { SET_THEMES } from "../../actions/constants/types";

// Initial state for themes (empty since stored in database)
const initialState = []

/**
 * Used to set 'themes' property containing Array of Objects containing theme
 * data from the database into 'GENERAL_CONTAINER' of the redux state.
 * 
 * Note: The purpose of the 'themes' property is to use (e.g. map themes to 
 * buttons in AccountSidebarEditAppearance component) the sort categories 
 * without constantly needing to refetch it from the database.
 * 
 * @param {({ 
 * 	theme_id: number, 
 * 	order_number: number, 
 * 	color: string, 
 * 	marks_default: boolean 
 * }[]|undefined)} state - Current Array of Objects (in the redux state) for theme
 * data
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{ 
 * 	theme_id: number, 
 * 	order_number: number, 
 * 	color: string, 
 * 	marks_default: boolean 
 * }[]} Array of Objects containing theme data from the database
 */
export default function themesReducer(state = initialState, action) {
	switch (action.type) {
		case SET_THEMES:
			return action.themes;
		default:
			return state;
	}
}