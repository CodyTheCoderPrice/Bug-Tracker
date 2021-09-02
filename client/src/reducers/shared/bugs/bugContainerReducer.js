import { BUG_CONTAINER } from "../../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../../actions/constants/types";
// Other reducers used by this reducer
import listComponentsDisplayReducer from "../listComponentsDisplayReducer";
import listReducer from "../listReducer";
import searchFilterSortReducer from "../searchFilterSortReducer";
import massDeleteReducer from "../massDeleteReducer";
import priorityStatusOptionsReducer from "../priorityStatusOptionsReducer";

// Initial state for 'BUG_CONTAINER' of the redux state
const initialState = {
	// Passing 'undefined, {}' causes reducers to return their initial state
	componentsDisplay: listComponentsDisplayReducer(undefined, {}),
	list: listReducer(undefined, {}),
	searchFilterSort: searchFilterSortReducer(undefined, {}),
	massDeleteList: massDeleteReducer(undefined, {}),
	priorityStatusOptions: priorityStatusOptionsReducer(undefined, {}),
};

/**
 * Used to set 'BUG_CONTAINER' property of the redux state.
 * 
 * Note: This container reducer uses the same reducers as the 'PROJECT_CONTAINER'.
 * This is because both containers have 99% overlap, the only difference being
 * the default value for 'listView' property in 'componentsDisplay' property's 
 * Object of this container should be false.
 * 
 * Note: The purpose of this reducer is to be used by combineReducers function 
 * in store.js to have properties relating to bugs seperated into their own
 * Object of the redux state for organizational purposes.
 *
 * @param {Object} state - Current 'BUG_CONTAINER' Object in the redux state
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {Object} Object containing all data for 'BUG_CONTAINER' of the redux
 * state
 */
export function bugContainerReducer(state = initialState, action) {
	switch (action.container) {
		case BUG_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of redux state containers to their initial state
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
