import { SET_PRIORITY_STATUS_ARRAYS } from "../actions/types";

const initialState = {
	projectPriority: null,
	projectStatus: null,
	projectStatusCompletionIndex: null,
	bugPriority: null,
	bugStatus: null,
	bugStatusCompletionIndex: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_PRIORITY_STATUS_ARRAYS:
			return {
				projectPriority: action.projectPriority,
				projectStatus: action.projectStatus,
				projectStatusCompletionIndex: action.projectStatusCompletionIndex,
				bugPriority: action.bugPriority,
				bugStatus: action.bugStatus,
				bugStatusCompletionIndex: action.bugStatusCompletionIndex,
			};
		default:
			return state;
	}
}
