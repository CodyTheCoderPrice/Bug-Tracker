import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

import { setWhichProjectComponentsDisplay, createProject, clearInputErrors } from "../../../actions";

import "../../../SCSS/projects/createProjectSidebar.scss";

export default function CreateProjectSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		name: "",
		description: "",
		status: 0,
		priority: 0,
		startDate: null,
		dueDate: "",
		completionDate: "",
	});

	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	const onChange = (e) => {
		setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
	};

	const closeCreateProjectSidebar = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				projectsList: reduxState.projectComponentsDisplay.projectsList,
				createProjectSidbar: false,
				viewProjectModal: reduxState.projectComponentsDisplay.viewProjectModal,
				editProjectModal: reduxState.projectComponentsDisplay.editProjectModal,
				targetProject: reduxState.projectComponentsDisplay.targetProject,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// clears any prior input errors
		dispatch(clearInputErrors());
		dispatch(createProject(projectInfo));
		setShouldShowAnyErrors(true);
	};

	return (
		<div>
			<div className="createProjectBlurredBackgroundClickableDiv" />
			<div className="createProjectSidebarContainerDiv">
				<div className="topDiv">
					<label className="titleLabel">New Project</label>
					<div className="closeCreateProjectClickableDiv" onClick={closeCreateProjectSidebar}>
						<i className="fa fa-times" aria-hidden="true"></i>
					</div>
				</div>
				<form className="createProjectForm" noValidate onSubmit={handleSubmit}>
					<label className="inputNameLabel">Name: </label>
					<label className="inputErrorsLabel">
						{shouldShowAnyErrors ? reduxState.inputErrors.name : ""}
					</label>
					<input
						type="text"
						name="name"
						onChange={(e) => onChange(e)}
						value={projectInfo.name}
						placeholder="Name"
						id="projectNameInput"
						className="createProjectTextInput"
					/>
					<label className="inputNameLabel">Description: </label>
					<label className="inputErrorsLabel">
						{shouldShowAnyErrors ? reduxState.inputErrors.description : ""}
					</label>
					<input
						type="text"
						name="description"
						onChange={(e) => onChange(e)}
						value={projectInfo.description}
						placeholder="Description"
						id="projectDescriptionInput"
						className="createProjectTextInput"
					/>
					<label className="inputErrorsLabel">
						{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
					</label>
					<button type="submit" className="submitButton">
						Create Project
					</button>
				</form>
			</div>
		</div>
	);
}
