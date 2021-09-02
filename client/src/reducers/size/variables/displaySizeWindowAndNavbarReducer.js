import { SET_DISPLAY_SIZE_VARIABLES_WINDOW_NAVBAR } from "../../../actions/constants/types";

// Initial state for current size of Window element, and element with 'navbar'
// ...className in Navbar component. Both null since their size depends on the
// ...browser window size, which needs to be retrieved.
const initialState = {
	window: null,
	navbar: null,
};

/**
 * Used to set two properties in 'variables' property into 'SIZE_CONTAINER' of the 
 * redux state. First property being 'window' containing current size info for 
 * Window element. Second property being 'navbar' containing current size info 
 * for element with 'navbar' className in Navbar component.
 * 
 * Note: The purpose of these two properties is to be used for both resizing 
 * other elements (e.g. resizing breadcrumb buttons in NavbarBreadcrumb 
 * component), as well as deciding which elements are visible (e.g. deciding if
 * NavbarBreadcrumb component should be visible). This keeps from having to 
 * refetch these CSS property sizes each time one of the other elements needs 
 * to use them.
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
 * }} state - Current Object (in the redux state) for variable (changing) html
 * element sizes
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	window: ({ 
 * 		height: number, 
 * 		width: number 
 * 	}|null), 
 * 	navbar: ({ 
 * 		height: number, 
 * 		width: number 
 * 	}|null)
 * }} Object with two properties -- first being 'window' containing current 
 * size info for Window element; second being 'navbar' containing current size
 * info for element with 'navbar' className in Navbar component.
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