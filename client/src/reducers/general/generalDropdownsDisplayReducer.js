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
	//		'list-view-top-bar-filter-button-component' (className) element
	//		sould have 'list-view-top-bar-filter-button-component--with-dropdown-displayed'
	//		modifier className appended.
	// When false:
	//		ListViewTopBar componet should not have ListViewTopBarFilterDropdown
	// 		component display.
	listViewTopBarFilterDropdownComponentShouldDisplay: false,
	// When true:
	//		ItemViewTopBar componet should have ItemViewTopBarFilterDropdown
	// 		component display. Also ItemViewTopBarFilterButton component's
	//		'item-view-top-bar-filter-button-component' (className) element
	//		sould have 'item-view-top-bar-filter-button-component--with-dropdown-displayed'
	//		modifier className appended.
	// When false:
	//		ItemViewTopBar componet should not have ItemViewTopBarFilterDropdown
	// 		component display.
	itemViewTopBarSortDropdownComponentShouldDisplay: false,
	// When true:
	//		ItemViewTopBar componet should have ItemViewTopBarSortDropdown
	// 		component display. Also ItemViewTopBarSortButton component's
	//		'item-view-top-bar-sort-button-component' (className) element
	//		sould have 'item-view-top-bar-sort-button-component--with-dropdown-displayed'
	//		modifier className appended.
	// When false:
	//		ItemViewTopBar componet should not have ItemViewTopBarSortDropdown
	// 		component display.
	itemViewTopBarFilterDropdownComponentShouldDisplay: false,
	// When true:
	//		ItemViewTopBar componet should have ItemViewTopBarOptionsDropdown
	// 		component display. Also ItemViewTopBarOptionsButton component's
	//		'item-view-top-bar-options-button-component' (className) element
	//		sould have the modifier className returned from 
	//		getItemViewTopBarOptionsButtonComponentWithDropdownDisplayedBorderBackgroundTextColorClassNameForLightOrDarkMode
	//		utils function appended.
	// When false:
	//		ItemViewTopBar componet should not have ItemViewTopBarOptionsDropdown
	// 		component display.
	itemViewTopBarOptionsDropdownComponentShouldDisplay: false,
};

/**
 * Uses 'displays' prop to set 'dropdownsDisplay' Object (to guide how general
 * dropdown components should display by the app) in 'GENERAL_CONTAINER' of the
 * redux state. If any properties in 'displays' prop are undefined, then they
 * will be set to false in 'dropdownsDisplay'.
 *
 * Note: The purpose of each boolean in 'dropdownsDisplay' Object are to be used
 * as flags for whether the dropdown components they represent should be 
 * displayed by the app. The reason undefined properties in 'displays' prop are
 * set to false in 'dropdownsDisplay' is to allow devs to only have to pass
 * properties they wish to set to true (making life easier).
 * 
 * @param {{
 * 	navbarHamburgerDropdownComponentShouldDisplay: boolean,
 * 	listViewTopBarFilterDropdownComponentShouldDisplay: boolean,
 * 	itemViewTopBarSortDropdownComponentShouldDisplay: boolean,
 * 	itemViewTopBarFilterDropdownComponentShouldDisplay: boolean,
 * 	itemViewTopBarOptionsDropdownComponentShouldDisplay: boolean
 * }} state - Current Object (in the redux state) for which general dropdown
 * components are being displayed by the app
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	navbarHamburgerDropdownComponentShouldDisplay: boolean,
 * 	listViewTopBarFilterDropdownComponentShouldDisplay: boolean,
 * 	itemViewTopBarSortDropdownComponentShouldDisplay: boolean,
 * 	itemViewTopBarFilterDropdownComponentShouldDisplay: boolean,
 * 	itemViewTopBarOptionsDropdownComponentShouldDisplay: boolean
 * }} Object for which general dropdown components should be displayed by the
 * app
 */
export default function generalDropdownsDisplayReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case SET_WHICH_GENERAL_DROPDOWNS_DISPLAY:
			return {
				navbarHamburgerDropdownComponentShouldDisplay:
					action.displays.navbarHamburgerDropdownComponentShouldDisplay !==
					undefined
						? action.displays.navbarHamburgerDropdownComponentShouldDisplay
						: false,
				listViewTopBarFilterDropdownComponentShouldDisplay:
					action.displays.listViewTopBarFilterDropdownComponentShouldDisplay !==
					undefined
						? action.displays.listViewTopBarFilterDropdownComponentShouldDisplay
						: false,
				itemViewTopBarSortDropdownComponentShouldDisplay:
					action.displays.itemViewTopBarSortDropdownComponentShouldDisplay !==
					undefined
						? action.displays.itemViewTopBarSortDropdownComponentShouldDisplay
						: false,
				itemViewTopBarFilterDropdownComponentShouldDisplay:
					action.displays.itemViewTopBarFilterDropdownComponentShouldDisplay !==
					undefined
						? action.displays.itemViewTopBarFilterDropdownComponentShouldDisplay
						: false,
				itemViewTopBarOptionsDropdownComponentShouldDisplay:
					action.displays.itemViewTopBarOptionsDropdownComponentShouldDisplay !== undefined
						? action.displays.itemViewTopBarOptionsDropdownComponentShouldDisplay
						: false,
			};
		default:
			return state;
	}
}
