import { SET_NAVBAR_DROPDOWN_COMPONENTS, SET_ACCOUNT_MODAL_COMPONENTS } from "./types";

// Navbar dropdowns
export const setNavbarDropdownComponents = (components) => (dispatch) => {
	dispatch({
		type: SET_NAVBAR_DROPDOWN_COMPONENTS,
		components: components,
	});
};

// Edit account modals
export const setAccountModalComponents = (components) => (dispatch) => {
	dispatch({
		type: SET_ACCOUNT_MODAL_COMPONENTS,
		components: components,
	});
};