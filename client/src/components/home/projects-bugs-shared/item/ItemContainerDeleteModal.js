import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
} from "../../../../reducers/containerNames";

import {
	clearInputErrors,
	setWhichProjectOrBugComponentsDisplay,
	deleteProjectOrBug,
} from "../../../../actions";

import "../../../../SCSS/home/projects-bugs-shared/deleteItemsModal.scss";

export default function ItemContainerDeleteModal(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [itemInfo, setItemInfo] = useState({
		id: reduxState[props.reduxContainerName].componentsDisplay.targetItem.id,
	});

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

		let itemInfoDeepCopy = { ...itemInfo };
		// Adds project_id when updating bugs
		if (props.reduxContainerName === bugContainerName) {
			itemInfoDeepCopy["project_id"] =
				reduxState[projectContainerName].componentsDisplay.targetItem.id;
		}
		dispatch(
			deleteProjectOrBug(
				props.reduxContainerName,
				itemInfoDeepCopy,
				copyMassDeleteList,
				indexOfTargetItemId
			)
		);
	};

	const closeDeleteItemModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemContainerDeleteModal: false,
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
				<span className="backend__errors">
					{reduxState.generalContainer.inputErrors.server}
				</span>
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
