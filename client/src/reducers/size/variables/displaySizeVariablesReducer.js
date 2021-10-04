import displaySizeWindowAndNavbarReducer from "./displaySizeWindowAndNavbarReducer";
import displaySizeBreadcrumbFontSizeReducer from "./displaySizeBreadcrumbFontSizeReducer";

import { SIZE_CONTAINER } from "../../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../../actions/constants/types";

// Initial state for html element sizes that change
const initialState = {
	// Passing undefined and {} causes reducers to return their initial state
	...displaySizeWindowAndNavbarReducer(undefined, {}),
	navbarBreadcrumbButtonTextFontSize: displaySizeBreadcrumbFontSizeReducer(
		undefined,
		{}
	),
};

/**
 * Used to set 'variables' property containing variable (changing) html element 
 * sizes (mostly used to calculate resizing of other html elements) into 
 * 'SIZE_CONTAINER' of the redux state.
 * 
 * Note: The purpose of the 'variables' property is to get the current CSS 
 * property sizes (that change) for specific elements to be used by JS for both 
 * resizing other elements (e.g. resizing breadcrumb buttons in NavbarBreadcrumb 
 * component), as well as deciding which elements are visible (e.g. deciding if
 * NavbarBreadcrumb component should be visible). This keeps from having to 
 * refetch these CSS property sizes each time one of the other elements needs 
 * to use them. 
 *
 * @param {Object} state - Current Object (in the redux state) for variable 
 * (changing) html element sizes
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {Object} Object containing variable (changing) html element sizes
 */
export default function displaySizeVariablesReducer(state = initialState, action) {
	switch (action.container) {
		case SIZE_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of redux state containers to their initial state
			if (action.type === RESET_CONTAINER) {
				return initialState;
			} else {
				return {
					// Must pass '{ window: state.window, navbar: state.navbar }'
					// ...Object or else default return will be entire 
					// ...variables state
					...displaySizeWindowAndNavbarReducer(
						{ window: state.window, navbar: state.navbar },
						action
					),
					// Must pass 'state.navbarBreadcrumbButtonTextFontSize' or
					// ...else default return will be entire variables state
					navbarBreadcrumbButtonTextFontSize: displaySizeBreadcrumbFontSizeReducer(
						state.navbarBreadcrumbButtonTextFontSize,
						action
					),
				};
			}
		default:
			return state;
	}
}
