import axios from "axios";

import { COMMENT_CONTAINER } from "./constants/containers";
import { SET_COMMENTS } from "./constants/types";

import {
	setInputErrors,
	logoutAccount,
	setWhichCommentComponentsDisplay,
} from "./index";

export const setComments = (list) => (dispatch) => {
	dispatch({
		container: COMMENT_CONTAINER,
		type: SET_COMMENTS,
		list: list,
	});
};

export const createComment = (commentInfo) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/comment/create", { ...commentInfo, isEditing: false }, headers)
		.then((res) => {
			const { comments } = res.data;
			dispatch(setComments(comments));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const retrieveComments = () => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/comment/retrieve", null, headers)
		.then((res) => {
			const { comments } = res.data;
			dispatch(setComments(comments));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const updateComment = (commentInfo) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/comment/update", { ...commentInfo, isEditing: true }, headers)
		.then((res) => {
			const { comments } = res.data;
			dispatch(setComments(comments));
			dispatch(setWhichCommentComponentsDisplay({}));
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};

export const deleteComment = (commentInfo) => (dispatch) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/comment/delete", commentInfo, headers)
		.then((res) => {
			const { comments } = res.data;
			dispatch(setComments(comments));
			dispatch(
				setWhichCommentComponentsDisplay({
					commentBeingEdited:
						commentInfo.commentBeingEdited !== null &&
						commentInfo.commentBeingEdited.id !== commentInfo.id
							? commentInfo.commentBeingEdited
							: null,
				})
			);
		})
		.catch((err) => {
			dispatch(setInputErrors(err.response.data.inputErrors));

			if (err.response.data.inputErrors.jwToken !== undefined) {
				dispatch(logoutAccount());
			}
		});
};
