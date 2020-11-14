import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/constants/types";

const initialState = {
	scrollbar: null,
	navbarAccountButton: null,
	navbarProjectsButton: null,
	navbarBugsButton: null,
	listContainerSearchFilterSortBar: null,
	listContainerTableRowHeight: null,
	itemContainerTopBar: null,
	itemContainerListSidebar: null,
	itemContainerOuterDividingContainerMinWidth: null,
	itemContainerPaddingContainerPadding: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_CONSTANTS:
			return {
				scrollbar: action.sizes.scrollbar,
				navbarAccountButton: action.sizes.navbarAccountButton,
				navbarProjectsButton: action.sizes.navbarProjectsButton,
				navbarBugsButton: action.sizes.navbarBugsButton,
				listContainerSearchFilterSortBar:
					action.sizes.listContainerSearchFilterSortBar,
				listContainerTableRowHeight: action.sizes.listContainerTableRowHeight,
				itemContainerTopBar: action.sizes.itemContainerTopBar,
				itemContainerListSidebar: action.sizes.itemContainerListSidebar,
				itemContainerOuterDividingContainerMinWidth:
					action.sizes.itemContainerOuterDividingContainerMinWidth,
				itemContainerPaddingContainerPadding:
					action.sizes.itemContainerPaddingContainerPadding,
			};
		default:
			return state;
	}
}
