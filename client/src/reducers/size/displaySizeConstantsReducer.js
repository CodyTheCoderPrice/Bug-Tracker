import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/constants/types";

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
