import { SET_ACCOUNT } from "../../actions/constants/types";

// Default state for account (empty since no account is logged in by default)
const initialState = {}

/**
 * Used to set Object containing account data from the database in the account
 * container of the redux state
 * 
 * @param {Object} state - Object for the current account data in the redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {Object} Object for an account to be stored in the account container
 * of the redux state
 */
export default function accountReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT:
			return action.account;
		default:
			return state;
	}
}