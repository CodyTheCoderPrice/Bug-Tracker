import { SET_PRIORITY_STATUS } from "../../actions/constants/types";
import { appendHexValueForColorsToStatusList } from "../../utils/colorUtils";

// Default state for either project or bug priority/status data (reducer used by
// ...both containers) from the priority and status tables in the database
const initialState = {
	// Priority table data from the database
	priorityList: null,
	// Which id in the priorityList represent empty
	priorityEmptyId: null,
	// Status table data from the database
	statusList: null,
	// Which id in the statusList represent empty
	statusEmptyId: null,
	// Which id in the statusList represent completion
	statusCompletionId: null,
};

/**
 * Used to set Object containing either the project or bug priority/status data
 * (reducer used by both containers) from the priority and status tables in the
 * database, in either the project or bug container of the redux state
 *
 *
 * @param {Object} state - Object for either the current project or bug 
 * priority/status data (reducer used by both containers) in the redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {Object} Object for either the project or bug priority/status data
 * (reducer used by both containers) to be stored in either the project or bug
 * container of the redux state
 */
export default function priorityStatusOptionsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_PRIORITY_STATUS:
			return {
				priorityList: action.priorityStatusInfo.priorityList,
				priorityEmptyId: action.priorityStatusInfo.priorityEmptyId,
				statusList: appendHexValueForColorsToStatusList(
					action.priorityStatusInfo.statusList
				),
				statusEmptyId: action.priorityStatusInfo.statusEmptyId,
				statusCompletionId: action.priorityStatusInfo.statusCompletionId,
			};
		default:
			return state;
	}
}
