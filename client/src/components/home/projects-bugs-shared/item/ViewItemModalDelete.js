import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	clearInputErrors,
	setWhichProjectOrBugComponentsDisplay,
	deleteProjectOrBug,
} from "../../../../actions";

import "../../../../SCSS/home/projects-bugs-shared/deleteItemsModal.scss";

export default function ViewItemModalDelete(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// eslint-disable-next-line
	}, []);

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
				<div className="warning-container">
					<span className="warning-container__message">Are you sure?</span>
				</div>
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
	);
}
