import { SET_WHICH_LIST_COMPONENTS_DISPLAY } from "../../actions/types";

const initialState = {
	listContainer: false,
	listContainerMassDeleteItemsModal: false,
	listContainerCreateItemSidbar: false,
	itemContainer: false,
	itemContainerEditInfo: false,
	itemContainerDeleteModal: false,
	targetItem: null,
	// Used to restore componentsDisplay back to it's prior state
	previousState: null,
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_LIST_COMPONENTS_DISPLAY:
			return {
				listContainer:
					action.displays.listContainer !== undefined
						? action.displays.listContainer
						: false,
				listContainerMassDeleteItemsModal:
					action.displays.listContainerMassDeleteItemsModal !== undefined
						? action.displays.listContainerMassDeleteItemsModal
						: false,
				listContainerCreateItemSidbar:
					action.displays.listContainerCreateItemSidbar !== undefined
						? action.displays.listContainerCreateItemSidbar
						: false,
				itemContainer:
					action.displays.itemContainer !== undefined
						? action.displays.itemContainer
						: false,
				itemContainerEditInfo:
					action.displays.itemContainerEditInfo !== undefined
						? action.displays.itemContainerEditInfo
						: false,
				itemContainerDeleteModal:
					action.displays.itemContainerDeleteModal !== undefined
						? action.displays.itemContainerDeleteModal
						: false,
				targetItem:
					action.displays.targetItem !== undefined
						? action.displays.targetItem
						: null,
				previousState:
					action.displays.previousState !== undefined
						? action.displays.previousState
						: null,
			};
		default:
			return state;
	}
}
