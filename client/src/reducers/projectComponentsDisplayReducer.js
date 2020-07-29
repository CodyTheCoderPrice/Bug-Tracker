import { SET_WHICH_PROJECT_COMPONENTS_DISPLAY } from "../actions/types";

const initialState = {
	projectsList: true,
	createProjectSidbar: false,
	viewProjectModal: false,
	editProjectModal: false,
	targetProject: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_PROJECT_COMPONENTS_DISPLAY:
			return {
				projectsList:
					action.displays.projectsList !== undefined
						? action.displays.projectsList
						: false,
				createProjectSidbar:
					action.displays.createProjectSidbar !== undefined
						? action.displays.createProjectSidbar
						: false,
				viewProjectModal:
					action.displays.viewProjectModal !== undefined
						? action.displays.viewProjectModal
						: false,
				editProjectModal:
					action.displays.editProjectModal !== undefined
						? action.displays.editProjectModal
						: false,
				targetProject:
					action.displays.targetProject !== undefined
						? action.displays.targetProject
						: null,
			};
		default:
			return state;
	}
}
