import { SET_ACCOUNT_INFO } from "../actions/types";

const initialState = {}

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_INFO:
			return action.payload;
		default:
			return state;
	}
}