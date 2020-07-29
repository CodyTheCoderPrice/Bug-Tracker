import { SET_WHICH_NAVBAR_COMPONENTS_DISPLAY } from "../actions/types";

const initialState = {
	accountDropdown: false,
	projectsList: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_NAVBAR_COMPONENTS_DISPLAY:
			return {
				accountDropdown:
					action.displays.accountDropdown !== undefined
						? action.displays.accountDropdown
						: false,
				projectsList:
					action.displays.projectsList !== undefined
						? action.displays.projectsList
						: false,
			};
		default:
			return state;
	}
}
