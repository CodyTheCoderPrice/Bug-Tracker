import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "../../../actions/constants/containerNames";

import { clearBackendErrors } from "../../../actions";

import {
	getCommonBlurredBackdropElementBackgroundColorAndOpacityClassNameForLightOrDarkMode,
	getDeleteModalBackgroundColorClassNameForLightOrDarkMode,
	getDeleteModalTrapazoidBorderColorClassNameForLightOrDarkMode,
	getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode,
	getDeleteModalDeleteButtonBackgroundColorClassNameForLightOrDarkMode,
	getDeleteModalCancelButtonBorderBackgroundTextColorClassNameForLightOrDarkMode,
} from "../../../utils";

export default function DeleteModal(props) {
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

	const getMessageText = () => {
		if (
			reduxState[PROJECT_CONTAINER].componentsDisplay.listViewDeleteModal ||
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewDeleteModal
		) {
			return reduxState[PROJECT_CONTAINER].componentsDisplay
				.listViewDeleteModal &&
				reduxState[PROJECT_CONTAINER].massDeleteList.length > 1
				? "Deleting these projects will also delete their associated bugs and comments. This cannot be undone."
				: "Deleting this project will also delete its associated bugs and comments. This cannot be undone.";
		} else if (
			reduxState[BUG_CONTAINER].componentsDisplay.listViewDeleteModal ||
			reduxState[BUG_CONTAINER].componentsDisplay.itemViewDeleteModal
		) {
			return reduxState[BUG_CONTAINER].componentsDisplay.listViewDeleteModal &&
				reduxState[BUG_CONTAINER].massDeleteList.length > 1
				? "Deleting these bugs will also delete their associated comments. This cannot be undone."
				: "Deleting this bug will also delete its associated comments. This cannot be undone.";
		} else if (
			reduxState[COMMENT_CONTAINER].componentsDisplay.commentToBeDeleted !== null
		) {
			return "Deleting this comment cannot be undone.";
		} else {
			return "Are you sure? This cannot be undone.";
		}
	};

	return (
		<div className="delete-modal-component">
			<div
				className={
					"blurred-backdrop" +
					getCommonBlurredBackdropElementBackgroundColorAndOpacityClassNameForLightOrDarkMode(
						props.clickToCloseBlurredBackground,
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					) +
					(props.clickToCloseBlurredBackground
						? " blurred-backdrop--click-to-close"
						: "")
				}
			/>
			<div
				className={
					"delete-modal" +
					getDeleteModalBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					) +
					(reduxState[PROJECT_CONTAINER].componentsDisplay
						.listViewDeleteModal === false &&
					reduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewDeleteModal === false &&
					reduxState[BUG_CONTAINER].componentsDisplay.listViewDeleteModal ===
						false &&
					reduxState[BUG_CONTAINER].componentsDisplay.itemViewDeleteModal ===
						false
						? " delete-modal--comment-height"
						: "")
				}
			>
				<div
					className={
						"warning-trapazoid-background" +
						getDeleteModalTrapazoidBorderColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				/>
				<h2 className="warning-header">Warning</h2>
				<div className="centered-message-container">
					<div className="centered-message-container__relative-container">
						<span className="centered-message-container__relative-container__text">
							{getMessageText()}
						</span>
					</div>
				</div>
				<span
					className={
						"backend-errors" +
						getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					{reduxState[GENERAL_CONTAINER].backendErrors.server}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
				</span>
				<div className="centered-buttons-container">
					<div
						className={
							"centered-buttons-container__button" +
							getDeleteModalDeleteButtonBackgroundColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						onClick={props.deleteFunction}
					>
						<span className="centered-buttons-container__button__text">
							Delete
						</span>
					</div>
					<div
						className={
							"centered-buttons-container__button centered-buttons-container__button--cancel" +
							getDeleteModalCancelButtonBorderBackgroundTextColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						onClick={props.closeModalFunction}
					>
						<span className="centered-buttons-container__button__text">
							Cancel
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
