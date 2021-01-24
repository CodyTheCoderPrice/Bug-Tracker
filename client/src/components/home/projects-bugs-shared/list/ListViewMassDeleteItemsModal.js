import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GENERAL_CONTAINER } from "../../../../actions/constants/containerNames";

import {
	clearBackendErrors,
	setWhichProjectOrBugComponentsDisplay,
	deleteMultipleProjectsOrBugs,
} from "../../../../actions";

export default function ListViewMassDeleteItemsModal(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	const deleteCheckedItems = () => {
		dispatch(
			deleteMultipleProjectsOrBugs(
				props.reduxContainerName,
				reduxState[props.reduxContainerName].massDeleteList,
				reduxState[props.reduxContainerName].componentsDisplay
			)
		);
	};

	const closeMassDeleteItemsModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listViewMassDeleteItemsModal: false,
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
						onClick={deleteCheckedItems}
					>
						Delete
					</div>
					<div
						className="centered-buttons-container__cancel"
						onClick={closeMassDeleteItemsModal}
					>
						Cancel
					</div>
				</div>
			</div>
		</div>
	);
}
