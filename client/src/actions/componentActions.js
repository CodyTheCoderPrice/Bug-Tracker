import {
	SET_WHICH_AUTH_COMPONENTS_DISPLAY,
	SET_WHICH_PROJECT_COMPONENTS_DISPLAY,
	SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
	SET_WHICH_MASS_DELETE_COMPONENTS_DISPLAY,
} from "./types";

export const setWhichAuthComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		type: SET_WHICH_AUTH_COMPONENTS_DISPLAY,
		displays: displays,
	});
};

export const setWhichAccountComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		type: SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
		reset: false,
		displays: displays,
	});
};

export const resetAccountComponentsDisplay = () => (dispatch) => {
	dispatch({
		type: SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
		reset: true,
	});
};

export const setWhichProjectComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		type: SET_WHICH_PROJECT_COMPONENTS_DISPLAY,
		reset: false,
		displays: displays,
	});
};

export const resetProjectComponentsDisplay = () => (dispatch) => {
	dispatch({
		type: SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
		reset: true,
	});
};

export const setWhichMassDeleteComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		type: SET_WHICH_MASS_DELETE_COMPONENTS_DISPLAY,
		displays: displays,
	});
};