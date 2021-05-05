import { SET_COMMENTS } from "../../actions/constants/types";

// Default state for comment list (empty array since if the account has any
// ...comments, they are retrieved only during and after login)
const initialState = []

/**
 * Used to set Object containing the account's comment list from the database
 * in the comment container of the redux state
 * 
 *
 * @param {Object} state - Object for the current comments list in the redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {Object} Object for the comment list to be stored in the comment
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