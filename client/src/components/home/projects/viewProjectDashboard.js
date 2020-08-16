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
} from "../../../utils/formUtils";

import { useToggleableDateInputAndTooltip } from "../../../utils/formHookUtils";

import "../../../SCSS/projects/viewProjectDashboard.scss";

export default function ViewProjectDashboard() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		projectId: reduxState.projectComponentsDisplay.targetProject.project_id,
		name: reduxState.projectComponentsDisplay.targetProject.name,
		description: reduxState.projectComponentsDisplay.targetProject.description,
		priorityId: reduxState.projectComponentsDisplay.targetProject.p_priority_id,
		priorityOption:
			reduxState.projectComponentsDisplay.targetProject.p_priority_option,
		statusId: reduxState.projectComponentsDisplay.targetProject.p_status_id,
		statusOption:
			reduxState.projectComponentsDisplay.targetProject.p_status_option,
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

	const closeViewProjectDashboard = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				viewProjectDashboard: false,
			})
		);
	};

	return (
		<div className="view-projects-component">
			<div className="blurred-background" />
			<div className="edit-project-sidebar">
				<div className="x-button" onClick={closeViewProjectDashboard}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					<h1 className="title">Project Info</h1>
					<div className="name-container">
						<span className="name-container__title"></span>
						<p className="name-container__content">{projectInfo.name}</p>
					</div>
					<div className="description-container">
						<span className="description-container__title"></span>
						<p className="description-container__content">{projectInfo.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
