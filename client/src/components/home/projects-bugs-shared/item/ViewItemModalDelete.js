import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	deleteProjectOrBug,
} from "../../../../actions";

import "../../../../SCSS/home/projects-bugs-shared/deleteItemsModal.scss";

export default function ViewItemModalDelete() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const deleteThisProject = () => {
		let copyMassDeleteList = [...reduxState.projectContainer.massDeleteList];
		const indexOfTargetProjectId = copyMassDeleteList.indexOf(
			reduxState.projectContainer.componentsDisplay.targetItem.project_id
		);

		dispatch(
			deleteProjectOrBug(
				"projectContainer",
				{
					project_id:
						reduxState.projectContainer.componentsDisplay.targetItem
							.project_id,
				},
				copyMassDeleteList,
				indexOfTargetProjectId
			)
		);
	};

	const closeDeleteProjectModal = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectContainer.componentsDisplay,
				viewItemModalDelete: false,
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
							onClick={deleteThisProject}
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
