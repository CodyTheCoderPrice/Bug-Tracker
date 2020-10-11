import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	clearInputErrors,
	setWhichProjectOrBugComponentsDisplay,
	deleteMultipleProjectsOrBugs,
} from "../../../../actions";

import { toggleClassName } from "../../../../utils/elementUtils";

import "../../../../SCSS/home/projects-bugs-shared/deleteItemsModal.scss";

export default function ListContainerMassDeleteItemsModal(props) {
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
