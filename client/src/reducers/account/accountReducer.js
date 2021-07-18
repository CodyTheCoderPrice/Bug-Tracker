import { SET_ACCOUNT } from "../../actions/constants/types";

// Initial state for account (empty since no account is logged in by default)
const initialState = {}

/**
 * Used to set 'accountInfo' property containing the logged in account's data 
 * from the database into ACCOUNT_CONTAINER of the redux state
 * 
 * @param {({ 
 * 	account_id: number, 
 * 	email: string, 
 * 	first_name: string, 
 * 	last_name: string, 
 * 	join_date: string, 
 * 	last_edited_timestamp: string 
 * } | {})} state - Current Object (in the redux state) for the logged in 
 * account's data
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {({ 
 * 	account_id: number, 
 * 	email: string, 
 * 	first_name: string, 
 * 	last_name: string, 
 * 	join_date: string, 
 * 	last_edited_timestamp: string 
 * } | {})} Object containing the logged in account's data from the database
 */
export default function accountReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT:
			return action.account;
		default:
			return state;
	}
}