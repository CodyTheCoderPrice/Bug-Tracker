import projectComponentsDisplayReducer from "../components/projectComponentsDisplayReducer";
import projectsReducer from "../projectsReducer";
import projectsSearchFilterSortReducer from "../search-filter-sort/projectsSearchFilterSortReducer";
import massDeleteReducer from "../massDeleteReducer";

import { PROJECT_CONTAINER } from "../../actions/typeContainer";

const initialState = {
	// (undefined, {type: null}) will cause each function to return their initial state
	componentsDisplay: projectComponentsDisplayReducer(undefined, { type: null }),
	list: projectsReducer(undefined, { type: null }),
	searchFilterSort: projectsSearchFilterSortReducer(undefined, { type: null }),
	massDeleteList: massDeleteReducer(undefined, { type: null }),
};

export default function (state = initialState, action) {
	if (action.container === undefined) {
		return state;
	}
	switch (action.container) {
		case PROJECT_CONTAINER:
			return {
				componentsDisplay: projectComponentsDisplayReducer(
					state.componentsDisplay,
					action
				),
				list: projectsReducer(state.list, action),
				searchFilterSort: projectsSearchFilterSortReducer(
					state.searchFilterSort,
					action
				),
				massDeleteList: massDeleteReducer(state.massDeleteList, action),
			};
		default:
			return state;
	}
}
