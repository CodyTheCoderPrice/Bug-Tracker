import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/constants/types";

// Default state for html element sizes that remain the same
const initialState = {
	scrollbar: null,
	navbarAccountButton: null,
	navbarProjectsButton: null,
	navbarBugsButton: null,
	listViewSearchFilterSortBar: null,
	listViewTableRowHeight: null,
	itemViewTopBar: null,
	itemViewListSidebar: null,
	itemViewOuterDividingContainerMinWidth: null,
	itemViewPaddingContainerPadding: null,
};

/**
 * Used to set JSON containing constant html element sizes in the size
 * container of the redux state
 * 
 * @param {JSON} state - JSON of constant html element sizes used mostly to
 * calulcate the resizing of other html elements, but is sometimes used for
 * other things
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
				scrollbar: action.sizes.scrollbar,
				navbarAccountButton: action.sizes.navbarAccountButton,
				navbarProjectsButton: action.sizes.navbarProjectsButton,
				navbarBugsButton: action.sizes.navbarBugsButton,
				listViewSearchFilterSortBar:
					action.sizes.listViewSearchFilterSortBar,
				listViewTableRowHeight: action.sizes.listViewTableRowHeight,
				itemViewTopBar: action.sizes.itemViewTopBar,
				itemViewListSidebar: action.sizes.itemViewListSidebar,
				itemViewOuterDividingContainerMinWidth:
					action.sizes.itemViewOuterDividingContainerMinWidth,
				itemViewPaddingContainerPadding:
					action.sizes.itemViewPaddingContainerPadding,
			};
		default:
			return state;
	}
}
