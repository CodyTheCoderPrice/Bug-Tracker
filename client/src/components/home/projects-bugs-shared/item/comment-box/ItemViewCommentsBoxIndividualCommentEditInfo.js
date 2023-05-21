import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "../../../../../actions/constants/containerNames";

import {
	updateComment,
	clearBackendErrors,
	setWhichCommentComponentsDisplay,
} from "../../../../../actions";

import {
	formatDateMMddYYYY,
	getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonItemViewCommentBoxIndividualCommentComponentIconButtonElementTextColorClassNameForLightOrDarkMode,
	getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode,
	getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode,
	getBackendErrorsJSX,
	getCommonFormSubmitButtonElementBackgroundColorWithHoverAndFocusClassNameForTheme,
	getCommonItemViewComponentFormCancelButtonElementBackgroundColorClassNameForLightOrDarkMode,
} from "../../../../../utils";

import { useSubmitFormOnEnterPress } from "../../../../../utils/hooks";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function ItemViewCommentsBoxIndividualCommentEditInfo(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [commentInfo, setCommentInfo] = useState({
		id: props.comment.id,
		// Passing project and bug id so backend can verify the comment will
		// ...belong to a bug/project that belongs to the account
		project_id:
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem.id,
		bug_id: reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.id,
		description: props.comment.description,
	});

	// Custome hook will cause form to submit whenever the enter key is pressed
	useSubmitFormOnEnterPress("js-edit-comment-form");

	// Clears current backend errors when closing the component. Otherwise the
	// ...backend errors may presist and appear when component is re-openned.
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Resets commentInfo when commentBeingEdited changes so changed
	// ...descriptions don't persist when cancel button is clicked and when the
	// ...list of comments length changes since components will not belond to
	// ...the correct comment anymore
	useEffect(() => {
		setCommentInfo({
			id: props.comment.id,
			// Default commentInfo values
			project_id:
				reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem.id,
			bug_id:
				reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.id,
			description: props.comment.description,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[COMMENT_CONTAINER].componentsDisplay.commentBeingEdited,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[COMMENT_CONTAINER].list.length,
	]);

	const onChange = (e) => {
		// Since select option values are always strings while priority and status take integers
		if (e.target.name === "description") {
			// Doesn't allow line breaks
			setCommentInfo({
				...commentInfo,
				[e.target.name]: e.target.value.replace(/(\r\n|\n|\r)/gm, ""),
			});
		} else {
			setCommentInfo({ ...commentInfo, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(
			updateComment({
				...commentInfo,
			})
		);
	};

	const cancelEditingComment = () => {
		dispatch(clearBackendErrors());
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	const openDeleteCommentModal = () => {
		dispatch(
			setWhichCommentComponentsDisplay({
				commentBeingEdited:
					reduxState[COMMENT_CONTAINER].componentsDisplay.commentBeingEdited,
				commentToBeDeleted: props.comment,
			})
		);
	};

	return (
		<form className="js-edit-comment-form" noValidate onSubmit={handleSubmit}>
			<span
				className={
					"item-box__form-char-counter" +
					(reduxState[GENERAL_CONTAINER].globalConstants.descriptionCharLimit <
					commentInfo.description.length
						? getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						  )
						: "")
				}
			>
				{commentInfo.description.length +
					"/" +
					reduxState[GENERAL_CONTAINER].globalConstants.descriptionCharLimit}
			</span>
			<textarea
				autoFocus
				name="description"
				onChange={onChange}
				value={commentInfo.description}
				id="edit-comment-description"
				className={
					"item-box__form-textarea item-box__form-textarea--for-comments" +
					getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
						reduxState[ACCOUNT_CONTAINER].settings.theme_color
					)
				}
			/>
			<span>{formatDateMMddYYYY(props.comment.creation_date)}</span>
			<div
				className={
					"comment-icon-button" +
					getCommonItemViewCommentBoxIndividualCommentComponentIconButtonElementTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
				alt="Button to delete the comment above"
				onClick={openDeleteCommentModal}
			>
				<FontAwesomeIcon icon={faTrashCan} aria-hidden="true" />
			</div>
			{getBackendErrorsJSX(
				[
					reduxState[GENERAL_CONTAINER].backendErrors
						.validationEditCommentDescription,
					reduxState[GENERAL_CONTAINER].backendErrors.validationComment,
					reduxState[GENERAL_CONTAINER].backendErrors.serverItem,
					reduxState[GENERAL_CONTAINER].backendErrors.serverConnection,
				],
				"backend-errors" +
					getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
			)}
			<div className="individual-comment-divider__form-buttons-centering-container">
				<div className="individual-comment-divider__form-buttons-centering-container__pair-container">
					<button
						type="submit"
						className={
							"individual-comment-divider__form-buttons-centering-container__pair-container__submit-edit-button" +
							getCommonFormSubmitButtonElementBackgroundColorWithHoverAndFocusClassNameForTheme(
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
							)
						}
					>
						Edit Comment
					</button>
					<div
						className={
							"individual-comment-divider__form-buttons-centering-container__pair-container__cancel-button" +
							getCommonItemViewComponentFormCancelButtonElementBackgroundColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						alt="Button to cancel editing the above comment"
						onClick={cancelEditingComment}
					>
						Cancel
					</div>
				</div>
			</div>
		</form>
	);
}
