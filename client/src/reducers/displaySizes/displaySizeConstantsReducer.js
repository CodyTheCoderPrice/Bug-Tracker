import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/types";
import { bindActionCreators } from "redux";

const initialState = {
	scrollbar: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_CONSTANTS:
			return {
				scrollbar: action.sizes.scrollbar,
			};
		default:
			return state;
	}
}