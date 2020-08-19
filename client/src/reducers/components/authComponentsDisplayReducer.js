import { SET_WHICH_AUTH_COMPONENTS_DISPLAY } from "../../actions/types";

const initialState = {
	register: false,
	login: true,
	home: false,
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_AUTH_COMPONENTS_DISPLAY:
			return {
				register:
					action.displays.register !== undefined
						? action.displays.register
						: false,
				login:
					action.displays.login !== undefined
						? action.displays.login
						: false,
				home:
					action.displays.home !== undefined
						? action.displays.home
						: false,
			};
		default:
			return state;
	}
}
