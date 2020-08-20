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
				<div className="x-button" onClick={closeViewProjectDashboard}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					<h1 className="project-name">{projectInfo.name}</h1>
					<table className="view-project-table">
						<tbody>
							<tr>
								<td className="view-project-table__data">
									<div className="content-container">
										<h2 className="content-container__title">Description</h2>
										<span className="content-container__description-info">
											{projectInfo.description}
										</span>
									</div>
								</td>
								<td className="view-project-table__data">
									<div className="content-container">
										<h2 className="content-container__title">Info</h2>
										<span className="content-container__content-prefix">
											Priority:
											<span className="content-container__content-info">
												{projectInfo.priorityOption}
											</span>
										</span>
										<span className="content-container__content-prefix">
											Status:
											<span className="content-container__content-info">
												{projectInfo.statusOption}
											</span>
										</span>
										<span className="content-container__content-prefix content-container__content-prefix--margin-top">
											Created on:
											<span className="content-container__content-info">
												{projectInfo.creationDate}
											</span>
										</span>
										<span className="content-container__content-prefix">
											Start Date:
											<span className="content-container__content-info">
												{projectInfo.startDate}
											</span>
										</span>
										<span className="content-container__content-prefix">
											Due Date:
											<span className="content-container__content-info">
												{projectInfo.dueDate}
											</span>
										</span>
										{projectInfo.completionDate === null ? null : (
											<span className="content-container__content-prefix">
												Completed on:
												<span className="content-container__content-info">
													{projectInfo.completionDate}
												</span>
											</span>
										)}
									</div>
								</td>
								<td className="view-project-table__data">
									<div className="content-container">
										<h2 className="content-container__title">Bugs</h2>
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
