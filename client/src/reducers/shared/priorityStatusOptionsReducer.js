import { SET_PRIORITY_STATUS } from "../../actions/constants/types";
import { appendHexValueForColorsToStatusList } from "../../utils/colorUtils";

// Initial state for either project or bug priority/status data (reducer used for 
// ...'PROJECT_CONTAINER' and 'BUG_CONTAINER'). All values are null since they need 
// ...to be retrieved from the database.
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
 * Used to set 'priorityStatusOptions' property containing either project or bug
 * (not both) priority/status data from priority and status tables in the 
 * database, into either 'PROJECT_CONTAINER' or 'BUG_CONTAINER' (reducer used for
 * both) of the redux state.
 * 
 * Note: The purpose of the 'priorityStatusOptions' property is to be used to 
 * display (e.g. display all prioirty and status options in filter dropdown in
 * ListViewTopBar component) and use (e.g. use status.color to get CSS status 
 * text colors for select elements in ListViewCreateItemSidebar component) the
 * priority/status data without constantly needing to refetch it from the 
 * database.
 *
 * @param {{
 * 	priorityList: ([
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 	]|null),
 * 	priorityEmptyId: (number|null),
 * 	statusList: ([
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 	]|null),
 * 	statusEmptyId: (number|null),
 * 	statusCompletionId: (number|null),
 * }} state - Current Object (in the redux state) for either project or bug 
 * (not both) priority/status data
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	priorityList: ([
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 		{ id: number, option: string },
 * 	]|null),
 * 	priorityEmptyId: (number|null),
 * 	statusList: ([
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 		{ id: number, option: string, color: string },
 * 	]|null),
 * 	statusEmptyId: (number|null),
 * 	statusCompletionId: (number|null),
 * }} Object containing either project or bug (not both) priority/status data
 * from priority and status tables in the database
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
