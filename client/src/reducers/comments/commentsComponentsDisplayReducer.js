import { SET_WHICH_COMMENT_COMPONENTS_DISPLAY } from "../../actions/constants/types";

const initialState = {
	commentDeleteModal: false,
	targetComment: null,
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_COMMENT_COMPONENTS_DISPLAY:
			return {
				commentDeleteModal:
					action.displays.commentDeleteModal !== undefined
						? action.displays.commentDeleteModal
						: false,
				targetComment:
					action.displays.targetComment !== undefined
						? action.displays.targetComment
						: null,
			};
		default:
			return state;
	}
}