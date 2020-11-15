import { SET_PRIORITY_STATUS } from "../../actions/constants/types";

const initialState = {
	priorityList: null,
	priorityEmptyId: null,
	statusList: null,
	statusEmptyId: null,
	statusCompletionId: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_PRIORITY_STATUS:
			return {
				priorityList: action.priorityList,
				priorityEmptyId: action.priorityEmptyId,
				statusList: action.statusList,
				statusEmptyId: action.statusEmptyId,
				statusCompletionId: action.statusCompletionId,
			};
		default:
			return state;
	}
}
