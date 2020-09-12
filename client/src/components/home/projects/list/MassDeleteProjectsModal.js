import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichMassDeleteComponentsDisplay,
	deleteProject,
	setMassDelete,
} from "../../../../actions";

import { toggleClassName } from "../../../../utils/elementUtils";

import "../../../../SCSS/projects-bugs-shared/massDeleteProjectsModal.scss";

export default function MassDeleteProjectsModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Disable scrolling for the HTML and body
	useEffect(() => {
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-scrolling");

		return () => {
			toggleClassName(false, body, "stop-scrolling");
		};
	}, []);

	const deleteCheckedProjects = () => {
		for (let project_id of reduxState.massDelete.projects) {
			dispatch(deleteProject({ project_id: project_id }));
		}

		dispatch(setMassDelete({ projects: [] }));
		dispatch(setWhichMassDeleteComponentsDisplay({}));
	};

	const closeMassDeleteProjectsModal = () => {
		dispatch(setWhichMassDeleteComponentsDisplay({}));
	};

	return (
		<div className="mass-delete-projects-modal-component">
			<div className="blurred-background js-delete-project-modal-blurred-background" />
			<div className="delete-account-modal">
				<div className="outer-container">
					<span className="warning-message">Are you sure?</span>
				</div>
				<div className="outer-container">
					<div className="centered-buttons-container">
						<div
							className="centered-buttons-container__delete"
							onClick={deleteCheckedProjects}
						>
							Delete
						</div>
						<div
							className="centered-buttons-container__cancel"
							onClick={closeMassDeleteProjectsModal}
						>
							Cancel
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
