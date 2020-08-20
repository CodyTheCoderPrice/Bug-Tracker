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
} from "../../../utils/elementUtils";

import { useToggleableDateInputAndTooltip } from "../../../utils/formHookUtils";

import "../../../SCSS/projects/createProjectSidebar.scss";

export default function CreateProjectSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		name: "",
		description: "",
		// Sets default to the first option
		priorityId: reduxState.priorityStatusArrays.projectPriority[0].id,
		statusId: reduxState.priorityStatusArrays.projectStatus[0].id,
		startDate: moment().format("YYYY-MM-DD"),
		dueDate: null,
		completionDate: null,
	});

	const [descriptionCharLimit] = useState(500);
	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	// This custom hook toggles the display of the completion date input based on the project status,
	// ...makes sure the projectInfo completion date is accurate after every toggle by using a proxy completion date,
	// ...toggles when the completion date tooltip is able to be displayed based on the project status,
	// ...adds an event listener to display the tooltip (based on status) when the completion date input element is hovered over.
	const [proxyCompletionDate, setProxyCompletionDate] = useToggleableDateInputAndTooltip(
		projectInfo,
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
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		toggleCharCountColor(
			"js-character-counter",
			projectInfo.description.length,
			descriptionCharLimit
		);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [projectInfo.description]);

	// Keeps the proxyCompletionDate in sync with projectInfo's completonDate 
	// ...after anytime the user selects a completion date
	useEffect(() => {
		setProxyCompletionDate(projectInfo.completionDate);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [projectInfo.completionDate]);

	// Updates projectInfo's completionDate to match the proxyCompletionDate
	// ...after anytime the compltionDate input element has been toggled
	useEffect(() => {
		setProjectInfo({ ...projectInfo, completionDate: proxyCompletionDate });
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
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

	const closeCreateProjectSidebar = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				createProjectSidbar: false
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
			<div className="create-project-sidebar">
				<div className="x-button" onClick={closeCreateProjectSidebar}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					<h1 className="title">New Project</h1>
					<form className="form" noValidate onSubmit={handleSubmit}>
						<label htmlFor="create-project-name" className="form__label">Name: </label>
						<input
							type="text"
							name="name"
							onChange={(e) => onChange(e)}
							value={projectInfo.name}
							id="create-project-name"
							className="form__text-input"
						/>
						<span className="form__errors">
							{shouldShowAnyErrors ? reduxState.inputErrors.name : ""}
						</span>
						<label htmlFor="create-project-description" className="form__label">Description: </label>
						<span className="form__character-counter js-character-counter">
							{projectInfo.description.length + "/" + descriptionCharLimit}
						</span>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							value={projectInfo.description}
							id="create-project-description"
							className="form__textarea"
						/>
						<span className="form__errors">
							{shouldShowAnyErrors ? reduxState.inputErrors.description : ""}
						</span>
						<div className="form__combo-box-container">
							<label htmlFor="create-project-priority" className="form__combo-box-container__label">
								Priority:
							</label>
							<select
								name="priorityId"
								onChange={(e) => onChange(e)}
								id="create-project-priority"
								className="form__combo-box-container__select js-priority-select"
							></select>
							<label htmlFor="create-project-status" className="form__combo-box-container__label">
								Status:
							</label>
							<select
								name="statusId"
								onChange={(e) => onChange(e)}
								id="create-project-status"
								className="form__combo-box-container__select js-status-select"
							></select>
						</div>
						<div className="form__date-container form__date-container--right">
							<label htmlFor="create-project-start-date" className="form__date-container__label">Start Date:</label>
							<input
								type="date"
								name="startDate"
								value={projectInfo.startDate}
								onChange={(e) => onChange(e)}
								id="create-project-start-date"
								className="form__date-container__date-input js-form__date-container__date-input"
							/>
						</div>
						<div className="form__date-container form__date-container--right">
							<label htmlFor="create-project-due-date" className="form__date-container__label">Due Date:</label>
							<input
								type="date"
								name="dueDate"
								onChange={(e) => onChange(e)}
								id="create-project-due-date"
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
							<label htmlFor="create-project-completion-date" className="form__date-container__label">
								Completion Date:
							</label>
							<input
								type="date"
								name="completionDate"
								onChange={(e) => onChange(e)}
								id="create-project-completion-date"
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
