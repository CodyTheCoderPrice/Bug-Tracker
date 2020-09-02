import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";

import "../../../../SCSS/projects/view-edit-delete/displayProjectInfo.scss";

export default function DisplayProjectInfo() {
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
		creationDate: formatDateMMddYYYY(
			reduxState.projectComponentsDisplay.targetProject.creation_content
		),
		startDate: formatDateMMddYYYY(
			reduxState.projectComponentsDisplay.targetProject.start_date
		),
		dueDate: formatDateMMddYYYY(
			reduxState.projectComponentsDisplay.targetProject.due_date
		),
		completionDate: formatDateMMddYYYY(
			reduxState.projectComponentsDisplay.targetProject.completion_date
		),
	});

	return (
		<div>
			<div className="outer-dividing-container">
				<h1 className="project-name">{projectInfo.name}</h1>
				<div className="project-creation-date">
					Created on: {projectInfo.creationDate}
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
			<div className="outer-dividing-container outer-dividing-container-one-third">
				<div className="project-box">
					<h2 className="project-box__title">Info</h2>
					<div className="project-box__group">
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
					<div className="project-box__group">
						<div className="project-box__group__field">
							<span className="project-box__group__field__type">
								Start Date:
							</span>
							<span className="project-box__group__field_content">
								{projectInfo.startDate}
							</span>
						</div>
						<div className="project-box__group__field">
							<span className="project-box__group__field__type">Due Date:</span>
							<span className="project-box__group__field_content">
								{projectInfo.dueDate}
							</span>
						</div>
						{projectInfo.completionDate === null ? null : (
							<div className="project-box__group__field">
								<span className="project-box__group__field__type">
									Completed on:
								</span>
								<span className="project-box__group__field_content">
									{projectInfo.completionDate}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container-one-third">
				<div className="project-box">
					<h2 className="project-box__title">Status of Bugs</h2>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container-one-third">
				<div className="project-box">
					<h2 className="project-box__title">Last Five Bugs</h2>
				</div>
			</div>
		</div>
	);
}
