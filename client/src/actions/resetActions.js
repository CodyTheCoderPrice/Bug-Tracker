// Redux containers
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "./constants/containerNames";
// Redux types
import { RESET_CONTAINER } from "./constants/types";

/**
 * Resets the size container to its starting state
 */
export const resetSizeContainer = () => (dispatch) => {
	dispatch({
		container: SIZE_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets the general container to its starting state
 */
export const resetGeneralContainer = () => (dispatch) => {
	dispatch({
		container: GENERAL_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets the account container to its starting state
 */
export const resetAccountContainer = () => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets the project container to its starting state
 */
export const resetProjectContainer = () => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets the bug container to its starting state
 */
export const resetBugContainer = () => (dispatch) => {
	dispatch({
		container: BUG_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets the comment container to its starting state
 */
export const resetCommentContainer = () => (dispatch) => {
	dispatch({
		container: COMMENT_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets the all containers to their starting states
 */
export const resetRedux = () => (dispatch) => {
	dispatch(resetSizeContainer());
	dispatch(resetGeneralContainer());
	dispatch(resetAccountContainer());
	dispatch(resetProjectContainer());
	dispatch(resetBugContainer());
	dispatch(resetCommentContainer());
};