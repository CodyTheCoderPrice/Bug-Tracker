import { SET_PRIORITY_STATUS } from "../../actions/constants/types";
import { appendHexValueForColor } from "../../utils/colorUtils";

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
				priorityList: action.priorityStatusInfo.priorityList,
				priorityEmptyId: action.priorityStatusInfo.priorityEmptyId,
				statusList: appendHexValueForColor(
					action.priorityStatusInfo.statusList
				),
				statusEmptyId: action.priorityStatusInfo.statusEmptyId,
				statusCompletionId: action.priorityStatusInfo.statusCompletionId,
			};
		default:
			return state;
	}
}
