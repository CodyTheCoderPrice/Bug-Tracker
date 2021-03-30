import { SET_PRIORITY_STATUS } from "../../actions/constants/types";
import { appendHexValueForColorsToStatusList } from "../../utils/colorUtils";

// Default state for either project or bug priority/status data (reducer used by
// ...both containers) from the priority and status tables in the database
const initialState = {
	priorityList: null,
	priorityEmptyId: null,
	statusList: null,
	statusEmptyId: null,
	statusCompletionId: null,
};

/**
 * Used to set JSON containing either the project or bug priority/status data
 * (reducer used by both containers) from the priority and status tables in the
 * database, in either the project or bug container of the redux state
 *
 *
 * @param {JSON} state - JSON for either the current project or bug 
 * priority/status data (reducer used by both containers) in the redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} JSON for either the project or bug priority/status data
 * (reducer used by both containers) to be stored in either the project or bug
 * container of the redux state
 */
export default function (state = initialState, action) {
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
