import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/constants/types";

// Default state for html element sizes that remain the same
const initialState = {
	scrollbarWidth: null,
	navbarAccountButtonWidth: null,
	navbarBreadcrumbArrowWidth: null,
	navbarBreadcrumbButtonTextBaseFontSize: null,
	navbarHamburgerStyles: null,
	listViewSearchFilterSortBarHeight: null,
	listViewTableRowHeight: null,
	itemViewTopBarHeight: null,
	itemViewListSidebarWidth: null,
	itemViewOuterDividingContainerMinWidth: null,
	itemViewPaddingContainerPadding: null,
};

/**
 * Used to set JSON containing constant html element sizes in the size
 * container of the redux state
 * 
 * @param {JSON} state - JSON of constant html element sizes
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what to do in the redux state), and any data addition
 * data needed based on the container name and type (typically data to updated
 * in the redux state)
 * @returns {JSON} - JSON of constant html element sizes to be stored in the
 * size container of the redux state
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_CONSTANTS:
			return {
				scrollbarWidth: action.sizes.scrollbarWidth,
				navbarAccountButtonWidth: action.sizes.navbarAccountButtonWidth,
				navbarBreadcrumbButtonTextBaseFontSize: action.sizes.navbarBreadcrumbButtonTextBaseFontSize,
				navbarBreadcrumbArrowWidth: action.sizes.navbarBreadcrumbArrowWidth,
				navbarHamburgerStyles: action.sizes.navbarHamburgerStyles,
				listViewSearchFilterSortBarHeight:
					action.sizes.listViewSearchFilterSortBarHeight,
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
