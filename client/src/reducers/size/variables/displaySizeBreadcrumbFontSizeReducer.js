import { SET_DISPLAY_SIZE_VARIABLES_BREADCRUMB_FONT_SIZE } from "../../../actions/constants/types";

// Initial state for what the current font size of elements with 
// ...'breadcrumb-button__text' className in NavbarBreadcrumb component. Null
// ...since default value is in CSS file and retrieved after element is created.
const initialState = null;

/**
 * Used to set number of what the current font size of elements with 
 * 'breadcrumb-button__text' className in NavbarBreadcrumb component into 
 * SIZE_CONTAINER of the redux state
 * 
 * @param {number} state - Current number (in the redux state) of what the 
 * current font size of elements with 'breadcrumb-button__text' className in
 * NavbarBreadcrumb component
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {number} Number of what the current font size of elements with 
 * 'breadcrumb-button__text' className in NavbarBreadcrumb component
 */
export default function displaySizeBreadcrumbFontSizeReducer(state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_VARIABLES_BREADCRUMB_FONT_SIZE:
			return action.fontSize;
		default:
			return state;
	}
}