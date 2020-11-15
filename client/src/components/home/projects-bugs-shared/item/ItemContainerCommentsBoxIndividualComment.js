import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	generalContainerName,
	projectContainerName,
	bugContainerName,
	commentContainerName,
} from "../../../../reducers/containerNames";

import {
	updateComment,
	clearInputErrors,
	setWhichCommentComponentsDisplay,
} from "../../../../actions";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";

import { useSubmitFormOnEnter } from "../../../../utils/submitFormOnEnterHookUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerCommentsBoxIndividualComment.scss";

export default function ItemContainerCommentsBoxIndividualComment(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [commentInfo, setCommentInfo] = useState({
		description: props.comment.description,
		// Following ids are used by the backend to ensure
		// ...the comment will belong to the correct account
		project_id:
			reduxState[projectContainerName].componentsDisplay.targetItem.id,
		bug_id: reduxState[bugContainerName].componentsDisplay.targetItem.id,
	});

	const [descriptionCharLimit] = useState(500);

	// Custome hook will cause form to submit whenever the enter key is pressed
	useSubmitFormOnEnter("js-edit-comment-form");

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// eslint-disable-next-line
	}, []);

	// Resets commentInfo when commentBeingEdited changes so changed
	// ...descriptions don't persist when cancel button is clicked
	// ...and when the comment list size changes since components
	// ...will not belond to the correct comment anymore
	useEffect(() => {
		setCommentInfo({
			// Default commentInfo values
			description: props.comment.description,
			project_id:
				reduxState[projectContainerName].componentsDisplay.targetItem.id,
			bug_id: reduxState[bugContainerName].componentsDisplay.targetItem.id,
		});
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[commentContainerName].componentsDisplay.commentBeingEdited,
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

		dispatch(
			updateComment({
				...commentInfo,
				id:
					reduxState[commentContainerName].componentsDisplay.commentBeingEdited
						.id,
			})
		);
	};

	const switchToEditingComment = () => {
		dispatch(
			setWhichCommentComponentsDisplay({
				commentBeingEdited: props.comment,
			})
		);
	};

	const cancelEditingComment = () => {
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	const openDeleteCommentModal = () => {
		dispatch(
			setWhichCommentComponentsDisplay({
				commentBeingEdited:
					reduxState[commentContainerName].componentsDisplay.commentBeingEdited,
				commentDeleteModal: true,
				commentToBeDeleted: props.comment,
			})
		);
	};

	return (
		<form className="js-edit-comment-form" noValidate onSubmit={handleSubmit}>
			<div className="comment-divider">
				{reduxState[commentContainerName].componentsDisplay
					.commentBeingEdited === null ||
				reduxState[commentContainerName].componentsDisplay.commentBeingEdited
					.id !== props.comment.id ? (
					<div>
						<div className="comment__block">
							<span className="comment__block__description">
								{props.comment.description}
							</span>
						</div>
						<div className="comment__block">
							<span>{formatDateMMddYYYY(props.comment.creation_date)}</span>
							<div
								className="comment__block__icon-button"
								onClick={switchToEditingComment}
							>
								<i className="fa fa-pencil-square-o" aria-hidden="true" />
							</div>
							<div
								className="comment__block__icon-button"
								onClick={openDeleteCommentModal}
							>
								<i className="fa fa-trash-o" aria-hidden="true" />
							</div>
						</div>
					</div>
				) : (
					<div>
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
							id="edit-comment-description"
							className="item-box__form-textarea item-box__form-textarea--shorter"
						/>
						<span>{formatDateMMddYYYY(props.comment.creation_date)}</span>
						<div
							className="comment__block__icon-button"
							onClick={openDeleteCommentModal}
						>
							<i className="fa fa-trash-o" aria-hidden="true" />
						</div>
						<div className="comment__centering-container">
							<div className="comment__centering-container__pair-container">
								<div
									className="comment__centering-container__pair-container__submit-edit-button"
									onClick={handleSubmit}
								>
									Edit Comment
								</div>
								<div
									className="comment__centering-container__pair-container__cancel-button"
									onClick={cancelEditingComment}
								>
									Cancel
								</div>
							</div>
						</div>
						<div className="edit-comment-form-errors-container">
							<span className="form-errors">
								{
									reduxState[generalContainerName].inputErrors
										.validationEditCommentDescription
								}
								{reduxState[generalContainerName].inputErrors.validationComment}
								{reduxState[generalContainerName].inputErrors.serverItem}
							</span>
						</div>
					</div>
				)}
			</div>
		</form>
	);
}
