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
	toggleCharCountColor,
	populateComboBox,
} from "../../../utils/formUtils";

import { useToggleableDateInputAndTooltip } from "../../../utils/formHookUtils";

import "../../../SCSS/projects/createProjectSidebar.scss";

export default function CreateProjectSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		name: "",
		description: "",
		priorityId: reduxState.priorityStatusArrays.projectPriority[0].id,
		statusId: reduxState.priorityStatusArrays.projectStatus[0].id,
		startDate: moment().format("YYYY-MM-DD"),
		dueDate: null,
		completionDate: null,
	});

	// Used by custom hook for toggleimg completion date in order to seperate concerns
	const [proxyCompletionDate, setProxyCompletionDate] = useState(projectInfo.completionDate);

	const [descriptionCharLimit, setDescriptionCharLimit] = useState(500);

	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	// This custom hook handles all functionality for toggling completion date, 
	// ...making suring the project state for completion date is accurate after a toggle,
	// ...toggling the display of the completion date tooltip,
	// ...and adding the tooltips event listener
	const [] = useToggleableDateInputAndTooltip(
		projectInfo,
		setProxyCompletionDate,
		"js-form__date-container",
		"js-form__tooltip-container",
		reduxState.priorityStatusArrays.projectStatusCompletionIndex
	);

	useEffect(() => {
		populateComboBox(
			"js-priority-select",
			reduxState.priorityStatusArrays.projectPriority
		);
		populateComboBox(
			"js-status-select",
			reduxState.priorityStatusArrays.projectStatus
		);
	}, []);

	useEffect(() => {
		toggleCharCountColor(
			"js-form__character-counter",
			projectInfo.description.length,
			descriptionCharLimit
		);
	}, [projectInfo.description]);

	// Keeps the proxyCompletionDate in sync when the real completonDate has been changed 
	useEffect(() => {
		setProxyCompletionDate(projectInfo.completionDate);
	}, [projectInfo.completionDate]);

	// Updates the real completionDate to match the proxyCompletionDate after the compltionDate component has been toggled
	useEffect(() => {
		setProjectInfo({...projectInfo, completionDate: proxyCompletionDate});
	}, [proxyCompletionDate]);

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
		// Clears any prior input errors
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
						<div className="form__combo-box-container">
							<label className="form__combo-box-container__label">
								Priority:
							</label>
							<select
								name="priority"
								onChange={(e) => onChange(e)}
								className="form__combo-box-container__select js-priority-select"
							>
							</select>
							<label className="form__combo-box-container__label">
								Status:
							</label>
							<select
								name="status"
								onChange={(e) => onChange(e)}
								className="form__combo-box-container__select js-status-select"
							>
							</select>
						</div>
						<div className="form__date-container form__date-container--right">
							<label className="form__date-container__label">Start Date:</label>
							<input
								type="date"
								name="startDate"
								value= {projectInfo.startDate}
								onChange={(e) => onChange(e)}
								className="form__date-container__date-input js-form__date-container__date-input"
							/>
						</div>
						<div className="form__date-container form__date-container--right">
							<label className="form__date-container__label">Due Date:</label>
							<input
								type="date"
								name="dueDate"
								onChange={(e) => onChange(e)}
								className="form__date-container__date-input"
							/>
						</div>
						<div className="form__tooltip-container js-form__tooltip-container">
							<div className="form__tooltip-container__text-box">
								Status not set to "Completed"
							</div>
							<div className="form__tooltip-container__arrow-right" />
						</div>
						<div className="form__date-container form__date-container--right js-form__date-container">
							<label className="form__date-container__label">
								Completion Date:
							</label>
							<input
								type="date"
								name="completionDate"
								onChange={(e) => onChange(e)}
								className="form__date-container__date-input"
							/>
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
