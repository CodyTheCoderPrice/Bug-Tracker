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
	getDeleteModalComponentModalContainerElementBackgroundColorClassNameForLightOrDarkMode,
	getDeleteModalComponentTrapazoidElementBorderColorClassNameForLightOrDarkMode,
	getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode,
	getBackendErrorsJSX,
	getDeleteModalComponentDeleteButtonElementBackgroundColorClassNameForLightOrDarkMode,
	getDeleteModalComponentCancelButtonElementBorderBackgroundTextColorClassNameForLightOrDarkMode,
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
			reduxState[PROJECT_CONTAINER].componentsDisplay
				.deleteModalComponentForListViewShouldDisplay ||
			reduxState[PROJECT_CONTAINER].componentsDisplay
				.deleteModalComponentForItemViewShouldDisplay
		) {
			return reduxState[PROJECT_CONTAINER].componentsDisplay
				.deleteModalComponentForListViewShouldDisplay &&
				reduxState[PROJECT_CONTAINER].massDeleteList.length > 1
				? "Deleting these projects will also delete their associated bugs and comments. This cannot be undone."
				: "Deleting this project will also delete its associated bugs and comments. This cannot be undone.";
		} else if (
			reduxState[BUG_CONTAINER].componentsDisplay
				.deleteModalComponentForListViewShouldDisplay ||
			reduxState[BUG_CONTAINER].componentsDisplay
				.deleteModalComponentForItemViewShouldDisplay
		) {
			return reduxState[BUG_CONTAINER].componentsDisplay
				.deleteModalComponentForListViewShouldDisplay &&
				reduxState[BUG_CONTAINER].massDeleteList.length > 1
				? "Deleting these bugs will also delete their associated comments. This cannot be undone."
				: "Deleting this bug will also delete its associated comments. This cannot be undone.";
		} else if (
			reduxState[COMMENT_CONTAINER].componentsDisplay.commentToBeDeleted !==
			null
		) {
			return "Deleting this comment cannot be undone.";
		} else {
			// This case should not happen, as the DeleteModal component should
			// not display if all the above casses are false, but this text is
			// still returned here just to be safe.
			return "Are you sure? This cannot be undone.";
		}
	};

	return (
		<div className="delete-modal-component">
			<div
				className={
					"blurred-backdrop" +
					getCommonBlurredBackdropElementBackgroundColorAndOpacityClassNameForLightOrDarkMode(
						props.clickToCloseBlurredBackdrop,
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					) +
					(props.clickToCloseBlurredBackdrop
						? " blurred-backdrop--click-to-close"
						: "")
				}
			/>
			<div
				className={
					"modal-container" +
					getDeleteModalComponentModalContainerElementBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					) +
					(reduxState[COMMENT_CONTAINER].componentsDisplay
						.commentToBeDeleted !== null
						? " modal-container--comment-height"
						: "")
				}
			>
				<div
					className={
						"warning-trapazoid" +
						getDeleteModalComponentTrapazoidElementBorderColorClassNameForLightOrDarkMode(
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
						{getBackendErrorsJSX(
							[
								reduxState[GENERAL_CONTAINER].backendErrors.server,
								reduxState[GENERAL_CONTAINER].backendErrors.serverConnection,
							],
							"backend-errors" +
								getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
						)}
					</div>
				</div>
				<div className="centered-buttons-container">
					<div
						className={
							"centered-buttons-container__button" +
							getDeleteModalComponentDeleteButtonElementBackgroundColorClassNameForLightOrDarkMode(
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
							getDeleteModalComponentCancelButtonElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
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
