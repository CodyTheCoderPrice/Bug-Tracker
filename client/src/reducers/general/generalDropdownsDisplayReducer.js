import { SET_WHICH_GENERAL_DROPDOWNS_DISPLAY } from "../../actions/constants/types";

// Initial state for which general dropdowns should be displayed by the app
const initialState = {
	// When true: 
	//		NavbarHamburger componet should not have NavbarHamburgerButton 
	//		component display and instead have navbarHamburgerDropdown component
	// 		display.
	// When false: 
	//		NavbarHamburger component should have NavbarHamburgerButton component
	// 		display and not have navbarHamburgerDropdown component display.
	navbarHamburgerDropdownComponentShouldDisplay: false,
	// When true: 
	//		ListViewTopBar componet should have ListViewTopBarFilterDropdown 
	// 		component display. Also ListViewTopBarFilterButton component's
	//		'filter-button-component' (className) element sould have 
	//		'filter-button-component--with-dropdown' modifier className appended.
	// When false: 
	//		ListViewTopBarcomponet should not have ListViewTopBarFilterDropdown 
	// 		component display.
	listViewTopBarFilterDropdownComponentShouldDisplay: false,
	itemViewTopBarSortDropdown: false,
	itemViewTopBarFilterDropdown: false,
	itemViewTopBarOptionsDropdown: false,
};

/**
 * Uses 'displays' prop to set 'dropdownsDisplay' Object (to guide how general
 * dropdown elements should display by the app) in 'GENERAL_CONTAINER' of the
 * redux state. If any properties in 'displays' prop are undefined, then they
 * will be set to false in 'dropdownsDisplay'.
 *
 * Note: The purpose of each boolean in 'dropdownsDisplay' Object are to be used
 * as flags for whether the dropdown elements they represent (named after the
 * component the element is located in, followed by a summary of the CSS
 * className of the element, e.g. 'listViewTopBarFilterDropdownComponentShouldDisplay' represents an
 * element in ListViewTopBar component with a className of
 * 'filter-dropdown-component') should be displayed by the app. The reason
 * undefined properties in 'displays' prop are set to false in
 * 'dropdownsDisplay' is to allow devs to only have to pass properties they wish
 * to set to true (making life easier).
 *
 * @param {{
 * 	navbarHamburgerDropdownComponentShouldDisplay: boolean,
 * 	listViewTopBarFilterDropdownComponentShouldDisplay: boolean,
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
 * 	navbarHamburgerDropdownComponentShouldDisplay: boolean,
 * 	listViewTopBarFilterDropdownComponentShouldDisplay: boolean,
 * 	itemViewTopBarSortDropdown: boolean,
 * 	itemViewTopBarFilterDropdown: boolean,
 * 	itemViewTopBarOptionsDropdown: boolean
 * }} Object for which general dropdowns should be displayed by the app
 */
export default function generalDropdownsDisplayReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case SET_WHICH_GENERAL_DROPDOWNS_DISPLAY:
			return {
				// Ternary operator is used to set undefined properties to
				// ...false, so you only have to pass the properties you want
				// ...to set to true, which makes using this redux action easier
				navbarHamburgerDropdownComponentShouldDisplay:
					action.displays.navbarHamburgerDropdownComponentShouldDisplay !==
					undefined
						? action.displays.navbarHamburgerDropdownComponentShouldDisplay
						: false,
				listViewTopBarFilterDropdownComponentShouldDisplay:
					action.displays.listViewTopBarFilterDropdownComponentShouldDisplay !== undefined
						? action.displays.listViewTopBarFilterDropdownComponentShouldDisplay
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
