import displaySizeWindowAndMenusReducer from "./displaySizeWindowAndMenusReducer";

import { SIZE_CONTAINER } from "../../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../../actions/constants/types";

// Initial state for html element sizes that change
const initialState = {
	// Passing undefined and {} causes reducers to return their initial state
	...displaySizeWindowAndMenusReducer(undefined, {}),
};

/**
 * Used to set 'variables' property containing variable (i.e. changing) html
 * element sizes (mostly used to calculate resizing of other html elements) into
 * 'SIZE_CONTAINER' of the redux state.
 *
 * Note: The purpose of the 'variables' property is to get the current CSS
 * property sizes (that change) for specific elements to be used by JS for
 * resizing other elements (e.g. resizing 'overflow-container' elements in
 * NavPanelButtonList component). This keeps from having to
 * refetch these CSS property sizes each time one of the other elements needs
 * to use them.
 *
 * @param {(Object|undefined)} state - Current Object (in the redux state) for
 * variable (changing) html element sizes
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {Object} Object containing variable (i.e. changing) html element sizes
 */
export default function displaySizeVariablesReducer(
	state = initialState,
	action
) {
	switch (action.container) {
		case SIZE_CONTAINER:
			if (action.type === RESET_CONTAINER) {
				return initialState;
			} else {
				return {
					// Must pass '{ window: state.window, navPanel: state.navPanel, navbar: state.navbar }'
					// ...Object or else default return will be entire variables state
					...displaySizeWindowAndMenusReducer(
						{
							window: state.window,
							navPanel: state.navPanel,
							navbar: state.navbar,
						},
						action
					),
				};
			}
		default:
			return state;
	}
}
