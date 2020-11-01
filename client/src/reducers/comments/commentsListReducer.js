import { SET_COMMENTS } from "../../actions/constants/types";

const initialState = []

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_COMMENTS:
			return action.list;
		default:
			return state;
	}
}