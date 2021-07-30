import { SET_LIST } from "../../actions/constants/types";

// Initial state for either the list of items (i.e. projects or bugs, but not 
// ...both) (reducer used for PROJECT_CONTAINER and BUG_CONTAINER). Is an empty
// ...array since no account is logged in by default, and even if one was, the 
// ...list of projects or bugs would still need to be retrieved from the database.
const initialState = []

/**
 * Used to set 'list' property containing Array of Objects containing items 
 * (i.e. either projects or bugs, but not both) data belonging to the logged in
 * account from the database into either PROJECT_CONATINER or BUG_CONTAINER 
 * (reducer used for both) of the redux state.
 * 
 * Note: The purpose of the 'list' property is to be used to display (e.g. 
 * display an item in ListViewTableItemRow component) and use (e.g. check if the
 * list is empty to determin whether or not to show the tutorial for creating an
 * item in ListViewTopBar) the list without constantly needing to refetch it 
 * from the database.
 *
 * @param {{
 * 	id: number, 
 * 	account_id: (number|undefined),
 * 	project_id: (number|undefined),
 * 	name: string, 
 * 	description: string, 
 *	location: (string|undefined), 	
 * 	priority_id: number, 
 * 	status_id: number, 
 * 	creation_date: string, 
 * 	start_date: string, 
 * 	due_date: (string|null), 
 * 	completion_date: (string|null), 
 * 	last_edited_timestamp: string, 
 * 	priority_option: string, 
 * 	status_option: string
 * }[]} state - Current Array of Objects (in the redux state) containing either 
 * project or bug (not both) data belonging to the logged in account
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	id: number, 
 * 	account_id: (number|undefined),
 * 	project_id: (number|undefined),
 * 	name: string, 
 * 	description: string, 
 *	location: (string|undefined), 	
 * 	priority_id: number, 
 * 	status_id: number, 
 * 	creation_date: string, 
 * 	start_date: string, 
 * 	due_date: (string|null), 
 * 	completion_date: (string|null), 
 * 	last_edited_timestamp: string, 
 * 	priority_option: string, 
 * 	status_option: string
 * }[]} Array of Objects containing either project or bug (not both) data 
 * belonging to the logged in account from the database
 */
export default function listReducer(state = initialState, action) {
	switch (action.type) {
		case SET_LIST:
			return action.list;
		default:
			return state;
	}
}