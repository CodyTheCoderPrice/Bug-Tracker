import axios from "axios";

import { SET_PROJECTS } from "./types";
import { setInputErrors } from "./index";
import { logoutAccount } from "./accountActions";

// Set projects
export const setProjects = (projects) => (dispatch) => {
	dispatch({
		type: SET_PROJECTS,
		projects: projects,
	});
};

// Create project
export const createProject = (projectData) => (dispatch) => {
	axios
		.post("/api/project/create", projectData)
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