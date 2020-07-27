import { SET_WHICH_NAVBAR_COMPONENTS_DISPLAY, SET_WHICH_ACCOUNT_MODALS_DISPLAY } from "./types";

// Navbar dropdowns
export const setWhichNavbarComponentsDisplay = (components) => (dispatch) => {
	dispatch({
		type: SET_WHICH_NAVBAR_COMPONENTS_DISPLAY,
		components: components,
	});
};

// Edit account modals
export const setWhichAccountModalsDisplay = (modals) => (dispatch) => {
	dispatch({
		type: SET_WHICH_ACCOUNT_MODALS_DISPLAY,
		modals: modals,
	});
};