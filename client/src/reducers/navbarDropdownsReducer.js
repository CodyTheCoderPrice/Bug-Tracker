import { SET_NAVBAR_DROPDOWN_COMPONENTS } from "../actions/types";

const initialState = {
	accountDropdown: null,
	projectsDropdown: null,
	bugsDropdown: null,
	currentBug: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_NAVBAR_DROPDOWN_COMPONENTS:
			return {
				accountDropdown: action.components.accountDropdown,
				projectsDropdown: action.components.projectsDropdown,
				bugsDropdown: action.components.bugsDropdown,
				currentBug: action.components.currentBug,
			};
		default:
			return state;
	}
}