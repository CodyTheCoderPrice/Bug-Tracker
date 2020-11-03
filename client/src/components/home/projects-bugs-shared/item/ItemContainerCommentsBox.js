import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	generalContainerName,
	projectContainerName,
	bugContainerName,
	commentContainerName,
} from "../../../../reducers/containerNames";

import { createComment, clearInputErrors } from "../../../../actions";

import { toggleCharCountColor } from "../../../../utils/elementUtils";

import ItemContainerCommentsBoxIndividualComment from "./ItemContainerCommentsBoxIndividualComment";

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
		dispatch(createComment(commentInfo));
	};

	return (
		<div className="outer-dividing-container">
			<div className="item-box">
				<form noValidate onSubmit={handleSubmit}>
					<label htmlFor="create-comment-description">
						<h2 className="item-box__title item-box__title--no-bottom-margin">
							Comments
						</h2>
					</label>
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
							{reduxState[generalContainerName].inputErrors.description}
							{reduxState[generalContainerName].inputErrors.validation}
							{reduxState[generalContainerName].inputErrors.server}
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
