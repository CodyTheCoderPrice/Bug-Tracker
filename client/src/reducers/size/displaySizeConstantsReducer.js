import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/constants/types";

const initialState = {
	scrollbar: null,
	navbarAccountButton: null,
	navbarProjectsButton: null,
	navbarBugsButton: null,
	listcontainerSearchFilterSortBar: null,
	itemContainerTopBar: null,
	itemContainerListSidebar: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_CONSTANTS:
			return {
				scrollbar: action.sizes.scrollbar,
				navbarAccountButton: action.sizes.navbarAccountButton,
				navbarProjectsButton: action.sizes.navbarProjectsButton,
				navbarBugsButton: action.sizes.navbarBugsButton,
				listcontainerSearchFilterSortBar: action.sizes.listcontainerSearchFilterSortBar,
				itemContainerTopBar: action.sizes.itemContainerTopBar,
				itemContainerListSidebar: action.sizes.itemContainerListSidebar,
			};
		default:
			return state;
	}
}
