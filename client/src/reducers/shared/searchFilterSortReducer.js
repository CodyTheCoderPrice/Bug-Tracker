import { SET_SEARCH_FILTER_SORT } from "../../actions/constants/types";

// Default state for either the project or bug search/filter/sort data (reducer
// ...used by both containers)
const initialState = {
	// Words being searched in the search bar
	searchKeyWordString: "",
	// Should list be sorted in ascending order (or descending order)
	sortAscending: true,
	// Which sort option is the list currently being sorted by
	sortId: 2,
	// Which priority options are currently being filtered out of the list
	priorityFilter: [],
	// Which status options are currently being filtered out of the list
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
 * @returns {JSON} JSON for either the project or bug search/filter/sort data
 * (reducer used by both containers) to be stored in either the project or bug
 * container of the redux state
 */
export default function searchFilterSortReducer(state = initialState, action) {
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
