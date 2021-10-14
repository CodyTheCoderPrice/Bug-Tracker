import { COMMENT_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";
// Other reducers used by this reducer
import commentsComponentsDisplayReducer from "./commentsComponentsDisplayReducer";
import commentsListReducer from "./commentsListReducer";

const initialState = {
	// Passing undefined and {} causes reducers to return their initial state
	componentsDisplay: commentsComponentsDisplayReducer(undefined, {}),
	list: commentsListReducer(undefined, {}),
};

/**
 * Used to set 'COMMENT_CONTAINER' Object of the redux state.
 *
 * Note: The purpose of this reducer is to be used by combineReducers function 
 * in store.js file to have properties relating to comments seperated into their
 * own Object of the redux state for organizational purposes.
 * 
 * @param {Object} state - Current 'COMMENT_CONTAINER' Object in the redux state
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {Object} Updated 'COMMENT_CONTAINER' Object for the redux state
 */
export function commentContainerReducer(state = initialState, action) {
	switch (action.container) {
		case COMMENT_CONTAINER:
			if (action.type === RESET_CONTAINER) {
				return initialState;
			} else {
				return {
					componentsDisplay: commentsComponentsDisplayReducer(
						state.componentsDisplay,
						action
					),
					list: commentsListReducer(state.list, action),
				};
			}
		default:
			return state;
	}
}
