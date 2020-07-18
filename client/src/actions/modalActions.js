import { SET_MODAL_COMPONENT } from "./types";

// Set popup component
export const setModalComponent = (component) => (dispatch) => {
	dispatch({
		type: SET_MODAL_COMPONENT,
		component: component
	});
};
