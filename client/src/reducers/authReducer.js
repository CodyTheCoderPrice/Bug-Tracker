import { SET_AUTH_TOKEN } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
	isAuthenticated: false,
	info: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_AUTH_TOKEN:
			return {
				isAuthenticated: !isEmpty(action.payload),
				info: action.payload,
			};
		default:
			return state;
	}
}
