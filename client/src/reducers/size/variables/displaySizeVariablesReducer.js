import displaySizeWindowAndNavbarReducer from "./displaySizeWindowAndNavbarReducer";
import displaySizeBreadcrumbFontSizeReducer from "./displaySizeBreadcrumbFontSizeReducer";

import { SIZE_CONTAINER } from "../../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../../actions/constants/types";

// Default state for html element sizes that change
const initialState = {
	// passing 'undefined, {}' causes reducers to return their initial state
	...displaySizeWindowAndNavbarReducer(undefined, {}),
	navbarBreadcrumbButtonTextFontSize: displaySizeBreadcrumbFontSizeReducer(
		undefined,
		{}
	),
};

/**
 * Used to set Object containing variable (changing) html element sizes in the
 * size container of the redux state
 *
 * @param {Object} state - Object of variable (changing) html element sizes used
 * mostly to calulcate the resizing of other html elements, but is sometimes
 * used for other things
 * @param {Object} action - Object containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {Object} Object of variable (changing) html element sizes to be
 * stored in the size container of the redux state
 */
export default function displaySizeVariablesReducer(state = initialState, action) {
	switch (action.container) {
		case SIZE_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of the redux state to default
			if (action.type === RESET_CONTAINER) {
				return initialState;
			} else {
				return {
					// Must pass Object object conatining only window and navbar
					// ...or else default return will be entire variables state
					...displaySizeWindowAndNavbarReducer(
						{ window: state.window, navbar: state.navbar },
						action
					),
					// Must pass state.navbarBreadcrumbButtonTextFontSize or
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
