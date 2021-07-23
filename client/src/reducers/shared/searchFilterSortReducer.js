import { SET_SEARCH_FILTER_SORT } from "../../actions/constants/types";

// Initial state for either project or bug search/filter/sort data (reducer 
// ...used for PROJECT_CONTAINER and BUG_CONTAINER)
const initialState = {
	// Words (seperated by space) being searched in search bar to refine which 
	// ...items from list appear.
	searchKeyWordString: "",
	// Should list be sorted in ascending or descending order.
	sortAscending: true,
	// Which sort option is the list currently being sorted by.
	sortId: 2,
	// Which priority options are currently being filtered out of the list. 
	priorityFilter: [],
	// Which status options are currently being filtered out of the list.
	statusFilter: [],
};

/**
 * Used to set 'searchFilterSort' property containing either project or bug
 * search/filter/sort data into either PROJECT_CONATINER or BUG_CONTAINER
 * (reducer used for both) of the redux state.
 * 
 * Note: The purpose of the 'searchFilterSort' property is to be used to dictate
 * how items (projects or bugs) are searched (items appear based on key words), 
 * filtered (items appear based on their priority/status), and sorted (the order
 * in which items appear). This is also used to determin how SortArrowsButton
 * components display.
 *
 * @param {{
 * 	priorityFilter: number[],
 * 	searchKeyWordString: string,
 * 	sortAscending: boolean,
 * 	sortId: number,
 * statusFilter: number[],
 * }} state - Current Object (in the redux state) for either project or bug
 * search/filter/sort data
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	priorityFilter: number[],
 * 	searchKeyWordString: string,
 * 	sortAscending: boolean,
 * 	sortId: number,
 * statusFilter: number[],
 * }} Object containing either project or bug search/filter/sort data
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
