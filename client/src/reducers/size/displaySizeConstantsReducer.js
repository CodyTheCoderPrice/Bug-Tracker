import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/constants/types";

// Initial state for html element sizes that remain constant (after being set)
const initialState = {
	// All the following relate to css sizes of different HTML elements. They
	// ...are set during a useEffect in Navbar component that calls several
	// ...functionas to their values.
	scrollbarWidth: null,
	navbarAccountButtonWidth: null,
	navbarBreadcrumbArrowWidth: null,
	navbarBreadcrumbButtonTextBaseFontSize: null,
	navbarHamburgerStyles: null,
	listViewTopBarHeight: null,
	listViewTableRowHeight: null,
	itemViewTopBarHeight: null,
	itemViewListSidebarWidth: null,
	itemViewPaddingContainerPadding: null,
	itemViewOuterDividingContainerMinWidth: null,
};

/**
 * Used to set 'constants' Object containing constant html element sizes into
 * SIZE_CONTAINER of the redux state
 *
 * @param {{
 * 	scrollbarWidth: (number|null),
 * 	navbarAccountButtonWidth: (number|null),
 * 	navbarBreadcrumbButtonTextBaseFontSize: (number|null),
 * 	navbarBreadcrumbArrowWidth: (number|null),
 * 	navbarHamburgerStyles: ({
 * 		buttonLeft: number,
 * 		titleLeft: number,
 * 		titleBaseFontSize: number }|null),
 * 	listViewTopBarHeight: (number|null),
 * 	listViewTableRowHeight: (number|null),
 * 	itemViewTopBarHeight: (number|null),
 * 	itemViewListSidebarWidth: (number|null),
 *  itemViewPaddingContainerPadding: (number|null),
 * 	itemViewOuterDividingContainerMinWidth: (number|null)
 * }} state - Current Object (in the redux state) for constant html element
 * sizes
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	scrollbarWidth: (number|null),
 * 	navbarAccountButtonWidth: (number|null),
 * 	navbarBreadcrumbButtonTextBaseFontSize: (number|null),
 * 	navbarBreadcrumbArrowWidth: (number|null),
 * 	navbarHamburgerStyles: ({
 * 		buttonLeft: number,
 * 		titleLeft: number,
 * 		titleBaseFontSize: number }|null),
 * 	listViewTopBarHeight: (number|null),
 * 	listViewTableRowHeight: (number|null),
 * 	itemViewTopBarHeight: (number|null),
 * 	itemViewListSidebarWidth: (number|null),
 * itemViewPaddingContainerPadding: (number|null),
 * 	itemViewOuterDividingContainerMinWidth: (number|null)
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
				navbarBreadcrumbButtonTextBaseFontSize:
					action.sizes.navbarBreadcrumbButtonTextBaseFontSize,
				navbarBreadcrumbArrowWidth: action.sizes.navbarBreadcrumbArrowWidth,
				navbarHamburgerStyles: action.sizes.navbarHamburgerStyles,
				listViewTopBarHeight: action.sizes.listViewTopBarHeight,
				listViewTableRowHeight: action.sizes.listViewTableRowHeight,
				itemViewTopBarHeight: action.sizes.itemViewTopBarHeight,
				itemViewListSidebarWidth: action.sizes.itemViewListSidebarWidth,
				itemViewPaddingContainerPadding:
					action.sizes.itemViewPaddingContainerPadding,
				itemViewOuterDividingContainerMinWidth:
					action.sizes.itemViewOuterDividingContainerMinWidth,
			};
		default:
			return state;
	}
}
