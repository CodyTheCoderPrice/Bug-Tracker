import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectOrBugComponentsDisplay,
	deleteMultipleProjectsOrBugs,
} from "../../../../actions";

import { toggleClassName } from "../../../../utils/elementUtils";

import "../../../../SCSS/home/projects-bugs-shared/deleteItemsModal.scss";

export default function ListTableMassDeleteItemsModal(props) {
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
				listTableMassDeleteItemsModal: false,
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
		</div>
	);
}
