import { SET_LIST } from "../../actions/constants/types";

// Default state for either the project or bug list (reducer used by both
// ..containers). Empty array since if the account has any projects/bugs, they
// ...are retrieved only during and after login.
const initialState = []

/**
 * Used to set array of Objects containing either the account's project or bug
 * list (reducer used by both containers) from the database in either the 
 * project or bug container of the redux state
 *
 * @param {{
 * 	id: number, 
 * 	project_id: number, 
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
 * }[]} state - Array of Objects for either the current project or bug list 
 * (reducer used by both containers) in the redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {{
 * 	id: number, 
 * 	project_id: number, 
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
 * }[]} Array of Objects for either the project or bug list (reducer used by 
 * both containers) to be stored in either the project or bug container of 
 * the redux state
 */
export default function listReducer(state = initialState, action) {
	switch (action.type) {
		case SET_LIST:
			return action.list;
		default:
			return state;
	}
}