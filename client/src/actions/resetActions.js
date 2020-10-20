import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "./typeContainer";
import { RESET_CONTAINER } from "./types";

export const resetRedux = () => (dispatch) => {
	dispatch(resetSizeContainer());
	dispatch(resetGeneralContainer());
	dispatch(resetAccountContainer());
	dispatch(resetProjectContainer());
	dispatch(resetBugContainer());
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