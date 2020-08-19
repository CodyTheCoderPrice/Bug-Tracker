import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	updateProject,
	clearInputErrors,
} from "../../../actions";

import { formatDateYYYYmmDD } from "../../../utils/dateUtils";

import {
	toggleCharCountColor,
	populateComboBox,
} from "../../../utils/elementUtils";

import { useToggleableDateInputAndTooltip } from "../../../utils/formHookUtils";

import "../../../SCSS/projects/editProjectSidebar.scss";

export default function EditProjectSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		projectId: reduxState.projectComponentsDisplay.targetProject.project_id,
		name: reduxState.projectComponentsDisplay.targetProject.name,
		description: reduxState.projectComponentsDisplay.targetProject.description,
		priorityId: reduxState.projectComponentsDisplay.targetProject.p_priority_id,
		priorityOption: reduxState.projectComponentsDisplay.targetProject.p_priority_option,
		statusId: reduxState.projectComponentsDisplay.targetProject.p_status_id,
		statusOption: reduxState.projectComponentsDisplay.targetProject.p_status_option,
		startDate: formatDateYYYYmmDD(reduxState.projectComponentsDisplay.targetProject.start_date),
		dueDate: formatDateYYYYmmDD(reduxState.projectComponentsDisplay.targetProject.due_date),
		completionDate: formatDateYYYYmmDD(reduxState.projectComponentsDisplay.targetProject.completion_date),
	});

	const [descriptionCharLimit] = useState(500);
	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	// Used by custom hook useToggleableDateInputAndTooltip to update completionDate after a toggle.
	// The reason a proxy is used is so hook can only update completionDate and not the rest of the state.
	const [proxyCompletionDate, setProxyCompletionDate] = useState(
		projectInfo.completionDate
	);

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

	// Keeps the proxyCompletionDate in sync with
	// ...completonDate after the user selects a date
	useEffect(() => {
		setProxyCompletionDate(projectInfo.completionDate);
	}, [projectInfo.completionDate]);

	// Updates completionDate to match the proxyCompletionDate
	// ...after the compltionDate component has been toggled
	useEffect(() => {
		setProjectInfo({ ...projectInfo, completionDate: proxyCompletionDate });
	}, [proxyCompletionDate]);

	const onChange = (e) => {
		// Since select option values are always strings while priority and status take integers
		if (e.target.name === "statusId" || e.target.name === "priorityId") {
			setProjectInfo({
				...projectInfo,
				[e.target.name]: Number(e.target.value),
			});
		} else {
			setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
		}
	};

	const closeEditProjectSidebar = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				editProjectSidebar: false
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(projectInfo);
		// Clears any prior input errors
		dispatch(clearInputErrors());
		dispatch(updateProject(projectInfo));
		setShouldShowAnyErrors(true);
	};

	return (
		<div className="edit-projects-component">
			<div className="blurred-background" />
			<div className="edit-project-sidebar">
				<div className="x-button" onClick={closeEditProjectSidebar}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					<h1 className="title">Edit Project</h1>
					<form className="form" noValidate onSubmit={handleSubmit}>
						<label htmlFor="edit-project-name" className="form__label">Name: </label>
						<input
							type="text"
							name="name"
							onChange={(e) => onChange(e)}
							value={projectInfo.name}
							id="edit-project-name"
							className="form__text-input"
						/>
						<span className="form__errors">
							{shouldShowAnyErrors ? reduxState.inputErrors.name : ""}
						</span>
						<label htmlFor="edit-project-description" className="form__label">Description: </label>
						<span className="form__character-counter js-form__character-counter">
							{projectInfo.description.length + "/" + descriptionCharLimit}
						</span>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							value={projectInfo.description}
							id="edit-project-description"
							className="form__textarea"
						/>
						<span className="form__errors">
							{shouldShowAnyErrors ? reduxState.inputErrors.description : ""}
						</span>
						<div className="form__combo-box-container">
							<label htmlFor="edit-project-priority" className="form__combo-box-container__label">
								Priority:
							</label>
							<select
								name="priorityId"
								value={projectInfo.priorityId}
								onChange={(e) => onChange(e)}
								id="edit-project-priority"
								className="form__combo-box-container__select js-priority-select"
							></select>
							<label htmlFor="edit-project-status" className="form__combo-box-container__label">
								Status:
							</label>
							<select
								name="statusId"
								value={projectInfo.statusId}
								onChange={(e) => onChange(e)}
								id="edit-project-status"
								className="form__combo-box-container__select js-status-select"
							></select>
						</div>
						<div className="form__date-container form__date-container--right">
							<label htmlFor="edit-project-start-date" className="form__date-container__label">Start Date:</label>
							<input
								type="date"
								name="startDate"
								value={projectInfo.startDate}
								onChange={(e) => onChange(e)}
								id="edit-project-start-date"
								className="form__date-container__date-input js-form__date-container__date-input"
							/>
						</div>
						<div className="form__date-container form__date-container--right">
							<label htmlFor="edit-project-due-date" className="form__date-container__label">Due Date:</label>
							<input
								type="date"
								name="dueDate"
								value={projectInfo.dueDate}
								onChange={(e) => onChange(e)}
								id="edit-project-due-date"
								className="form__date-container__date-input"
							/>
						</div>
						<div className="form__tooltip-container js-form__tooltip-container">
							<div className="form__tooltip-container__text-box">
								Set status to "Completed"
							</div>
							<div className="form__tooltip-container__arrow-right" />
						</div>
						<div className="form__date-container form__date-container--right js-form__date-container">
							<label htmlFor="edit-project-completion-date" className="form__date-container__label">
								Completion Date:
							</label>
							<input
								type="date"
								name="completionDate"
								value={projectInfo.completionDate}
								onChange={(e) => onChange(e)}
								id="edit-project-completion-date"
								className="form__date-container__date-input"
							/>
						</div>
						<button type="submit" className="form__submit">
							Edit Project
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
