import { SET_COMMENTS } from "../../actions/constants/types";

// Default state for comment list (empty array since if the account has any
// ...comments, they are retrieved only during and after login)
const initialState = []

/**
 * Used to set array of Objects containing the account's comment list from the
 * database in the comment container of the redux state
 * 
 * @param {({ 
 * 	id: number, 
 * 	bug_id: number, 
 * 	description: string,
 * 	creation_date: string, 
 * 	last_edited_timestamp: string
 * }[] | [])} state - array of Objects for the current comments list in the 
 * redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {({ 
 * 	id: number, 
 * 	bug_id: number, 
 * 	description: string,
 * 	creation_date: string, 
 * 	last_edited_timestamp: string
 * }[] | [])} array of Objects for the comment list to be stored in the comment
 * container of the redux state
 */
export default function commentsListReducer(state = initialState, action) {
	switch (action.type) {
		case SET_COMMENTS:
			return action.list;
		default:
			return state;
	}
}