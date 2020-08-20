import { STORE_DISPLAY_SIZES } from "../actions/types";

const initialState = {
	window: null,
	navbar: null,
	scrollbar: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case STORE_DISPLAY_SIZES:
			return {
				window: action.sizes.window,
				navbar: action.sizes.navbar,
				scrollbar: action.sizes.scrollbar,
			};
		default:
			return state;
	}
}