import { SET_WHICH_GENERAL_DROPDOWNS_DISPLAY } from "../../actions/constants/types";

// Default state for which general dropdowns should be displayed by the app
const initialState = {
	// All the following relate to dropdown elements and if they should be displayed
	navbarHamburherDropdown: false,
	listViewSearchFilterSearchBarFilterDropdown: false,
	itemViewTopBarSortDropdown: false,
	itemViewTopBarFilterDropdown: false,
	itemViewTopBarOptionsDropdown: false,
};

/**
 * Used to set JSON in the general container of the redux state for which
 * general dropdowns should display by the app
 *
 * @param {JSON} state - JSON for which general dropdowns are currently being
 * displayed by the app
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} JSON for which general dropdowns should display by the
 * app to be stored in the general container of the redux state
 */
export default function generalDropdownsDisplayReducer(state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_GENERAL_DROPDOWNS_DISPLAY:
			return {
				// Ternary operator is used to set undefined dropdown elements to
				// ...their default, so you only have to pass the dropdown elements
				// ...you want to set differently, to make using this redux
				// ...action easier
				navbarHamburherDropdown:
					action.displays.navbarHamburherDropdown !== undefined
						? action.displays.navbarHamburherDropdown
						: false,
				listViewSearchFilterSearchBarFilterDropdown:
					action.displays.listViewSearchFilterSearchBarFilterDropdown !==
					undefined
						? action.displays.listViewSearchFilterSearchBarFilterDropdown
						: false,
				itemViewTopBarSortDropdown:
					action.displays.itemViewTopBarSortDropdown !== undefined
						? action.displays.itemViewTopBarSortDropdown
						: false,
				itemViewTopBarFilterDropdown:
					action.displays.itemViewTopBarFilterDropdown !== undefined
						? action.displays.itemViewTopBarFilterDropdown
						: false,
				itemViewTopBarOptionsDropdown:
					action.displays.itemViewTopBarOptionsDropdown !== undefined
						? action.displays.itemViewTopBarOptionsDropdown
						: false,
			};
		default:
			return state;
	}
}
