import { SET_MASS_DELETE_LIST } from "../../actions/constants/types";

const initialState = [];

// Ternary operator is used to reset the list if passed undefined
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_MASS_DELETE_LIST:
			return action.list !== undefined ? action.list : [];
		default:
			return state;
	}
}
