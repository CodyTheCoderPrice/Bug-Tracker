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

/* import {
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "../../../../utils/displaySizeUtils"; */

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
		project_id: reduxState.projectComponentsDisplay.targetProject.project_id,
		name: reduxState.projectComponentsDisplay.targetProject.name,
		description: reduxState.projectComponentsDisplay.targetProject.description,
		priority_id: reduxState.projectComponentsDisplay.targetProject.priority_id,
		priorityOption:
			reduxState.projectComponentsDisplay.targetProject.priority_option,
		status_id: reduxState.projectComponentsDisplay.targetProject.status_id,
		statusOption:
			reduxState.projectComponentsDisplay.targetProject.status_option,
		creation_date: formatDateMMddYYYY(
			reduxState.projectComponentsDisplay.targetProject.creation_date
		),
		start_date: formatDateYYYYmmDD(
			reduxState.projectComponentsDisplay.targetProject.start_date
		),
		due_date: formatDateYYYYmmDD(
			reduxState.projectComponentsDisplay.targetProject.due_date
		),
		completion_date: formatDateYYYYmmDD(
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
			projectInfo.priority_id
		);
		populateComboBox(
			"js-project-status-select",
			reduxState.priorityStatusArrays.projectStatus,
			projectInfo.status_id
		);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	// Adjust description text area size to match DisplayProjectInfo's description
	useEffect(() => {
		let editDescriptionTextArea = document.getElementsByClassName(
			"js-projects-description-text-area"
		)[0];

		const myObserver = new ResizeObserver(() => {
			editDescriptionTextArea.style.height = "0px";
			editDescriptionTextArea.style.height =
				editDescriptionTextArea.scrollHeight + 10 + "px";
		});

		myObserver.observe(document.getElementsByClassName("js-projects-description-project-box")[0]);
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
			projectInfo.status_id !==
			reduxState.priorityStatusArrays.projectStatusCompletionIndex
		) {
			setProjectInfo({ ...projectInfo, completion_date: "" });
		} else {
			setProjectInfo({
				...projectInfo,
				completion_date: preservedCompletionDate,
			});
		}
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [projectInfo.status_id]);

	const onChange = (e) => {
		// Since select option values are always strings while priority and status take integers
		if (e.target.name === "status_id" || e.target.name === "priority_id") {
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
		<form noValidate onSubmit={handleSubmit} className="js-edit-project-form">
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
					Created on: {projectInfo.creation_date}
				</div>
			</div>
			<div className="outer-dividing-container">
				<div className="project-box js-projects-description-project-box">
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
						className="project-box__form-textarea js-projects-description-text-area"
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
								name="start_date"
								value={projectInfo.start_date}
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
								name="due_date"
								value={projectInfo.due_date}
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
								name="completion_date"
								value={projectInfo.completion_date}
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
								name="priority_id"
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
								name="status_id"
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
