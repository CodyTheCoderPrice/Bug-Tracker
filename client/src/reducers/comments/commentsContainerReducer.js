import commentsListReducer from "./commentsListReducer";

import { COMMENT_CONTAINER } from "../../actions/constants/containers";
import { RESET_CONTAINER } from "../../actions/constants/types";

const initialState = {
	// (undefined, {}) will cause each function to return their initial state
	list: commentsListReducer(undefined, {}),
};

export function commentContainerReducer(state = initialState, action) {
	switch (action.container) {
		case COMMENT_CONTAINER:
			if(action.type === RESET_CONTAINER) {
				return initialState
			} else {
				return {
					list: commentsListReducer(state.list, action),
				};
			}
		default:
			return state;
	}
}
