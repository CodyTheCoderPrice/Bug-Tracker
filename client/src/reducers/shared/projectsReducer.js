import { SET_PROJECTS } from "../../actions/types";

const initialState = []

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_PROJECTS:
			return action.projects;
		default:
			return state;
	}
}