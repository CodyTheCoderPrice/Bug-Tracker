import { SET_CURRENT_ACCOUNT } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
	isAuthenticated: false,
	account: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_ACCOUNT:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				account: action.payload,
			};
		default:
			return state;
	}
}
