import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/types";

const initialState = {
	home: null,
	scrollbar: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_CONSTANTS:
			return {
				home: action.sizes.home,
				scrollbar: action.sizes.scrollbar,
			};
		default:
			return state;
	}
}