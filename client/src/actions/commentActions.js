import axios from "axios";
// Container names used to work with the redux state
import { COMMENT_CONTAINER } from "./constants/containerNames";
import { SET_COMMENTS } from "./constants/types";
// Dispatch functions
import {
	createHeader,
	seBackendErrors,
	logoutAccount,
	setWhichCommentComponentsDisplay,
} from "./index";

/**
 * Sets the comments list in 'list' Object in COMMENT_CONTAINER of the redux
 * state
 *
 * @param {{ 
 * 	id: number, 
 * 	bug_id: number, 
 * 	description: string,
 * 	creation_date: string, 
 * 	last_edited_timestamp: string
 * }[]} commentList - Array of Objects containing the comments list
 * 
 * @example
 * // Sets a list of two comments belonging to a bug with the id 50. The 
 * // ...dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	setComments([{ 
 * 		id: 92, 
 * 		bug_id: 50, 
 * 		description: "Problem may be with the versions of the database", 
 * 		creation_date: "2019-03-16T04:00:00.000Z", 
 * 		last_edited_timestamp: "1552759689" 
 * 	}, { 
 * 		id: 93, 
 * 		bug_id: 50, 
 * 		description: "Clearing data on phone helped", 
 * 		creation_date: "2019-03-17T04:00:00.000Z", 
 * 		last_edited_timestamp: "1552846089" 
 * 	}])
 * );
 */
export const setComments = (commentList) => (dispatch) => {
	dispatch({
		container: COMMENT_CONTAINER,
		type: SET_COMMENTS,
		// Property called 'list' instead of 'commentList' for consistency with 
		// ...setProjects (projectActions file) and setBugs (bugActions file).
		// ...Look at documentation in those functions for their reasoning. 
		list: commentList,
	});
};

/**
 * Calls /api/comment/create route in order to create a new comment in the 
 * database, and if succesful, then stores the updated comments list in 'list'
 * Object in COMMENT_CONTAINER of the redux state
 *
 * @param {{ 
 * 	description: string, 
 * 	project_id: number, 
 * 	bug_id: number 
 * }} commentInfo - Object containing the info to create a new comment
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	createComment({ 
 * 		project_id: 326, 
 * 		bug_id: 50 
 * 		"Problem may be with the versions of the database", 
 * 	})
 * );
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
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls /api/comment/retrieve route to retrieve the comments list from the
 * database, and if successful, then stores it in 'list' Object in 
 * COMMENT_CONTAINER of the redux state
 * 
 * @example
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(retrieveComments());
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
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls /api/comment/update route to update a comment in the database, and if 
 * successful, then stores the updated comments list in 'list' Object in 
 * COMMENT_CONTAINER of the redux state, and closes edit mode for the comment
 *
 * @param {{ 
 * 	id: number 
 * 	project_id: number, 
 * 	bug_id: number, 
 * 	description: string, 
 * }} commentInfo - Object containing the info to create a new comment
 * 
 * { description: "test", project_id: 326, bug_id: 50, id: 187 }
 * @example
 * // updates comment with id 92 to have the following data. The dispatch 
 * // ...function is from useDispatch() imported from react-redux.
 * dispatch(
 * 	updateComment({ 
 * 		id: 92, 
 * 		project_id: 326, 
 * 		bug_id: 50, 
 * 		description: "Bug may be with the database version" });
 */
export const updateComment = (commentInfo) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/comment/update", { ...commentInfo, isEditing: true }, header)
		.then((res) => {
			const { comments } = res.data;
			dispatch(setComments(comments));

			// Comment edit was successful, so sets comment components to null,
			// ... which closing the edit mode
			dispatch(setWhichCommentComponentsDisplay({}));
		})
		.catch((err) => {
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};

/**
 * Calls /api/comment/delete route to delete a comment in the database, and if
 * successful, then stores the updated comments list in 'list' Object in 
 * COMMENT_CONTAINER in the redux state, and closes the CommentDeleteModal 
 * component
 * 
 * @param {{ 
 * 	id: number, 
 * 	project_id: number, 
 * 	bug_id: number 
 * }} idsObject - Object containing the id of the comment to be deleted, and 
 * the ids of the project and bug it belongs to
 * @param {({ 
 * 	id: number, 
 * 	bug_id: number, 
 * 	description: string, 
 * 	creation_date: string, 
 * 	last_edited_timestamp: string 
 * 	}|null)} commentBeingEdited - Object containing the info of the comment 
 * being edited (if no comment is being edited, then null). This is needed
 * since it may need to be updated to null in the redux state if the to be 
 * deleted comment is the current commentBeingEdited
 * 
 * @example
 * // Deletes comment and keeps commentBeingEdited the same (since deleted 
 * // ...comment was not the comment being edited) in the redux state
 * dispatch(
 * 	deleteComment({ 
 * 		id: 194, 
 * 		project_id: 326, 
 * 		bug_id: 50 
 * 	}, { 
 * 		id: 93, 
 * 		bug_id: 50, 
 * 		description: "Clearing data on phone helped", 
 * 		creation_date: "2019-03-17T04:00:00.000Z", 
 * 		last_edited_timestamp: "1552846089" 
 * 	})
 * );
 * 
 * @example
 * // Deletes comment and updates commentBeingEdit to null (since deleted 
 * // ...comment was the comment being edited) in the redux state
 * dispatch(
 * 	deleteComment({ 
 * 		id: 194, 
 * 		project_id: 326, 
 * 		bug_id: 50 
 * 	}, { 
 * 		id: 194, 
 * 		bug_id: 50, 
 * 		description: "Maybe a syntax error", 
 * 		creation_date: "2019-03-19T04:00:00.000Z", 
 * 		last_edited_timestamp: "1553028644" 
 * 	})
 * );
 */
export const deleteComment = (idsObject, commentBeingEdited) => (dispatch) => {
	const header = createHeader();
	axios
		.post("/api/comment/delete", idsObject, header)
		.then((res) => {
			const { comments } = res.data;
			dispatch(setComments(comments));

			// Comment deletion successful, so setting commentBeingDeleted to 
			// ...null, which closes CommentDeleteModal component. If delted 
			// ...comment is same as commentBeingEdited, it is also set to null,
			// ...otherwise it's kept the same
			dispatch(
				setWhichCommentComponentsDisplay({ 
					commentBeingEdited:
						commentBeingEdited !== null && commentBeingEdited.id !== idsObject.id
							? commentBeingEdited
							: null,
				})
			);
		})
		.catch((err) => {
			// Sets backend errors for what went wrong to be displayed to user
			dispatch(seBackendErrors(err.response.data.backendErrors));

			if (err.response.data.backendErrors.jwToken !== undefined) {
				// jwToken was invalid (likely expired), so user is logged out
				dispatch(logoutAccount());
				console.log("Logged out user due to invalid/expired jwToken");
			}
		});
};
