import React, { useState } from "react";
import { useSelector } from "react-redux";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/viewItemModalDisplayInfo.scss";

export default function ViewItemModalDisplayInfo() {
	const reduxState = useSelector((state) => state);

	const [projectInfo] = useState({
		project_id: reduxState.projectContainer.componentsDisplay.targetItem.project_id,
		name: reduxState.projectContainer.componentsDisplay.targetItem.name,
		description: reduxState.projectContainer.componentsDisplay.targetItem.description,
		priority_id: reduxState.projectContainer.componentsDisplay.targetItem.priority_id,
		priorityOption:
			reduxState.projectContainer.componentsDisplay.targetItem.priority_option,
		status_id: reduxState.projectContainer.componentsDisplay.targetItem.status_id,
		statusOption:
			reduxState.projectContainer.componentsDisplay.targetItem.status_option,
		creation_date: formatDateMMddYYYY(
			reduxState.projectContainer.componentsDisplay.targetItem.creation_date
		),
		start_date: formatDateMMddYYYY(
			reduxState.projectContainer.componentsDisplay.targetItem.start_date
		),
		due_date: formatDateMMddYYYY(
			reduxState.projectContainer.componentsDisplay.targetItem.due_date
		),
		completion_date: formatDateMMddYYYY(
			reduxState.projectContainer.componentsDisplay.targetItem.completion_date
		),
	});

	return (
		<div>
			<div className="outer-dividing-container">
				<h1 className="project-name">{projectInfo.name}</h1>
				<div className="project-creation-date">
					Created on: {projectInfo.creation_date}
				</div>
			</div>
			<div className="outer-dividing-container">
				<div className="project-box">
					<h2 className="project-box__title">Description</h2>
					<span className="project-box__description">
						{projectInfo.description}
					</span>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container--fixed-width-for-info">
				<div className="project-box">
					<h2 className="project-box__title">Info</h2>
					<div className="project-box__group">
						<div className="project-box__group__field">
							<span className="project-box__group__field__type">
								Start Date:
							</span>
							<span className="project-box__group__field_content">
								{projectInfo.start_date}
							</span>
						</div>
						<div className="project-box__group__field">
							<span className="project-box__group__field__type">Due Date:</span>
							<span className="project-box__group__field_content">
								{projectInfo.due_date}
							</span>
						</div>
						{projectInfo.completion_date === null ? null : (
							<div className="project-box__group__field">
								<span className="project-box__group__field__type">
									Completed on:
								</span>
								<span className="project-box__group__field_content">
									{projectInfo.completion_date}
								</span>
							</div>
						)}
					</div>
					<div className="project-box__group project-box__group--right">
						<div className="project-box__group__field">
							<span className="project-box__group__field__type">Priority:</span>
							<span className="project-box__group__field_content">
								{projectInfo.priorityOption}
							</span>
						</div>
						<div className="project-box__group__field">
							<span className="project-box__group__field__type">Status:</span>
							<span className="project-box__group__field_content">
								{projectInfo.statusOption}
							</span>
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
		</div>
	);
}
