import { SET_WHICH_MASS_DELETE_COMPONENTS_DISPLAY } from "../../actions/types";

const initialState = {
	massDeleteProjectsModal: false,
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_MASS_DELETE_COMPONENTS_DISPLAY:
			return {
				massDeleteProjectsModal:
					action.displays.massDeleteProjectsModal !== undefined
						? action.displays.massDeleteProjectsModal
						: false,
			};
		default:
			return state;
	}
}
