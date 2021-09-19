import React from "react";
import { useSelector } from "react-redux";
import { COMMENT_CONTAINER } from "../../../../actions/constants/containerNames";

// Other components used by this component
import ItemViewCommentsBoxIndividualCommentDisplayInfo from "./ItemViewCommentsBoxIndividualCommentDisplayInfo";
import ItemViewCommentsBoxIndividualCommentEditInfo from "./ItemViewCommentsBoxIndividualCommentEditInfo";

export default function ItemViewCommentsBoxIndividualComment(props) {
	const reduxState = useSelector((state) => state);

	return (
		<div className="individual-comment-divider">
			{reduxState[COMMENT_CONTAINER].componentsDisplay.commentBeingEdited ===
				null ||
			reduxState[COMMENT_CONTAINER].componentsDisplay.commentBeingEdited.id !==
				props.comment.id ? (
				<ItemViewCommentsBoxIndividualCommentDisplayInfo
					comment={props.comment}
				/>
			) : (
				<ItemViewCommentsBoxIndividualCommentEditInfo comment={props.comment} />
			)}
		</div>
	);
}
