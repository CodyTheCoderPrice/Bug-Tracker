import { SET_AUTHENTICATION } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
	isAuthenticated: false,
	info: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATION:
			return {
				isAuthenticated: !isEmpty(action.payload),
				decodedToken: action.decodedToken,
			};
		default:
			return state;
	}
}
