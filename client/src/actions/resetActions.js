// Container names used to work with the redux state
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "./constants/containerNames";
import { RESET_CONTAINER } from "./constants/types";

/**
 * Resets 'SIZE_CONTAINER' of the redux state to its initial state
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(resetSizeContainer());
 */
export const resetSizeContainer = () => (dispatch) => {
	dispatch({
		container: SIZE_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets 'GENERAL_CONTAINER' of the redux state to its initial state
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(resetGeneralContainer());
 */
export const resetGeneralContainer = () => (dispatch) => {
	dispatch({
		container: GENERAL_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets 'ACCOUNT_CONTAINER' of the redux state to its initial state
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(resetAccountContainer());
 */
export const resetAccountContainer = () => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets 'PROJECT_CONTAINER' of the redux state to its initial state
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(resetProjectContainer());
 */
export const resetProjectContainer = () => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets 'BUG_CONTAINER' of the redux state to its initial state
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(resetBugContainer());
 */
export const resetBugContainer = () => (dispatch) => {
	dispatch({
		container: BUG_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets 'COMMENT_CONTAINER' of the redux state to its initial state
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(resetCommentContainer());
 */
export const resetCommentContainer = () => (dispatch) => {
	dispatch({
		container: COMMENT_CONTAINER,
		type: RESET_CONTAINER,
	});
};

/**
 * Resets all containers (e.g. 'SIZE_CONTAINER', 'GENERAL_CONTAINER', ect.) of the 
 * redux state to their initial states
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(resetRedux());
 */
export const resetRedux = () => (dispatch) => {
	dispatch(resetSizeContainer());
	dispatch(resetGeneralContainer());
	dispatch(resetAccountContainer());
	dispatch(resetProjectContainer());
	dispatch(resetBugContainer());
	dispatch(resetCommentContainer());
};