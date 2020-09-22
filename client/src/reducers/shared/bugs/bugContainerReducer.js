import priorityStatusOptionsReducer from "../priorityStatusOptionsReducer";

import { BUG_CONTAINER } from "../../../actions/typeContainer";

const initialState = {
	// (undefined, {type: null}) will cause each function to return their initial state
	priorityStatusOptions: priorityStatusOptionsReducer(undefined, { type: null }),
};

export function bugContainerReducer(state = initialState, action) {
	switch (action.container) {
		case BUG_CONTAINER:
			return {
				priorityStatusOptions: priorityStatusOptionsReducer(
					state.priorityStatusOptions,
					action
				),
			};
		default:
			return state;
	}
}
