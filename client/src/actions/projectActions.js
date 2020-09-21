import axios from "axios";
import { PROJECT_CONTAINER } from "./typeContainer";
import { SET_PROJECTS } from "./types";
import { setInputErrors } from "./index";
import { logoutAccount } from "./accountActions";
import { setWhichProjectComponentsDisplay } from "./componentActions";
import { setProjectOrBugMassDeleteList } from "./switchActions";

export const setProjects = (projects) => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: SET_PROJECTS,
		projects: projects,
	});
};

export const createProject = (projectInfo) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/create", projectInfo, headers)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
			dispatch(setWhichProjectComponentsDisplay({ projectsTable: true }));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const retrieveProjects = () => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/retrieve", null, headers)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const updateProject = (projectInfo, projectComponentsDisplay) => (
	dispatch
) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/update", projectInfo, headers)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
			// Done here so components only changes when update is succesful
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
					// Set redux target project to match project update on server side
					targetProject: projects.filter((project) => {
						return project.project_id === projectInfo.project_id;
					})[0],
					editProjectInfo: false,
				})
			);
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const deleteProject = (
	project_id,
	massDeleteList,
	indexOfTargetProjectId
) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/delete", project_id, headers)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
			// Done here so following code only runs if deletion is succesful
			if (indexOfTargetProjectId > -1) {
				massDeleteList.splice(indexOfTargetProjectId, 1);
				dispatch(
					setProjectOrBugMassDeleteList("projectContainer", massDeleteList)
				);
			}
			dispatch(
				setWhichProjectComponentsDisplay({
					projectsTable: true,
				})
			);
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const deleteMultipleProjects = (projectsArray, projectComponentsDisplay) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/delete-multiple", projectsArray, headers)
		.then((res) => {
			const { projects } = res.data;
			dispatch(setProjects(projects));
			// Done here so following code only runs if deletion is succesful
			dispatch(setProjectOrBugMassDeleteList("projectContainer", []));
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
					massDeleteProjectsModal: false,
				})
			);
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};
