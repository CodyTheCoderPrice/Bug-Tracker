import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/constants/types";

// Initial state for html element sizes that remain constant (after being set)
const initialState = {
	// All the following relate to CSS property sizes of different HTML elements.
	// ...They are set during a useEffect in Navbar component that calls several
	// ...functionas to their values.
	scrollbarWidth: null,
	navPanelTopContainerHeight: null,
	navbarAccountButtonWidth: null,
	navbarBreadcrumbComponentButtonArrowElementWidth: null,
	navbarBreadcrumbComponentButtonTextElementBaseFontSize: null,
	navbarHamburgerComponentCriticalStyles: null,
	listViewTopBarComponentHeight: null,
	listViewTableComponentRowElementHeight: null,
	itemViewComponentPaddingContainerElementLeftPadding: null,
	itemViewComponentOuterDividingContainerElementMinWidth: null,
	itemViewTopBarComponentHeight: null,
	itemViewListSidebarComponentContainerElementWithExpandedModifierWidth:
		null,
};

/**
 * Used to set 'constants' property containing constant html element sizes into
 * 'SIZE_CONTAINER' of the redux state.
 *
 * Note: The purpose of the 'constants' property is to get CSS property sizes
 * (that never change) for specific elements to be used by JS for resizing other
 * elements (e.g. resizing breadcrumb buttons in NavbarBreadcrumb component).
 * This keeps from having to refetch these CSS property sizes each time one of
 * the other elements needs resizing.
 *
 * @param {{
 * 	scrollbarWidth: (number|null),
 * 	navPanelTopContainerHeight: (number|null),
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
 * 	itemViewListSidebarComponentContainerElementWithExpandedModifierWidth: (number|null)
 * }} state - Current Object (in the redux state) for constant html element
 * sizes
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	scrollbarWidth: (number|null),
 * 	navPanelTopContainerHeight: (number|null),
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
 * 	itemViewListSidebarComponentContainerElementWithExpandedModifierWidth: (number|null)
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
				navPanelTopContainerHeight: action.sizes.navPanelTopContainerHeight,
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
				itemViewListSidebarComponentContainerElementWithExpandedModifierWidth:
					action.sizes
						.itemViewListSidebarComponentContainerElementWithExpandedModifierWidth,
			};
		default:
			return state;
	}
}
