import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "../../../../../actions/constants/containerNames";

import { createComment, clearBackendErrors } from "../../../../../actions";

import {
	getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode,
	getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode,
	getBackendErrorsJSX,
	getCommonFormSubmitButtonElementBackgroundColorWithHoverAndFocusClassNameForTheme,
	dateToInt,
} from "../../../../../utils";

import { useSubmitFormOnEnterPress } from "../../../../../utils/hooks";

// Components
import ItemViewCommentsBoxIndividualComment from "./ItemViewCommentsBoxIndividualComment";

export default function ItemViewCommentsBox() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [commentInfo, setCommentInfo] = useState({
		// Passing project and bug id so backend can verify the comment will
		// ...belong to a bug/project that belongs to the account
		project_id:
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem.id,
		bug_id: reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.id,
		description: "",
	});

	// Keeps track of the current list of comments length so componet can tell
	// ...when a new comment has been added in order to reset commentInfo
	const [previousCommmentsListSize, setPreviousCommentsListSize] = useState(
		reduxState[COMMENT_CONTAINER].list.length
	);

	// Custome hook will cause form to submit whenever the enter key is pressed
	useSubmitFormOnEnterPress("js-create-comment-form");

	// Clears current backend errors when closing the component. Otherwise the
	// ...backend errors may presist and appear when component is re-openned.
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	// Resets commentInfo when the list of comments length increases (meaning
	// ...comment was created) since the description should then be reset to empty
	useEffect(() => {
		if (reduxState[COMMENT_CONTAINER].list.length > previousCommmentsListSize) {
			setCommentInfo({
				// Default commentInfo values
				description: "",
				project_id:
					reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
						.id,
				bug_id:
					reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.id,
			});
		}
		setPreviousCommentsListSize(reduxState[COMMENT_CONTAINER].list.length);
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
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
		dispatch(createComment(commentInfo));
	};

	return (
		<div className="outer-dividing-container">
			<div
				className={
					"item-box" +
					getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<form
					className="js-create-comment-form"
					noValidate
					onSubmit={handleSubmit}
				>
					<label htmlFor="create-comment-description">
						<h2
							className={
								"item-box__title item-box__title--no-bottom-margin" +
								getCommonTextColorClassNameForThemeWithLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
						>
							Comments (
							{
								[...reduxState[COMMENT_CONTAINER].list].filter(
									(item) =>
										item.bug_id ===
										reduxState[BUG_CONTAINER].componentsDisplay
											.itemViewCurrentItem.id
								).length
							}
							)
						</h2>
					</label>
					<span
						className={
							"item-box__form-char-counter" +
							(reduxState[GENERAL_CONTAINER].globalConstants
								.descriptionCharLimit < commentInfo.description.length
								? getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								  )
								: "")
						}
					>
						{commentInfo.description.length +
							"/" +
							reduxState[GENERAL_CONTAINER].globalConstants
								.descriptionCharLimit}
					</span>
					<textarea
						name="description"
						onChange={onChange}
						value={commentInfo.description}
						id="create-comment-description"
						className={
							"item-box__form-textarea item-box__form-textarea--for-comments" +
							getCommonItemViewComponentFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
							)
						}
					/>
					{getBackendErrorsJSX(
						[
							reduxState[GENERAL_CONTAINER].backendErrors
								.validationCreateCommentDescription,
							reduxState[GENERAL_CONTAINER].backendErrors.validationComment,
							reduxState[GENERAL_CONTAINER].backendErrors.serverItem,
							reduxState[GENERAL_CONTAINER].backendErrors.serverConnection,
						],
						"backend-errors" +
							getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
					)}
					<div className="create-comment-form-button-centering-container">
						<button
							type="submit"
							className={
								"create-comment-form-button-centering-container__submit-button" +
								getCommonFormSubmitButtonElementBackgroundColorWithHoverAndFocusClassNameForTheme(
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
						>
							Add Comment
						</button>
					</div>
				</form>

				{[...reduxState[COMMENT_CONTAINER].list]
					.filter(
						(item) =>
							item.bug_id ===
							reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.id
					)
					.sort((a, b) => {
						return dateToInt(b.creation_date) !== dateToInt(a.creation_date)
							? dateToInt(b.creation_date) - dateToInt(a.creation_date)
							: b.id - a.id;
					})
					.map((comment, idx) => {
						return (
							<ItemViewCommentsBoxIndividualComment
								key={idx}
								comment={comment}
								project_id={
									reduxState[PROJECT_CONTAINER].componentsDisplay
										.itemViewCurrentItem.id
								}
								bug_id={
									reduxState[BUG_CONTAINER].componentsDisplay
										.itemViewCurrentItem.id
								}
							/>
						);
					})}
			</div>
		</div>
	);
}
