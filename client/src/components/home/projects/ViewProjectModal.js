import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setWhichProjectComponentsDisplay } from "../../../actions";

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

	useEffect(() => {
		let elem = document.getElementsByClassName("js-view-project-modal")[0];
		if (reduxState.displaySizes.window !== null) {
			// 30 pixels are subtracted at the end to correct for this modal's margin and border
			elem.style.width =
				reduxState.displaySizes.window.width -
				reduxState.displaySizes.scrollbar.width -
				30 +
				"px";
		}
	}, [reduxState.displaySizes]);

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
			<div className="blurred-background" />
			<div className="view-project-modal js-view-project-modal">
				<div className="project-options-container">
					<div className="project-options-container__button" onClick={closeViewProjectDashboard}>
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
										<div className="project-box__content">
											<span className="project-box__content__type">
												Priority:
											</span>
											<span className="project-box__content__info">
												{projectInfo.priorityOption}
											</span>
										</div>
										<div className="project-box__content">
											<span className="project-box__content__type">
												Status:
											</span>
											<span className="project-box__content__info">
												{projectInfo.statusOption}
											</span>
										</div>
										<div className="project-box__content project-box__content--margin-top">
											<span className="project-box__content__type">
												Created on:
											</span>
											<span className="project-box__content__info">
												{projectInfo.creationDate}
											</span>
										</div>
										<div className="project-box__content">
											<span className="project-box__content__type">
												Start Date:
											</span>
											<span className="project-box__content__info">
												{projectInfo.startDate}
											</span>
										</div>
										<div className="project-box__content">
											<span className="project-box__content__type">
												Due Date:
											</span>
											<span className="project-box__content__info">
												{projectInfo.dueDate}
											</span>
										</div>
										{projectInfo.completionDate === null ? null : (
											<div className="project-box__content">
												<span className="project-box__content__type">
													Completed on:
												</span>
												<span className="project-box__content__info">
													{projectInfo.completionDate}
												</span>
											</div>
										)}
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
