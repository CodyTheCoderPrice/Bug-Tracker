import { SET_DISPLAY_SIZE_VARIABLES } from "../../actions/types";

const initialState = {
	window: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_VARIABLES:
			return {
				window: action.sizes.window,
			};
		default:
			return state;
	}
}