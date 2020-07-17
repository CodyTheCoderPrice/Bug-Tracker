import { AUTHENTICATE_ACCOUNT } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
	isAuthenticated: false,
	info: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case AUTHENTICATE_ACCOUNT:
			return {
				isAuthenticated: !isEmpty(action.payload),
				info: action.payload,
			};
		default:
			return state;
	}
}
