import { SET_SEARCH_FILTER_SORT } from "../../actions/constants/types";

// Default state for either the project or bug search/filter/sort data (reducer
// ...used by both containers)
const initialState = {
	searchKeyWordString: "",
	sortAscending: true,
	sortId: 2,
	priorityFilter: [],
	statusFilter: [],
};

/**
 * Used to set JSON containing either the project or bug search/filter/sort
 * data (reducer used by both containers) in either the project or bug
 * container of the redux state
 *
 *
 * @param {JSON} state - JSON for either the current project or bug 
 * search/filter/sort data (reducer used by both containers) in the redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} - JSON for either the project or bug search/filter/sort data
 * (reducer used by both containers) to be stored in either the project or bug
 * container of the redux state
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_SEARCH_FILTER_SORT:
			return {
				searchKeyWordString: action.searchFilterSort.searchKeyWordString,
				sortAscending: action.searchFilterSort.sortAscending,
				sortId: action.searchFilterSort.sortId,
				priorityFilter: action.searchFilterSort.priorityFilter,
				statusFilter: action.searchFilterSort.statusFilter,
			};
		default:
			return state;
	}
}
