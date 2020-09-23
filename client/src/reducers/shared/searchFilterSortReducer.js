import { SET_SEARCH_FILTER_SORT } from "../../actions/types";

const initialState = {
	searchKeyWordString: "",
	sortByAscending: true,
	sortByType: 2,
	priorityFilter: [1, 2, 3, 4],
	statusFilter: [1, 2, 3, 4, 5, 6],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_SEARCH_FILTER_SORT:
			return {
				searchKeyWordString: action.searchFilterSort.searchKeyWordString,
				sortByAscending: action.searchFilterSort.sortByAscending,
				sortByType: action.searchFilterSort.sortByType,
				priorityFilter: action.searchFilterSort.priorityFilter,
				statusFilter: action.searchFilterSort.statusFilter,
			};
		default:
			return state;
	}
}
