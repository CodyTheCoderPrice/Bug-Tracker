import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generalContainerName, projectContainerName, bugContainerName, commentContainerName } from "../../../../reducers/containerNames";

import {
	clearInputErrors,
	deleteComment,
	setWhichCommentComponentsDisplay,
} from "../../../../actions";

import "../../../../SCSS/home/projects-bugs-shared/deleteModal.scss";

export default function ItemContainerCommentsBoxIndividualCommentDeleteModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// eslint-disable-next-line
	}, []);

	const deleteThisComment = () => {
		dispatch(
			deleteComment({
				id: reduxState[commentContainerName].componentsDisplay.targetComment.id,
				project_id: reduxState[projectContainerName].componentsDisplay.targetItem.id,
				bug_id: reduxState[bugContainerName].componentsDisplay.targetItem.id,
			})
		);
	};

	const closeDeleteCommentModal = () => {
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	return (
		<div className="delete-modal-component">
			<div className="blurred-background" />
			<div className="delete-account-modal">
				<div className="warning-container">
					<span className="warning-container__message">Are you sure?</span>
				</div>
				<span className="backend__errors">
					{reduxState[generalContainerName].inputErrors.server}
				</span>
				<div className="centered-buttons-container">
					<div
						className="centered-buttons-container__delete"
						onClick={deleteThisComment}
					>
						Delete
					</div>
					<div
						className="centered-buttons-container__cancel"
						onClick={closeDeleteCommentModal}
					>
						Cancel
					</div>
				</div>
			</div>
		</div>
	);
}