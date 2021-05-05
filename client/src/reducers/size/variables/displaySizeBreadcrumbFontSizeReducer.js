import { SET_DISPLAY_SIZE_VARIABLES_BREADCRUMB_FONT_SIZE } from "../../../actions/constants/types";

// Default state for the current breadcrumb menu button text font size.
const initialState = null;

/**
 * Used to set current font size of the breadcrumb menu button text elements
 * 
 * @param {number} state - Number of current font size of the breadcrumb menu
 * button text elements
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {number} Number of current font size of the breadcrumb menu
 * button text elements to be stored in the size container of the redux state
 */
export default function displaySizeBreadcrumbFontSizeReducer(state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_VARIABLES_BREADCRUMB_FONT_SIZE:
			return action.fontSize;
		default:
			return state;
	}
}