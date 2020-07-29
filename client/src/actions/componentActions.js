import { SET_WHICH_NAVBAR_COMPONENTS_DISPLAY, SET_WHICH_PROJECT_COMPONENTS_DISPLAY, SET_WHICH_ACCOUNT_MODALS_DISPLAY } from "./types";

// Navbar component displays
export const setWhichNavbarComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		type: SET_WHICH_NAVBAR_COMPONENTS_DISPLAY,
		displays: displays,
	});
};

// Project modal displays
export const setWhichProjectModalsDisplay = (displays) => (dispatch) => {
	dispatch({
		type: SET_WHICH_PROJECT_COMPONENTS_DISPLAY,
		displays: displays,
	});
};

// Edit account modal displays
export const setWhichAccountModalsDisplay = (displays) => (dispatch) => {
	dispatch({
		type: SET_WHICH_ACCOUNT_MODALS_DISPLAY,
		displays: displays,
	});
};