import { SET_ACCOUNT_INFO } from "../actions/types";

const initialState = {
	info: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_INFO:
			return {
				...state,
				info: action.payload,
			};
		default:
			return state;
	}
}