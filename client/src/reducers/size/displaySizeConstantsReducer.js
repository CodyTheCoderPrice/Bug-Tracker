import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/types";

const initialState = {
	home: null,
	scrollbar: null,
	navbarAccountButton: null,
	navbarProjectsButton: null,
	navbarBugsButton: null,
	itemContainerTopBar: null,
	itemContainerListSidebar: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_CONSTANTS:
			return {
				home: action.sizes.home,
				scrollbar: action.sizes.scrollbar,
				navbarAccountButton: action.sizes.navbarAccountButton,
				navbarProjectsButton: action.sizes.navbarProjectsButton,
				navbarBugsButton: action.sizes.navbarBugsButton,
				itemContainerTopBar: action.sizes.itemContainerTopBar,
				itemContainerListSidebar: action.sizes.itemContainerListSidebar,
			};
		default:
			return state;
	}
}
