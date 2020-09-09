import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	updateProject,
	clearInputErrors,
} from "../../../../actions";

import {
	formatDateMMddYYYY,
	formatDateYYYYmmDD,
} from "../../../../utils/dateUtils";

import {
	toggleCharCountColor,
	populateComboBox,
} from "../../../../utils/elementUtils";

import { useToggleableDateInput } from "../../../../utils/formHookUtils";

import "../../../../SCSS/projects/view-edit-delete/editProjectInfo.scss";

export default function EditProjectInfo() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		projectId: reduxState.projectComponentsDisplay.targetProject.project_id,
		name: reduxState.projectComponentsDisplay.targetProject.name,
		description: reduxState.projectComponentsDisplay.targetProject.description,
		priorityId: reduxState.projectComponentsDisplay.targetProject.priority_id,
		priorityOption:
			reduxState.projectComponentsDisplay.targetProject.priority_option,
		statusId: reduxState.projectComponentsDisplay.targetProject.status_id,
		statusOption:
			reduxState.projectComponentsDisplay.targetProject.status_option,
		creationDate: formatDateMMddYYYY(
			reduxState.projectComponentsDisplay.targetProject.creation_content
		),
		startDate: formatDateYYYYmmDD(
			reduxState.projectComponentsDisplay.targetProject.start_date
		),
		dueDate: formatDateYYYYmmDD(
			reduxState.projectComponentsDisplay.targetProject.due_date
		),
		completionDate: formatDateYYYYmmDD(
			reduxState.projectComponentsDisplay.targetProject.completion_date
		),
	});

	const [descriptionCharLimit] = useState(500);

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	// Custom hook toggles the display of the date input for completion date
	// ...based on status and makes sure projectInfo contains accurate 
	// ...completion date info after every toggle
	const [preservedCompletionDate] = useToggleableDateInput(
		projectInfo,
		"js-completion-date-container",
		reduxState.priorityStatusArrays.projectStatusCompletionIndex
	);

	useEffect(() => {
		populateComboBox(
			"js-project-priority-select",
			reduxState.priorityStatusArrays.projectPriority,
			projectInfo.priorityId
		);
		populateComboBox(
			"js-project-status-select",
			reduxState.priorityStatusArrays.projectStatus,
			projectInfo.statusId
		);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		toggleCharCountColor(
			"js-project-character-counter",
			projectInfo.description.length,
			descriptionCharLimit
		);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [projectInfo.description]);

	useEffect(() => {
		if (
			projectInfo.statusId !==
			reduxState.priorityStatusArrays.projectStatusCompletionIndex
		) {
			setProjectInfo({ ...projectInfo, completionDate: "" });
		} else {
			setProjectInfo({
				...projectInfo,
				completionDate: preservedCompletionDate,
			});
		}
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [projectInfo.statusId]);

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

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateProject(projectInfo, reduxState.projectComponentsDisplay));
	};

	const switchToDisplayProjectInfo = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				editProjectInfo: false,
			})
		);
	};

	return (
		<form noValidate onSubmit={handleSubmit}>
			<div className="outer-dividing-container">
				<div className="centering-container">
					<input
						type="text"
						name="name"
						onChange={(e) => onChange(e)}
						value={projectInfo.name}
						id="edit-project-name"
						className="centering-container__form-name-input"
					/>
					<span className="form-errors form-errors--test">
						{reduxState.inputErrors.name}
					</span>
				</div>
				<div className="project-creation-date">
					Created on: {projectInfo.creationDate}
				</div>
			</div>
			<div className="outer-dividing-container">
				<div className="project-box project-box--smaller-padding">
					<label htmlFor="edit-project-description">
						<h2 className="project-box__title project-box__title--no-bottom-margin">
							Description
						</h2>
					</label>
					<span className="project-box__form-character-counter js-project-character-counter">
						{projectInfo.description.length + "/" + descriptionCharLimit}
					</span>
					<textarea
						name="description"
						onChange={(e) => onChange(e)}
						value={projectInfo.description}
						id="edit-project-description"
						className="project-box__form-textarea"
					/>
					<span className="form-errors">
						{reduxState.inputErrors.description}
					</span>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container--fixed-width-for-info">
				<div className="project-box">
					<h2 className="project-box__title">Info</h2>
					<div className="project-box__group">
						<div className="project-box__group__field">
							<label
								htmlFor="edit-project-start-date"
								className="project-box__group__field__form-label project-box__group__field__form-label--medium-width"
							>
								Start Date:
							</label>
							<input
								type="date"
								name="startDate"
								value={projectInfo.startDate}
								onChange={(e) => onChange(e)}
								id="edit-project-start-date"
								className="project-box__group__field__form-date"
							/>
						</div>
						<div className="project-box__group__field">
							<label
								htmlFor="edit-project-due-date"
								className="project-box__group__field__form-label project-box__group__field__form-label--medium-width"
							>
								Due Date:
							</label>
							<input
								type="date"
								name="dueDate"
								value={projectInfo.dueDate}
								onChange={(e) => onChange(e)}
								id="edit-project-due-date"
								className="project-box__group__field__form-date"
							/>
						</div>
						<div className="project-box__group__field project-box__group__field--no-bottom-margin project-box__group__field--inline-flex js-completion-date-container">
							<label
								htmlFor="edit-project-completion-date"
								className="project-box__group__field__form-label project-box__group__field__form-label--long-width"
							>
								Completed on:
							</label>
							<input
								type="date"
								name="completionDate"
								value={projectInfo.completionDate}
								onChange={(e) => onChange(e)}
								id="edit-project-completion-date"
								className="project-box__group__field__form-date"
							/>
						</div>
					</div>
					<div className="project-box__group project-box__group--right">
						<div className="project-box__group__field">
							<label
								htmlFor="edit-project-priority"
								className="project-box__group__field__form-label"
							>
								Priority:
							</label>
							<select
								name="priorityId"
								onChange={(e) => onChange(e)}
								id="edit-project-priority"
								className="project-box__group__field__form-select js-project-priority-select"
							></select>
						</div>
						<div className="project-box__group__field">
							<label
								htmlFor="edit-project-status"
								className="project-box__group__field__form-label"
							>
								Status:
							</label>
							<select
								name="statusId"
								onChange={(e) => onChange(e)}
								id="edit-project-status"
								className="project-box__group__field__form-select js-project-status-select"
							></select>
						</div>
					</div>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container--one-third">
				<div className="project-box">
					<h2 className="project-box__title">Status of Bugs</h2>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container--one-third">
				<div className="project-box">
					<h2 className="project-box__title">Last Five Bugs</h2>
				</div>
			</div>
			<div className="outer-dividing-container">
				<div className="form-buttons-outer-container">
					<div className="form-buttons-centered-container">
						<button
							type="submit"
							className="form-buttons-centered-container__submit-button"
						>
							Edit Project
						</button>
						<div
							className="form-buttons-centered-container__cancel-button"
							onClick={switchToDisplayProjectInfo}
						>
							Cancel
						</div>
					</div>
				</div>
				<div className="bottom-form-errors-container">
					<span className="form-errors">
						{reduxState.inputErrors.validation}
						{reduxState.inputErrors.server}
					</span>
				</div>
			</div>
		</form>
	);
}
