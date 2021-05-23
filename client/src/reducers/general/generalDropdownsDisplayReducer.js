import { SET_WHICH_GENERAL_DROPDOWNS_DISPLAY } from "../../actions/constants/types";

// Initial state for which general dropdowns should be displayed by the app
const initialState = {
	// All the following relate to dropdown elements and if they should be displayed
	navbarHamburherDropdown: false,
	listViewSearchFilterSearchBarFilterDropdown: false,
	itemViewTopBarSortDropdown: false,
	itemViewTopBarFilterDropdown: false,
	itemViewTopBarOptionsDropdown: false,
};

/**
 * Used to set 'dropdownsDisplay' Object into GENERAL_CONTAINER of the redux 
 * state for which general dropdowns should be displayed by the app
 *
 * @param {{
 * 	navbarHamburherDropdown: boolean,
 * 	listViewSearchFilterSearchBarFilterDropdown: boolean,
 * 	itemViewTopBarSortDropdown: boolean,
 * 	itemViewTopBarFilterDropdown: boolean,
 * 	itemViewTopBarOptionsDropdown: boolean
 * }} state - Current Object for which general dropdowns are being displayed 
 * by the app
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	navbarHamburherDropdown: boolean,
 * 	listViewSearchFilterSearchBarFilterDropdown: boolean,
 * 	itemViewTopBarSortDropdown: boolean,
 * 	itemViewTopBarFilterDropdown: boolean,
 * 	itemViewTopBarOptionsDropdown: boolean
 * }} Object for which general dropdowns should be displayed by the app
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
