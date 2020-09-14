import axios from "axios";
import { SET_PROJECTS } from "./types";
import { setInputErrors } from "./index";
import { logoutAccount } from "./accountActions";

import { setWhichProjectComponentsDisplay } from "./componentActions";

export const setProjects = (projects) => (dispatch) => {
	dispatch({
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
			dispatch(
				setWhichProjectComponentsDisplay({
					...projectComponentsDisplay,
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

export const deleteProject = (project_id) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/delete", project_id, headers)
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

export const deleteMultipleProjects = (projectsArray) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/project/delete-multiple", projectsArray, headers)
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
