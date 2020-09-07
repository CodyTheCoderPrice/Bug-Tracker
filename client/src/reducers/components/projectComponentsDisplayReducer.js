import { SET_WHICH_PROJECT_COMPONENTS_DISPLAY } from "../../actions/types";

const initialState = {
	projectsTable: true,
	createProjectSidbar: false,
	viewProjectModal: false,
	editProjectSidebar: false,
	targetProject: null,
	editProjectInfo: false,
	deleteProjectModal: false,
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_PROJECT_COMPONENTS_DISPLAY:
			if (action.reset === true) {
				return initialState;
			} else {
				return {
					projectsTable:
						action.displays.projectsTable !== undefined
							? action.displays.projectsTable
							: false,
					createProjectSidbar:
						action.displays.createProjectSidbar !== undefined
							? action.displays.createProjectSidbar
							: false,
					viewProjectModal:
						action.displays.viewProjectModal !== undefined
							? action.displays.viewProjectModal
							: false,
					editProjectSidebar:
						action.displays.editProjectSidebar !== undefined
							? action.displays.editProjectSidebar
							: false,
					targetProject:
						action.displays.targetProject !== undefined
							? action.displays.targetProject
							: null,
					editProjectInfo:
						action.displays.editProjectInfo !== undefined
							? action.displays.editProjectInfo
							: false,
					deleteProjectModal:
						action.displays.deleteProjectModal !== undefined
							? action.displays.deleteProjectModal
							: false,
				};
			}
		default:
			return state;
	}
}
