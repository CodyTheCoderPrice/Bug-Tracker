import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	generalContainerName,
	projectContainerName,
	bugContainerName,
	commentContainerName,
} from "../../../../reducers/containerNames";

import { createComment, clearInputErrors } from "../../../../actions";

import ItemContainerCommentsBoxIndividualComment from "./ItemContainerCommentsBoxIndividualComment";

import { useSubmitFormOnEnter } from "../../../../utils/submitFormOnEnterHookUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerCommentBox.scss";

export default function ItemContainerCommentsBox() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [commentInfo, setCommentInfo] = useState({
		description: "",
		// Following ids are used by the backend to ensure
		// ...the comment will belong to the correct account
		project_id:
			reduxState[projectContainerName].componentsDisplay.targetItem.id,
		bug_id: reduxState[bugContainerName].componentsDisplay.targetItem.id,
	});

	const [descriptionCharLimit] = useState(500);

	// Keeps track of the current comment list size so componet can tell
	// ...when a new comment has been added in order to reset commentInfo
	const [previousCommmentsListSize, setPreviousCommentsListSize] = useState(
		reduxState[commentContainerName].list.length
	);

	// Custome hook will cause form to submit whenever the enter key is pressed
	useSubmitFormOnEnter("js-create-comment-form");

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// eslint-disable-next-line
	}, []);

	// Resets commentInfo when the comment list size increases (meaning comment was created)
	// ...since the description should then be reset to empty
	useEffect(() => {
		if (
			reduxState[commentContainerName].list.length > previousCommmentsListSize
		) {
			setCommentInfo({
				// Default commentInfo values
				description: "",
				project_id:
					reduxState[projectContainerName].componentsDisplay.targetItem.id,
				bug_id: reduxState[bugContainerName].componentsDisplay.targetItem.id,
			});
		}
		setPreviousCommentsListSize(reduxState[commentContainerName].list.length);
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[commentContainerName].list.length,
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
			<div className="item-box">
				<form
					className="js-create-comment-form"
					noValidate
					onSubmit={handleSubmit}
				>
					<label htmlFor="create-comment-description">
						<h2 className="item-box__title item-box__title--no-bottom-margin">
							Comments
						</h2>
					</label>
					<span
						className={
							"item-box__form-char-counter" +
							(commentInfo.description.length > descriptionCharLimit
								? " text-red"
								: "")
						}
					>
						{commentInfo.description.length + "/" + descriptionCharLimit}
					</span>
					<textarea
						name="description"
						onChange={(e) => onChange(e)}
						value={commentInfo.description}
						id="create-comment-description"
						className="item-box__form-textarea item-box__form-textarea--shorter"
					/>
					<div className="form-submit-centering-container">
						<button
							type="submit"
							className="form-submit-centering-container__button"
						>
							Add Comment
						</button>
					</div>
					<div className="bottom-form-errors-container">
						<span className="form-errors">
							{
								reduxState[generalContainerName].inputErrors
									.validationCreateCommentDescription
							}
							{reduxState[generalContainerName].inputErrors.validationComment}
							{reduxState[generalContainerName].inputErrors.serverItem}
						</span>
					</div>
				</form>

				{[...reduxState[commentContainerName].list]
					.filter(
						(item) =>
							item.bug_id ===
							reduxState[bugContainerName].componentsDisplay.targetItem.id
					)
					.sort((a, b) => {
						return a - b;
					})
					.map((comment, idx) => {
						return (
							<ItemContainerCommentsBoxIndividualComment
								key={idx}
								comment={comment}
								project_id={
									reduxState[projectContainerName].componentsDisplay.targetItem
										.id
								}
								bug_id={
									reduxState[bugContainerName].componentsDisplay.targetItem.id
								}
							/>
						);
					})}
			</div>
		</div>
	);
}
