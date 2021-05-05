import { SET_DISPLAY_SIZE_VARIABLES_WINDOW_NAVBAR } from "../../../actions/constants/types";

// Default state for the current side of the Window and Navbar HTML elements
const initialState = {
	window: null,
	navbar: null,
};

/**
 * Used to set Object containing current size info for the Window and Navbar
 * HTML elements
 * 
 * @param {{
 * 	window: ({ 
 * 		height: number, 
 * 		width: number 
 * 	}|null), 
 * 	navbar: ({ 
 * 		height: number, 
 * 		width: number 
 * 	}|null)
 * }} state - Object of current size info for the Window and Navbar
 * HTML elements
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {{
 * 	window: ({ 
 * 		height: number, 
 * 		width: number 
 * 	}|null), 
 * 	navbar: ({ 
 * 		height: number, 
 * 		width: number 
 * 	}|null)
 * }} Object of size info for the Window and Navbar HTML elements to be stored 
 * in the size container of the redux state
 */
export default function displaySizeWindowAndNavbarReducer(state = initialState, action) {
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