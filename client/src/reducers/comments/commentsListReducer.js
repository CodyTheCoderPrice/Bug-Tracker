import { SET_COMMENTS } from "../../actions/constants/types";

// Initial state for comment list (empty array since if the account has any
// ...comments, they are retrieved only during and after login)
const initialState = []

/**
 * Used to set 'list' Array of propertys containing comment data belonging to the
 * logged in account from the database into COMMENT_CONTAINER of the redux
 * state
 * 
 * @param {{ 
 * 	id: number, 
 * 	bug_id: number, 
 * 	description: string,
 * 	creation_date: string, 
 * 	last_edited_timestamp: string
 * }[]} state - Current Array of Objects (in the redux state) containing 
 * comment data belonging to the logged in account
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{ 
 * 	id: number, 
 * 	bug_id: number, 
 * 	description: string,
 * 	creation_date: string, 
 * 	last_edited_timestamp: string
 * }[]} Array of Objects containing comment data belonging to the logged in 
 * account from the database
 */
export default function commentsListReducer(state = initialState, action) {
	switch (action.type) {
		case SET_COMMENTS:
			return action.list;
		default:
			return state;
	}
}