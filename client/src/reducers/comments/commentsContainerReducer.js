import commentsComponentsDisplayReducer from "./commentsComponentsDisplayReducer";
import commentsListReducer from "./commentsListReducer";

import { COMMENT_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";

const initialState = {
	// (undefined, {}) will cause each function to return their initial state
	componentsDisplay: commentsComponentsDisplayReducer(undefined, {}),
	list: commentsListReducer(undefined, {}),
};

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
