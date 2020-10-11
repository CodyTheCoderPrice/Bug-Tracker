import { SET_DISPLAY_SIZE_CONSTANTS } from "../../actions/types";

const initialState = {
	home: null,
	scrollbar: null,
	itemContainerTopBar: null,
	itemContainerListSidebar: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_DISPLAY_SIZE_CONSTANTS:
			return {
				home: action.sizes.home,
				scrollbar: action.sizes.scrollbar,
				itemContainerTopBar: action.sizes.itemContainerTopBar,
				itemContainerListSidebar: action.sizes.itemContainerListSidebar,
			};
		default:
			return state;
	}
}