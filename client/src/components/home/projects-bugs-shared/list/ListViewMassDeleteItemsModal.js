import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	clearBackendErrors,
	setWhichProjectOrBugComponentsDisplay,
	deleteMultipleProjectsOrBugs,
} from "../../../../actions";

import {
	getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode,
	getBackendErrorsTextColorClassNameForLightOrDarkMode,
} from "../../../../utils";

export default function ListViewMassDeleteItemsModal(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Clears current backend errors when closing the component. Otherwise the
	// ...backend errors may presist and appear when component is re-openned.
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
				listViewDeleteModal: false,
			})
		);
	};

	return (
		<div className="delete-modal-component">
			<div
				className={
					"blurred-background" +
					getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode(
						false,
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			/>
			<div className="delete-modal">
				<div className="warning-container">
					<span className="warning-container__message">Are you sure?</span>
				</div>
				<span
					className={
						"backend-errors" +
						getBackendErrorsTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					{reduxState[GENERAL_CONTAINER].backendErrors.server}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
				</span>
				<div className="centered-buttons-container">
					<div
						className="centered-buttons-container__delete"
						alt="Button to confirm deletion"
						onClick={deleteCheckedItems}
					>
						Delete
					</div>
					<div
						className="centered-buttons-container__cancel"
						alt="Button to cancel deletion"
						onClick={closeMassDeleteItemsModal}
					>
						Cancel
					</div>
				</div>
			</div>
		</div>
	);
}
