import listComponentsDisplayReducer from "../listComponentsDisplayReducer";
import listReducer from "../listReducer";
import searchFilterSortReducer from "../searchFilterSortReducer";
import massDeleteReducer from "../massDeleteReducer";
import priorityStatusOptionsReducer from "../priorityStatusOptionsReducer";

import { BUG_CONTAINER } from "../../../actions/typeContainer";

const initialState = {
	// (undefined, {}) will cause each function to return their initial state
	componentsDisplay: listComponentsDisplayReducer(undefined, {}),
	list: listReducer(undefined, {}),
	searchFilterSort: searchFilterSortReducer(undefined, {}),
	massDeleteList: massDeleteReducer(undefined, {}),
	priorityStatusOptions: priorityStatusOptionsReducer(undefined, {}),
};

export function bugContainerReducer(state = initialState, action) {
	switch (action.container) {
		case BUG_CONTAINER:
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
