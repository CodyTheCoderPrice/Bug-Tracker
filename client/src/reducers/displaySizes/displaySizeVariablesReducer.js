import { SET_DISPLAY_SIZE_VARIABLES } from "../../actions/types";

const initialState = {
	window: null,
	navbar: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_VARIABLES:
			return {
				window: action.sizes.window,
				navbar: action.sizes.navbar,
			};
		default:
			return state;
	}
}