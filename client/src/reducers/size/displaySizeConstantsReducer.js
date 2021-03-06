import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/constants/types";

// Initial state for html element sizes that remain constant (after being set)
const initialState = {
	// All the following relate to css sizes of different HTML elements. They
	// ...are set during a useEffect in Navbar component that calls several
	// ...functionas to their values.
	scrollbarWidth: null,
	navbarAccountButtonWidth: null,
	navbarBreadcrumbComponentButtonArrowElementWidth: null,
	navbarBreadcrumbComponentButtonTextElementBaseFontSize: null,
	navbarHamburgerComponentCriticalStyles: null,
	listViewTopBarComponentHeight: null,
	listViewTableComponentRowElementHeight: null,
	itemViewComponentPaddingContainerElementLeftPadding: null,
	itemViewComponentOuterDividingContainerElementMinWidth: null,
	itemViewTopBarComponentHeight: null,
	itemViewListSidebarComponentWidth: null,
};

/**
 * Used to set 'constants' property containing constant html element sizes into
 * SIZE_CONTAINER of the redux state
 *
 * @param {{
 * 	scrollbarWidth: (number|null),
 * 	navbarAccountButtonWidth: (number|null),
 * 	navbarBreadcrumbComponentButtonTextElementBaseFontSize: (number|null),
 * 	navbarBreadcrumbComponentButtonArrowElementWidth: (number|null),
 * 	navbarHamburgerComponentCriticalStyles: ({
 * 		buttonLeft: number,
 * 		titleLeft: number,
 * 		titleBaseFontSize: number }|null),
 * 	listViewTopBarComponentHeight: (number|null),
 * 	listViewTableComponentRowElementHeight: (number|null),
 *  itemViewComponentPaddingContainerElementLeftPadding: (number|null),
 * 	itemViewComponentOuterDividingContainerElementMinWidth: (number|null),
 * 	itemViewTopBarComponentHeight: (number|null),
 * 	itemViewListSidebarComponentWidth: (number|null)
 * }} state - Current Object (in the redux state) for constant html element
 * sizes
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	scrollbarWidth: (number|null),
 * 	navbarAccountButtonWidth: (number|null),
 * 	navbarBreadcrumbComponentButtonTextElementBaseFontSize: (number|null),
 * 	navbarBreadcrumbComponentButtonArrowElementWidth: (number|null),
 * 	navbarHamburgerComponentCriticalStyles: ({
 * 		buttonLeft: number,
 * 		titleLeft: number,
 * 		titleBaseFontSize: number }|null),
 * 	listViewTopBarComponentHeight: (number|null),
 * 	listViewTableComponentRowElementHeight: (number|null),
 * 	itemViewComponentPaddingContainerElementLeftPadding: (number|null),
 * 	itemViewComponentOuterDividingContainerElementMinWidth: (number|null),
 * 	itemViewTopBarComponentHeight: (number|null),
 * 	itemViewListSidebarComponentWidth: (number|null)
 * }} Object containing constant html element sizes
 */
export default function displaySizeConstantsReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_CONSTANTS:
			return {
				scrollbarWidth: action.sizes.scrollbarWidth,
				navbarAccountButtonWidth: action.sizes.navbarAccountButtonWidth,
				navbarBreadcrumbComponentButtonTextElementBaseFontSize:
					action.sizes.navbarBreadcrumbComponentButtonTextElementBaseFontSize,
				navbarBreadcrumbComponentButtonArrowElementWidth:
					action.sizes.navbarBreadcrumbComponentButtonArrowElementWidth,
				navbarHamburgerComponentCriticalStyles:
					action.sizes.navbarHamburgerComponentCriticalStyles,
				listViewTopBarComponentHeight:
					action.sizes.listViewTopBarComponentHeight,
				listViewTableComponentRowElementHeight:
					action.sizes.listViewTableComponentRowElementHeight,
				itemViewComponentPaddingContainerElementLeftPadding:
					action.sizes.itemViewComponentPaddingContainerElementLeftPadding,
				itemViewComponentOuterDividingContainerElementMinWidth:
					action.sizes.itemViewComponentOuterDividingContainerElementMinWidth,
				itemViewTopBarComponentHeight:
					action.sizes.itemViewTopBarComponentHeight,
				itemViewListSidebarComponentWidth:
					action.sizes.itemViewListSidebarComponentWidth,
			};
		default:
			return state;
	}
}
