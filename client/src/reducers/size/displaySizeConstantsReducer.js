import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/constants/types";

// Default state for html element sizes that remain constant after being first set
const initialState = {
	// All the following relate to css sizes of different HTML elements. They
	// ...are set during a useEffect that calls functions to get their values
	scrollbarWidth: null,
	navbarAccountButtonWidth: null,
	navbarBreadcrumbArrowWidth: null,
	navbarBreadcrumbButtonTextBaseFontSize: null,
	navbarHamburgerStyles: null,
	listViewTopBarHeight: null,
	listViewTableRowHeight: null,
	itemViewTopBarHeight: null,
	itemViewListSidebarWidth: null,
	itemViewOuterDividingContainerMinWidth: null,
	itemViewPaddingContainerPadding: null,
};

/**
 * Used to set Object containing constant html element sizes in the size
 * container of the redux state
 * 
 * @param {Object} state - Object of constant html element sizes
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {Object} Object of constant html element sizes to be stored in the
 * size container of the redux state
 */
export default function displaySizeConstantsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_CONSTANTS:
			return {
				scrollbarWidth: action.sizes.scrollbarWidth,
				navbarAccountButtonWidth: action.sizes.navbarAccountButtonWidth,
				navbarBreadcrumbButtonTextBaseFontSize: action.sizes.navbarBreadcrumbButtonTextBaseFontSize,
				navbarBreadcrumbArrowWidth: action.sizes.navbarBreadcrumbArrowWidth,
				navbarHamburgerStyles: action.sizes.navbarHamburgerStyles,
				listViewTopBarHeight:
					action.sizes.listViewTopBarHeight,
				listViewTableRowHeight: action.sizes.listViewTableRowHeight,
				itemViewTopBarHeight: action.sizes.itemViewTopBarHeight,
				itemViewListSidebarWidth: action.sizes.itemViewListSidebarWidth,
				itemViewOuterDividingContainerMinWidth:
					action.sizes.itemViewOuterDividingContainerMinWidth,
				itemViewPaddingContainerPadding:
					action.sizes.itemViewPaddingContainerPadding,
			};
		default:
			return state;
	}
}
