import { SET_COMMENTS } from "../../actions/constants/types";

// Default state for comment list (empty array since if the account has any
// ...comments, they are retrieved after login)
const initialState = []

/**
 * Used to set JSON containing the account's comment list from the database
 * in the comment container of the redux state for which
 * 
 *
 * @param {JSON} state - JSON for the current comments list in the redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} - JSON for a comment list to be stored in the comment
 * container of the redux state
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_COMMENTS:
			return action.list;
		default:
			return state;
	}
}