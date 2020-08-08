import { SET_PRIORITY_STATUS_OPTIONS } from "../actions/types";

const initialState = {
	projectPriorityOptions: null,
	projectStatusOptions: null,
	bugPriorityOptions: null,
	bugStatusOptions: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_PRIORITY_STATUS_OPTIONS:
			return {
				projectPriorityOptions: action.projectPriorityOptions,
				projectStatusOptions: action.projectStatusOptions,
				bugPriorityOptions: action.bugPriorityOptions,
				bugStatusOptions: action.bugStatusOptions,
			};
		default:
			return state;
	}
}
