import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
} from "../../../../reducers/containerNames";

import { updateProjectOrBug, clearInputErrors, setWhichCommentComponentsDisplay } from "../../../../actions";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";
import { toggleCharCountColor } from "../../../../utils/elementUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerCommentsBoxIndividualComment.scss";

export default function ItemContainerCommentsBoxIndividualComment(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [commentInfo, setCommentInfo] = useState({
		description: props.comment.description,
		// Following ids are used by the backend to ensure
		// ...the comment will belong to the correct account
		project_id: props.preventDefault,
		bug_id: props.bug_id,
	});

	const [descriptionCharLimit] = useState(500);

	const [editingComment, setEditingComment] = useState(false);

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		toggleCharCountColor(
			"js-create-comment-char-counter",
			commentInfo.description.length,
			descriptionCharLimit
		);
		// eslint-disable-next-line
	}, [commentInfo.description]);

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
		/* dispatch(
			updateProjectOrBug(
				props.reduxContainerName,
				commentInfoDeepCopy,
				reduxState[props.reduxContainerName].componentsDisplay
			)
		); */
	};

	const openDeleteCommentModal = () => {
		dispatch(
			setWhichCommentComponentsDisplay({
				commentDeleteModal: true,
				targetComment: props.comment,
			})
		);
	};

	return (
		<form noValidate onSubmit={handleSubmit}>
			<div className="comment-divider">
				{editingComment === false ? (
					<div>
						<div className="comment__block">
							<span className="comment__block__description">
								{props.comment.description}
							</span>
						</div>
						<div className="comment__block">
							<span className="comment__block__date">
								{formatDateMMddYYYY(props.comment.creation_date)}
							</span>
							<div className="comment_block__icon-button">
								<i className="fa fa-pencil-square-o" aria-hidden="true" />
							</div>
							<div className="comment_block__icon-button" onClick={openDeleteCommentModal}>
								<i className="fa fa-trash-o" aria-hidden="true" />
							</div>
						</div>
					</div>
				) : (
					<div>
						<span className="item-box__form-character-counter js-create-comment-char-counter">
							{commentInfo.description.length + "/" + descriptionCharLimit}
						</span>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							value={commentInfo.description}
							id="create-comment-description"
							className="item-box__form-textarea item-box__form-textarea--shorter"
						/>
						<span className="form-errors">
							{reduxState.generalContainer.inputErrors.description}
							{reduxState.generalContainer.inputErrors.validation}
							{reduxState.generalContainer.inputErrors.server}
						</span>
						<div className="form-submit-centering-container">
							<button
								type="submit"
								className="form-submit-centering-container__button"
							>
								Add Comment
							</button>
						</div>
					</div>
				)}
			</div>
		</form>
	);
}
