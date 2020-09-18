import { SET_PRIORITY_STATUS_ARRAYS } from "../../actions/types";

const initialState = {
	projectPriority: null,
	projectStatus: null,
	projectStatusCompletionId: null,
	bugPriority: null,
	bugStatus: null,
	bugStatusCompletionId: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_PRIORITY_STATUS_ARRAYS:
			return {
				projectPriority: action.projectPriority,
				projectStatus: action.projectStatus,
				projectStatusCompletionId: action.projectStatusCompletionId,
				bugPriority: action.bugPriority,
				bugStatus: action.bugStatus,
				bugStatusCompletionId: action.bugStatusCompletionId,
			};
		default:
			return state;
	}
}
