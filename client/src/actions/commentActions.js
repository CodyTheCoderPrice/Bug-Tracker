import axios from "axios";
import { setInputErrors } from "./index";
import { logoutAccount } from "./accountActions";
import { COMMENT_CONTAINER } from "./constants/containers";
import { SET_COMMENTS } from "./constants/types";

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
		.post("/api/comment/create", commentInfo, headers)
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
		.post("/api/comment/update", commentInfo, headers)
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

export const deleteComment = (id) => (
	dispatch
) => {
	const headers = { headers: { jwToken: localStorage.jwToken } };
	axios
		.post("/api/comment/delete", id, headers)
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