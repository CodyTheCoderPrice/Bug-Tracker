import { SET_PROJECTS_SEARCH_FILTER_SORT } from "../../actions/types";

const initialState = {
	searchKeyWordString: "",
	sortByAscending: true,
	sortByType: 2,
	priorityFilter: [1, 2, 3, 4],
	statusFilter: [1, 2, 3, 4, 5, 6],
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_PROJECTS_SEARCH_FILTER_SORT:
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
