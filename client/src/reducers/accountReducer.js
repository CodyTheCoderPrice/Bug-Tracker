import { SET_ACCOUNT } from "../actions/types";

const initialState = {}

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT:
			return action.account;
		default:
			return state;
	}
}