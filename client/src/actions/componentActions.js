import { ACCOUNT_CONTAINER, PROJECT_CONTAINER } from "./typeContainer";
import {
	SET_WHICH_CORE_COMPONENTS_DISPLAY,
	SET_WHICH_PROJECT_COMPONENTS_DISPLAY,
	SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
} from "./types";

export const setWhichCoreComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		type: SET_WHICH_CORE_COMPONENTS_DISPLAY,
		displays: displays,
	});
};

export const setWhichAccountComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
		reset: false,
		displays: displays,
	});
};

export const resetAccountComponentsDisplay = () => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
		reset: true,
	});
};

export const setWhichProjectComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: SET_WHICH_PROJECT_COMPONENTS_DISPLAY,
		reset: false,
		displays: displays,
	});
};

export const resetProjectComponentsDisplay = () => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
		reset: true,
	});
};
