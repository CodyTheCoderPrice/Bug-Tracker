import { SET_WHICH_GENERAL_COMPONENTS_DISPLAY } from "../../actions/constants/types";

const initialState = {
	register: false,
	login: true,
	home: false,
	// In general container since value should be the same for projects and bugs
	itemContainerListSidebar: false,
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_GENERAL_COMPONENTS_DISPLAY:
			return {
				register:
					action.displays.register !== undefined
						? action.displays.register
						: false,
				login:
					action.displays.login !== undefined ? action.displays.login : false,
				home: action.displays.home !== undefined ? action.displays.home : false,
				itemContainerListSidebar:
					action.displays.itemContainerListSidebar !== undefined
						? action.displays.itemContainerListSidebar
						: false,
			};
		default:
			return state;
	}
}
