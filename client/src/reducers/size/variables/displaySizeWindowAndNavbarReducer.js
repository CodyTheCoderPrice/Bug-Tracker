import { SET_DISPLAY_SIZE_VARIABLES_WINDOW_NAVBAR } from "../../../actions/constants/types";

// Default state for the current side of the Window and Navbar HTML elements
const initialState = {
	window: null,
	navbar: null,
};

/**
 * Used to set JSON containing current size info for the Window and Navbar
 * HTML elements
 * 
 * @param {JSON} state - JSON of current size info for the Window and Navbar
 * HTML elements
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} JSON of size info for the Window and Navbar HTML elements
 * to be stored in the size container of the redux state
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_VARIABLES_WINDOW_NAVBAR:
			return {
				window: action.sizes.window,
				navbar: action.sizes.navbar,

			};
		default:
			return state;
	}
}