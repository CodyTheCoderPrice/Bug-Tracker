import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "../reducers/containerNames";
import { RESET_CONTAINER } from "./constants/types";

export const resetRedux = () => (dispatch) => {
	dispatch(resetSizeContainer());
	dispatch(resetGeneralContainer());
	dispatch(resetAccountContainer());
	dispatch(resetProjectContainer());
	dispatch(resetBugContainer());
	dispatch(resetCommentContainer());
};

export const resetSizeContainer = () => (dispatch) => {
	dispatch({
		container: SIZE_CONTAINER,
		type: RESET_CONTAINER,
	});
};

export const resetGeneralContainer = () => (dispatch) => {
	dispatch({
		container: GENERAL_CONTAINER,
		type: RESET_CONTAINER,
	});
};

export const resetAccountContainer = () => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: RESET_CONTAINER,
	});
};

export const resetProjectContainer = () => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: RESET_CONTAINER,
	});
};

export const resetBugContainer = () => (dispatch) => {
	dispatch({
		container: BUG_CONTAINER,
		type: RESET_CONTAINER,
	});
};

export const resetCommentContainer = () => (dispatch) => {
	dispatch({
		container: COMMENT_CONTAINER,
		type: RESET_CONTAINER,
	});
};