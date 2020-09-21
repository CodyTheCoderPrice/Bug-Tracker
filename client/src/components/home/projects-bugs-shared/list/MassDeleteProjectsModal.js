import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	deleteMultipleProjectsOrBugs,
	setProjectOrBugMassDeleteList,
} from "../../../../actions";

import { toggleClassName } from "../../../../utils/elementUtils";

import "../../../../SCSS/projects-bugs-shared/deleteProjectModal.scss";

export default function MassDeleteProjectsModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Disable scrolling for the body
	useEffect(() => {
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-x-y-scrolling");

		return () => {
			toggleClassName(false, body, "stop-x-y-scrolling");
		};
	}, []);

	const deleteCheckedProjects = () => {
		dispatch(
			deleteMultipleProjectsOrBugs(
				"projectContainer",
				{ projectsArray: reduxState.projectContainer.massDeleteList },
				reduxState.projectContainer.componentsDisplay
			)
		);
	};

	const closeMassDeleteProjectsModal = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectContainer.componentsDisplay,
				massDeleteProjectsModal: false,
			})
		);
	};

	return (
		<div className="delete-project-modal-component">
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
