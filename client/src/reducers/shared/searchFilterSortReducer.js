import { SET_SEARCH_FILTER_SORT } from "../../actions/constants/types";

const initialState = {
	searchKeyWordString: "",
	sortAscending: true,
	sortId: 2,
	priorityFilter: [],
	statusFilter: [],
};

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
