import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	deleteProject,
} from "../../../../actions";

import "../../../../SCSS/projects/view-edit-delete/deleteProjectModal.scss";

export default function DeleteProjectModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		projectId: reduxState.projectComponentsDisplay.targetProject.project_id,
	});

	const callDeleteProject = () => {
		dispatch(deleteProject({ projectId: projectInfo.projectId }));
	};

	const closeDeleteProjectModal = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				deleteProjectModal: false,
			})
		);
	};

	return (
		<div className="delete-project-modal-component">
			<div className="blurred-background js-delete-project-modal-blurred-background" />
			<div className="delete-account-modal">
				<div className="outer-container">
					<span className="warning-message">Delete Project?</span>
				</div>
				<div className="outer-container">
					<div className="centered-buttons-container">
						<div
							className="centered-buttons-container__delete"
							onClick={callDeleteProject}
						>
							Delete
						</div>
						<div
							className="centered-buttons-container__cancel"
							onClick={closeDeleteProjectModal}
						>
							Cancel
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
