import { SET_AUTHENTICATION } from "../../actions/constants/types";
const isEmpty = require("is-empty");

const initialState = {
	isAuthenticated: false,
	info: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATION:
			return {
				isAuthenticated: !isEmpty(action.decodedToken),
				decodedToken: action.decodedToken,
			};
		default:
			return state;
	}
}
