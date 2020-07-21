import { SET_INPUT_ERRORS } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_INPUT_ERRORS:
			return action.inputErrors;
		default:
			return state;
	}
}
