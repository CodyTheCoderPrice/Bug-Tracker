import listComponentsDisplayReducer from "../listComponentsDisplayReducer";
import listReducer from "../listReducer";
import searchFilterSortReducer from "../searchFilterSortReducer";
import massDeleteReducer from "../massDeleteReducer";
import priorityStatusOptionsReducer from "../priorityStatusOptionsReducer";

import { BUG_CONTAINER } from "../../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../../actions/constants/types";

// Default state for the bug container (each reducers initial state)
const initialState = {
	// passing 'undefined, {}' causes reducers to return their initial state
	componentsDisplay: listComponentsDisplayReducer(undefined, {}),
	list: listReducer(undefined, {}),
	searchFilterSort: searchFilterSortReducer(undefined, {}),
	massDeleteList: massDeleteReducer(undefined, {}),
	priorityStatusOptions: priorityStatusOptionsReducer(undefined, {}),
};

/**
 * Used to set Object for the bug container of the redux state
 *
 * @param {{
 * 	listView: boolean,
 * 	listViewDeleteModal: boolean,
 * 	listViewCreateItemSidbar: boolean,
 * 	itemView: boolean,
 * 	itemView: boolean,
 * 	itemViewEditItemInfo: boolean,
 * 	itemViewDeleteModal: boolean,
 * 	itemViewCurrentItem: ({
 * 		account_id: number,
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: string,
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		last_edited_timestamp: string
 * 	}|null)
 * }} state - Object containing all current data for the bug container of the
 * redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {{
 * 	listView: boolean,
 * 	listViewDeleteModal: boolean,
 * 	listViewCreateItemSidbar: boolean,
 * 	itemView: boolean,
 * 	itemView: boolean,
 * 	itemViewEditItemInfo: boolean,
 * 	itemViewDeleteModal: boolean,
 * 	itemViewCurrentItem: ({
 * 		account_id: number,
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: string,
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		last_edited_timestamp: string
 * 	}|null)
 * }} Object containing all data for the bug container of the redux state
 */
export function bugContainerReducer(state = initialState, action) {
	switch (action.container) {
		case BUG_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of the redux state to default
			if(action.type === RESET_CONTAINER) {
				return initialState
			} else {
				return {
					componentsDisplay: listComponentsDisplayReducer(
						state.componentsDisplay,
						action
					),
					list: listReducer(state.list, action),
					searchFilterSort: searchFilterSortReducer(
						state.searchFilterSort,
						action
					),
					massDeleteList: massDeleteReducer(state.massDeleteList, action),
					priorityStatusOptions: priorityStatusOptionsReducer(
						state.priorityStatusOptions,
						action
					),
				};
			}
		default:
			return state;
	}
}
