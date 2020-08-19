import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	updateProject,
	clearInputErrors,
} from "../../../actions";

import { formatDateYYYYmmDD } from "../../../utils/dateUtils";

import { formatDescription } from "../../../utils/displayUtils";

import "../../../SCSS/projects/viewProjectModal.scss";

export default function ViewProjectModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		projectId: reduxState.projectComponentsDisplay.targetProject.project_id,
		name: reduxState.projectComponentsDisplay.targetProject.name,
		description: formatDescription(reduxState.projectComponentsDisplay.targetProject.description),
		priorityId: reduxState.projectComponentsDisplay.targetProject.p_priority_id,
		priorityOption:
			reduxState.projectComponentsDisplay.targetProject.p_priority_option,
		statusId: reduxState.projectComponentsDisplay.targetProject.p_status_id,
		statusOption:
			reduxState.projectComponentsDisplay.targetProject.p_status_option,
		creationDate: formatDateYYYYmmDD(
			reduxState.projectComponentsDisplay.targetProject.creation_date
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

	/* useEffect(() => {
		let elem = document.getElementsByClassName("blurred-background")[0];
		elem.style.height = "500px";
	}); */

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
			<div className="view-project-modal">
				<div className="x-button" onClick={closeViewProjectDashboard}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					<table className="view-project-table">
						<tbody>
							<tr>
								<td className="view-project-table__data">
									<div className="first-container">
										<span className="first-container__project-name">
											{projectInfo.name}
										</span>
										<span className="first-container__creation-info">
											Created on:{" "}
											<span className="first-container__creation-info__date">
												{projectInfo.creationDate}
											</span>
										</span>
										<span className="first-container__description-title">
											Description:
										</span>
										<span className="first-container__description-info">
											{projectInfo.description}
										</span>
									</div>
								</td>
								<td className="view-project-table__data">
									<div className="first-container">
										<span className="first-container__project-name">
											{projectInfo.name}
										</span>
										<span className="first-container__creation-info">
											Created on:{" "}
											<span className="first-container__creation-info__date">
												{projectInfo.creationDate}
											</span>
										</span>
										<span className="first-container__description-title">
											Description:
										</span>
										<span className="first-container__description-info">
											{projectInfo.description}
										</span>
									</div>
								</td><td className="view-project-table__data">
									<div className="first-container">
										<span className="first-container__project-name">
											{projectInfo.name}
										</span>
										<span className="first-container__creation-info">
											Created on:{" "}
											<span className="first-container__creation-info__date">
												{projectInfo.creationDate}
											</span>
										</span>
										<span className="first-container__description-title">
											Description:
										</span>
										<span className="first-container__description-info">
											{projectInfo.description}
										</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					{/* <div className="content-container">
						<span className="content-container__title">Description</span>
						<div className="content-container__inner-padded-container">
							<span className="content-container__inner-padded-container__description">
								{projectInfo.description}
							</span>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}
