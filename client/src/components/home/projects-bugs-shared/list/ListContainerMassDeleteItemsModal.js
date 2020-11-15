import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generalContainerName } from "../../../../reducers/containerNames";

import {
	clearInputErrors,
	setWhichProjectOrBugComponentsDisplay,
	deleteMultipleProjectsOrBugs,
} from "../../../../actions";

import "../../../../SCSS/home/projects-bugs-shared/deleteModal.scss";

export default function ListContainerMassDeleteItemsModal(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
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
				listContainerMassDeleteItemsModal: false,
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
					{reduxState[generalContainerName].inputErrors.server}
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
