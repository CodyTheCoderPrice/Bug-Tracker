import axios from "axios";

// Redux containers
import { COMMENT_CONTAINER } from "./constants/containerNames";
// Redux types
import { SET_COMMENTS } from "./constants/types";
// Redux dispatch functions
import {
	createHeader,
	seBackendErrors,
	logoutAccount,
	setWhichCommentComponentsDisplay,
} from "./index";

/**
 * Sets the comments list inside the comment container of the redux state
 *
 * @param {Object} list - Object containing the comments list
 */
export const setComments = (list) => (dispatch) => {
	dispatch({
		container: COMMENT_CONTAINER,
		type: SET_COMMENTS,
		list: list,
	});
};

/**
 * Calls /api/comment/create route in order to create a new comment in
 * the database, then stores the updated commentss list in the comment
 * container of the redux state
 *
 * @param {Object} commentInfo - Object containing the info to create a new comment
 */
export const createComment = (commentInfo) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/comment/create", { ...commentInfo, isEditing: false }, header)
		.then((res) => {
			const { comments } = res.data;
			dispatch(setComments(comments));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls /api/comment/retrieve route to retrieve the comments list from the
 * database and store it in the comment container of the redux state
 */
export const retrieveComments = () => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/comment/retrieve", null, header)
		.then((res) => {
			const { comments } = res.data;
			dispatch(setComments(comments));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls /api/comment/update route to update a comment in the database, store
 * the updated comments list in the comment container of the redux state, and
 * close edit mode for the comment
 *
 * @param {Object} commentInfo - Object containing the info to create a new comment
 */
export const updateComment = (commentInfo) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/comment/update", { ...commentInfo, isEditing: true }, header)
		.then((res) => {
			const { comments } = res.data;
			dispatch(setComments(comments));

			// comment edit was succesful, so closing the edit mode
			dispatch(setWhichCommentComponentsDisplay({}));
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};

/**
 * Calls /api/comment/delete route to delete a comment in the database, store
 * the updated comments list in the comment containers in the redux state, and
 * close the commentDeleteModal
 * 
 * @param {Object} idJson - Object containing the id of the comment to be deleted
 * and the id of the bug and project the it belongs to
 * @param {Object} commentBeingEdited - Object containing the info a comment being
 * edited (if one is, otherwise value is null)
 */
export const deleteComment = (idJson, commentBeingEdited) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/comment/delete", idJson, header)
		.then((res) => {
			const { comments } = res.data;
			dispatch(setComments(comments));

			// comment deletion was succesful, so closing the commentDeleteModal
			dispatch(
				setWhichCommentComponentsDisplay({
					commentBeingEdited:
						commentBeingEdited !== null && commentBeingEdited.id !== idJson.id
							? commentBeingEdited
							: null,
				})
			);
		})
		.catch((err) => {
			// sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
			}
		});
};
