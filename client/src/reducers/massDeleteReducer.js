import { SET_MASS_DELETE } from "../actions/types";

const initialState = {
	projects: [],
	bugs: [],
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_MASS_DELETE:
			return {
				projects:
					action.projectsOrBugsArrays.projects !== undefined
						? action.projectsOrBugsArrays.projects
						: [],
				bugs:
					action.projectsOrBugsArrays.bugs !== undefined
						? action.projectsOrBugsArrays.bugs
						: [],
			};
		default:
			return state;
	}
}
