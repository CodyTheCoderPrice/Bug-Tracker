import { SET_WHICH_PROJECT_COMPONENTS_DISPLAY, SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY } from "./types";

// Edit component displays
export const setWhichAccountComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		type: SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
		displays: displays,
	});
};

// Project component displays
export const setWhichProjectComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		type: SET_WHICH_PROJECT_COMPONENTS_DISPLAY,
		displays: displays,
	});
};