import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectOrBugComponentsDisplay,
	deleteProjectOrBug,
} from "../../../../actions";

import "../../../../SCSS/home/projects-bugs-shared/deleteItemsModal.scss";

export default function ViewItemModalDelete(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const deleteItem = () => {
		let copyMassDeleteList = [
			...reduxState[props.reduxContainerName].massDeleteList,
		];
		const indexOfTargetItemId = copyMassDeleteList.indexOf(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.id
		);

		dispatch(
			deleteProjectOrBug(
				props.reduxContainerName,
				{
					id:
						reduxState[props.reduxContainerName].componentsDisplay.targetItem
							.id,
				},
				copyMassDeleteList,
				indexOfTargetItemId
			)
		);
	};

	const closeDeleteItemModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				viewItemModalDelete: false,
			})
		);
	};

	return (
		<div className="delete-item-modal-component">
			<div className="blurred-background" />
			<div className="delete-account-modal">
				<div className="outer-container">
					<span className="warning-message">Are you sure?</span>
				</div>
				<div className="outer-container">
					<div className="centered-buttons-container">
						<div
							className="centered-buttons-container__delete"
							onClick={deleteItem}
						>
							Delete
						</div>
						<div
							className="centered-buttons-container__cancel"
							onClick={closeDeleteItemModal}
						>
							Cancel
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
