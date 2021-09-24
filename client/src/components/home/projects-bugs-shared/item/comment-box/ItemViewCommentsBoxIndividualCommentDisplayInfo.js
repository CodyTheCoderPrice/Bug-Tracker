import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	COMMENT_CONTAINER,
} from "../../../../../actions/constants/containerNames";

import { setWhichCommentComponentsDisplay } from "../../../../../actions";

import {
	formatDateMMddYYYY,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonItemViewCommentBoxIndividualCommentComponentIconButtonElementTextColorClassNameForLightOrDarkMode,
} from "../../../../../utils";

export default function ItemViewCommentsBoxIndividualCommentDisplayInfo(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const switchToEditingComment = () => {
		dispatch(
			setWhichCommentComponentsDisplay({
				commentBeingEdited: props.comment,
			})
		);
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
		<div>
			<div className="individual-comment-divider__internal-divider">
				<span
					className={getCommonTextColorClassNameForThemeWithLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
						reduxState[ACCOUNT_CONTAINER].settings.theme_color
					)}
				>
					{props.comment.description}
				</span>
			</div>
			<div className="individual-comment-divider__internal-divider">
				<span>{formatDateMMddYYYY(props.comment.creation_date)}</span>
				<div
					className={
						"comment-icon-button" +
						getCommonItemViewCommentBoxIndividualCommentComponentIconButtonElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
					alt="Button to begin editing the comment above"
					onClick={switchToEditingComment}
				>
					<i
						className="fa fa-pencil-square-o"
						aria-hidden="true"
						alt="Icon of a pencil"
					/>
				</div>
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
					<i
						className="fa fa-trash-o"
						aria-hidden="true"
						alt="Icon of a trash can"
					/>
				</div>
			</div>
		</div>
	);
}
