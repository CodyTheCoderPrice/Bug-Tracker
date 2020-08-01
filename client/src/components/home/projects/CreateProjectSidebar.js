import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

import {
	setWhichProjectComponentsDisplay,
	createProject,
	clearInputErrors,
} from "../../../actions";

import {
	getProjectStatusName,
	getProjectStatusIndex,
	getProjectPriorityName,
	getProjectPriorityIndex,
} from "../../../utils/projectsUtils";

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

	const [descriptionCharLimit, setDescriptionCharLimit] = useState(500);

	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	useEffect(() => {
		let descriptionCharCounter = document.getElementsByClassName(
			"js-form__character-counter"
		)[0];

		if (projectInfo.description.length > descriptionCharLimit) {
			descriptionCharCounter.style.color = "red";
		} else {
			descriptionCharCounter.style.color = "black";
		}
	}, [projectInfo.description]);

	const onChange = (e) => {
		if (e.target.name === "status" || e.target.name === "priority") {
			setProjectInfo({
				...projectInfo,
				[e.target.name]: Number(e.target.value),
			});
		} else {
			setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
		}
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
		console.log(projectInfo);
		// clears any prior input errors
		dispatch(clearInputErrors());
		dispatch(createProject(projectInfo));
		setShouldShowAnyErrors(true);
	};

	return (
		<div className="create-projects-component">
			<div className="blurred-background" />
			<div className="sidebar-container">
				<div className="x-button" onClick={closeCreateProjectSidebar}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					<h2 className="title">New Project</h2>
					<form className="form" noValidate onSubmit={handleSubmit}>
						<label className="form__label">Name: </label>
						<input
							type="text"
							name="name"
							onChange={(e) => onChange(e)}
							value={projectInfo.name}
							className="form_text-input"
						/>
						<span className="form__errors">
							{shouldShowAnyErrors ? reduxState.inputErrors.name : ""}
						</span>
						<label className="form__label">Description: </label>
						<label className="form__character-counter js-form__character-counter">
							{projectInfo.description.length + "/" + descriptionCharLimit}
						</label>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							value={projectInfo.description}
							className="form__textarea"
						/>
						<span className="form__errors">
							{shouldShowAnyErrors ? reduxState.inputErrors.description : ""}
						</span>
						<div className="form__combo-box-container form__combo-box-container--left">
							<label className="form__combo-box-container__label">
								Status:{" "}
							</label>
							<select
								name="status"
								onChange={(e) => onChange(e)}
								className="form__combo-box-container__select"
							>
								<option value="0">{getProjectStatusName(0)}</option>
								<option value="1">{getProjectStatusName(1)}</option>
								<option value="2">{getProjectStatusName(2)}</option>
								<option value="3">{getProjectStatusName(3)}</option>
								<option value="4">{getProjectStatusName(4)}</option>
								<option value="5">{getProjectStatusName(5)}</option>
							</select>
						</div>
						<div className="form__combo-box-container form__combo-box-container--right">
							<label className="form__combo-box-container__label">Priority: </label>
							<select
								name="priority"
								onChange={(e) => onChange(e)}
								className="form__combo-box-container__select"
							>
								<option value="0">{getProjectPriorityName(0)}</option>
								<option value="1">{getProjectPriorityName(1)}</option>
								<option value="2">{getProjectPriorityName(2)}</option>
								<option value="3">{getProjectPriorityName(3)}</option>
							</select>
						</div>
						<button type="submit" className="form__submit">
							Create Project
						</button>
						<span className="form__errors">
							{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
							{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
						</span>
					</form>
				</div>
			</div>
		</div>
	);
}
