import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	clearBackendErrors,
	setWhichProjectOrBugComponentsDisplay,
	deleteProjectOrBug,
} from "../../../../actions";

export default function ItemViewDeleteModal(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	const deleteItem = () => {
		// Let since list may be edited in the function it is passed to
		let copyMassDeleteList = [
			...reduxState[props.reduxContainerName].massDeleteList,
		];

		// JSON instead of Number since deleting bugs requires the project_id
		// ...so it is appended below when deleting bugs
		let idJson = {
			id: reduxState[props.reduxContainerName].componentsDisplay.targetItem.id,
		};
		// Adds project_id when deleting a bug
		if (props.reduxContainerName === BUG_CONTAINER) {
			idJson["project_id"] =
				reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id;
		}
		dispatch(
			deleteProjectOrBug(
				props.reduxContainerName,
				idJson,
				copyMassDeleteList,
			)
		);
	};

	const closeDeleteItemModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemViewDeleteModal: false,
			})
		);
	};

	return (
		<div className="delete-modal-component">
			<div className="blurred-background" />
			<div className="delete-account-modal">
				<div className="warning-container">
					<span className="warning-container__message">Are you sure?</span>
				</div>
				<span className="backend__errors">
					{reduxState[GENERAL_CONTAINER].backendErrors.server}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
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
