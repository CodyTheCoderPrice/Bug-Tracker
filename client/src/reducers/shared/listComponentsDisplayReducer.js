import { SET_WHICH_LIST_COMPONENTS_DISPLAY } from "../../actions/constants/types";

const initialState = {
	listView: false,
	listViewMassDeleteItemsModal: false,
	listViewCreateItemSidbar: false,
	itemView: false,
	itemViewEditItemInfo: false,
	itemViewDeleteModal: false,
	targetItem: null,
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_LIST_COMPONENTS_DISPLAY:
			return {
				listView:
					action.displays.listView !== undefined
						? action.displays.listView
						: false,
				listViewMassDeleteItemsModal:
					action.displays.listViewMassDeleteItemsModal !== undefined
						? action.displays.listViewMassDeleteItemsModal
						: false,
				listViewCreateItemSidbar:
					action.displays.listViewCreateItemSidbar !== undefined
						? action.displays.listViewCreateItemSidbar
						: false,
				itemView:
					action.displays.itemView !== undefined
						? action.displays.itemView
						: false,
				itemViewEditItemInfo:
					action.displays.itemViewEditItemInfo !== undefined
						? action.displays.itemViewEditItemInfo
						: false,
				itemViewDeleteModal:
					action.displays.itemViewDeleteModal !== undefined
						? action.displays.itemViewDeleteModal
						: false,
				targetItem:
					action.displays.targetItem !== undefined
						? action.displays.targetItem
						: null,
			};
		default:
			return state;
	}
}
