import { SET_PRIORITY_STATUS_OPTIONS } from "../../actions/types";

const initialState = {
	priorityOptions: null,
	statusOptions: null,
	statusCompletionId: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_PRIORITY_STATUS_OPTIONS:
			return {
				priorityOptions: action.priorityOptions,
				statusOptions: action.statusOptions,
				statusCompletionId: action.statusCompletionId,
			};
		default:
			return state;
	}
}
