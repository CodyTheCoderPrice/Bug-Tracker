import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
} from "../../../actions";

import { getElementSize } from "../../../utils/displaySizeUtils";

import { formatDateMMddYYYY } from "../../../utils/dateUtils";

import "../../../SCSS/projects/viewProjectModal.scss";

export default function ViewProjectModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo] = useState({
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
			reduxState.projectComponentsDisplay.targetProject.start_content
		),
		dueDate: formatDateMMddYYYY(
			reduxState.projectComponentsDisplay.targetProject.due_content
		),
		completionDate: formatDateMMddYYYY(
			reduxState.projectComponentsDisplay.targetProject.completion_content
		),
	});

	const [editingProject, setEditingProject] = useState(false);

	// Set blurredBackground and viewProjectModal to the corect sizes
	useEffect(() => {
		let blurredBackgroundElement = document.getElementsByClassName(
			"js-view-project-blurred-background"
		)[0];
		// Will equal the height of the projectTable
		blurredBackgroundElement.style.height =
			getElementSize("js-project-filter-search-bar").height +
			getElementSize("js-project-table__header").height * 
			(reduxState.projects.length + 1) +
			"px";

		let projectModalElement = document.getElementsByClassName(
			"js-view-project-modal"
		)[0];
		if (reduxState.displaySizes.window !== null) {
			// 30 pixels are subtracted at the end to correct for this modal's margin and border
			projectModalElement.style.width =
				reduxState.displaySizes.window.width -
				reduxState.displaySizes.scrollbar.width -
				50 +
				"px";
		}
	}, [reduxState.displaySizes, reduxState.projects]);

	const closeViewProjectDashboard = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				viewProjectModal: false,
			})
		);
	};

	return (
		<div className="view-project-component">
			<div className="blurred-background js-view-project-blurred-background" />
			<div className="view-project-modal js-view-project-modal">
				<div className="project-options-container">
					<div
						className="project-options-container__button"
						onClick={closeViewProjectDashboard}
					>
						<i className="fa fa-ellipsis-h" aria-hidden="true"></i>
					</div>
					<div className="project-options-container__arrow-up" />
					<div className="project-options-container__dropdown">
						<span className="project-options-container__dropdown__option">
							Edit Project
						</span>
						<span className="project-options-container__dropdown__option project-options-container__dropdown__option--no-border">
							Delete Project
						</span>
					</div>
				</div>
				<div className="x-button" onClick={closeViewProjectDashboard}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					<h1 className="project-name">{projectInfo.name}</h1>
					<div className="project-creation-date">
						Created on: {projectInfo.creationDate}
					</div>
					<table className="view-project-table">
						<tbody>
							<tr>
								<td className="view-project-table__data">
									<div className="project-box">
										<h2 className="project-box__title">Description</h2>
										<span className="project-box__description">
											{projectInfo.description}
										</span>
									</div>
								</td>
								<td className="view-project-table__data">
									<div className="project-box">
										<h2 className="project-box__title">Info</h2>
										<div className="project-box__group">
											<div className="project-box__group__content">
												<span className="project-box__group__content__type">
													Priority:
												</span>
												<span className="project-box__group__content__info">
													{projectInfo.priorityOption}
												</span>
											</div>
											<div className="project-box__group__content project-box__group__content--larger-bottom-space">
												<span className="project-box__group__content__type">
													Status:
												</span>
												<span className="project-box__group__content__info">
													{projectInfo.statusOption}
												</span>
											</div>
										</div>
										<div className="project-box__group project-box__group--right">
											<div className="project-box__group__content">
												<span className="project-box__group__content__type">
													Start Date:
												</span>
												<span className="project-box__group__content__info">
													{projectInfo.startDate}
												</span>
											</div>
											<div className="project-box__group__content">
												<span className="project-box__group__content__type">
													Due Date:
												</span>
												<span className="project-box__group__content__info">
													{projectInfo.dueDate}
												</span>
											</div>
											{projectInfo.completionDate === null ? null : (
												<div className="project-box__group__content">
													<span className="project-box__group__content__type">
														Completed on:
													</span>
													<span className="project-box__group__content__info">
														{projectInfo.completionDate}
													</span>
												</div>
											)}
										</div>
									</div>
								</td>
								<td className="view-project-table__data">
									<div className="project-box">
										<h2 className="project-box__title">Bugs</h2>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
