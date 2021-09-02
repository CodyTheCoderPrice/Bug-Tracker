import { SET_WHICH_GENERAL_DROPDOWNS_DISPLAY } from "../../actions/constants/types";

// Initial state for which general dropdowns should be displayed by the app
const initialState = {
	// All the following relate to dropdown elements and if they should be 
	// ...displayed. Each is named after the component the element they represent
	// ...is located in, followed by a summary of the CSS className of the 
	// ...element they represent (e.g. listViewTopBarFilterDropdown is in the
	// ...listViewTopBar component and represents an element with a className of
	// ...'filter-area-container__dropdown').
	navbarHambugerDropdown: false,
	listViewTopBarFilterDropdown: false,
	itemViewTopBarSortDropdown: false,
	itemViewTopBarFilterDropdown: false,
	itemViewTopBarOptionsDropdown: false,
};

/**
 * Used to set 'dropdownsDisplay' property into 'GENERAL_CONTAINER' of the redux 
 * state for which general dropdowns should be displayed by the app. If any 
 * expected properties in action.displays (e.g. navbarHambugerDropdown, 
 * itemViewTopBarSortDropdown, ect.) are undefined, then they will be set to 
 * false in the redux state.
 * 
 * Note: The purpose of each property inside this reducer is to be used as a 
 * flag for whether the dropdown element they represent (they are named after 
 * the component the element they represent is located in, followed by a summary 
 * of the CSS className of the element they represent) should be displayed by 
 * the app.
 *
 * @param {{
 * 	navbarHambugerDropdown: boolean,
 * 	listViewTopBarFilterDropdown: boolean,
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
 * 	navbarHambugerDropdown: boolean,
 * 	listViewTopBarFilterDropdown: boolean,
 * 	itemViewTopBarSortDropdown: boolean,
 * 	itemViewTopBarFilterDropdown: boolean,
 * 	itemViewTopBarOptionsDropdown: boolean
 * }} Object for which general dropdowns should be displayed by the app
 */
export default function generalDropdownsDisplayReducer(state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_GENERAL_DROPDOWNS_DISPLAY:
			return {
				// Ternary operator is used to set undefined properties to
				// ...false, so you only have to pass the properties you want
				// ...to set to true, which makes using this redux action easier
				navbarHambugerDropdown:
					action.displays.navbarHambugerDropdown !== undefined
						? action.displays.navbarHambugerDropdown
						: false,
				listViewTopBarFilterDropdown:
					action.displays.listViewTopBarFilterDropdown !==
					undefined
						? action.displays.listViewTopBarFilterDropdown
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
