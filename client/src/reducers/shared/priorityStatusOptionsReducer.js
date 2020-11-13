import { SET_PRIORITY_STATUS_OPTIONS } from "../../actions/constants/types";

const initialState = {
	priorityOptions: null,
	priorityEmptyId: null,
	statusOptions: null,
	statusEmptyId: null,
	statusCompletionId: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_PRIORITY_STATUS_OPTIONS:
			return {
				priorityOptions: action.priorityOptions,
				priorityEmptyId: action.priorityEmptyId,
				statusOptions: action.statusOptions,
				statusEmptyId: action.statusEmptyId,
				statusCompletionId: action.statusCompletionId,
			};
		default:
			return state;
	}
}
