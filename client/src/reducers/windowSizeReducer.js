import { STORE_WINDOW_SIZE } from "../actions/types";

const initialState = {
	height: null,
	width: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case STORE_WINDOW_SIZE:
			return {
				height: action.size.height,
				width: action.size.width,
			};
		default:
			return state;
	}
}