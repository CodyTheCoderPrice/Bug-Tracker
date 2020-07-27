import { SET_WHICH_NAVBAR_COMPONENTS_DISPLAY } from "../actions/types";

const initialState = {
	accountDropdown: false,
	projectsList: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_NAVBAR_COMPONENTS_DISPLAY:
			return {
				accountDropdown:  (action.components.accountDropdown !== undefined) ? action.components.accountDropdown : false,
				projectsList: (action.components.projectsList !== undefined) ? action.components.projectsList : false,
			};
		default:
			return state;
	}
}