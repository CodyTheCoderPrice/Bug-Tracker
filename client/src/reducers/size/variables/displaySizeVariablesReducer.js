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
 * Used to set JSON containing variable (changing) html element sizes in the
 * size container of the redux state
 *
 * @param {JSON} state - JSON of variable (changing) html element sizes used
 * mostly to calulcate the resizing of other html elements, but is sometimes
 * used for other things
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what to do in the redux state), and any data addition
 * data needed based on the container name and type (typically data to updated
 * in the redux state)
 * @returns {JSON} - JSON of variable (changing) html element sizes to be
 * stored in the size container of the redux state
 */
export default function sizeContainerReducer(state = initialState, action) {
	switch (action.container) {
		case SIZE_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of the redux state to default
			if (action.type === RESET_CONTAINER) {
				return initialState;
			} else {
				return {
					// Must pass JSON object conatining only window and navbar
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
