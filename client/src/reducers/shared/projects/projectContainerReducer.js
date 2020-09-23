import listComponentsDisplayReducer from "../listComponentsDisplayReducer";
import listReducer from "../listReducer";
import searchFilterSortReducer from "../searchFilterSortReducer";
import massDeleteReducer from "../massDeleteReducer";
import priorityStatusOptionsReducer from "../priorityStatusOptionsReducer";

import { PROJECT_CONTAINER } from "../../../actions/typeContainer";

const initialState = {
	// (undefined, {type: null}) will cause each function to return their initial state
	componentsDisplay: listComponentsDisplayReducer(undefined, { type: null }),
	list: listReducer(undefined, { type: null }),
	searchFilterSort: searchFilterSortReducer(undefined, { type: null }),
	massDeleteList: massDeleteReducer(undefined, { type: null }),
	priorityStatusOptions: priorityStatusOptionsReducer(undefined, { type: null }),
};

export function projectContainerReducer(state = initialState, action) {
	switch (action.container) {
		case PROJECT_CONTAINER:
			return {
				componentsDisplay: listComponentsDisplayReducer(
					state.componentsDisplay,
					action
				),
				list: listReducer(state.list, action),
				searchFilterSort: searchFilterSortReducer(
					state.searchFilterSort,
					action
				),
				massDeleteList: massDeleteReducer(state.massDeleteList, action),
				priorityStatusOptions: priorityStatusOptionsReducer(
					state.priorityStatusOptions,
					action
				),
			};
		default:
			return state;
	}
}
