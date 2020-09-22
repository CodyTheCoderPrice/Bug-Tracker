import { SET_WHICH_PROJECT_COMPONENTS_DISPLAY } from "../../actions/types";

const initialState = {
	listTable: true,
	listTableMassDeleteItemsModal: false,
	createItemSidbar: false,
	targetItem: null,
	viewItemModal: false,
	viewItemModalEditInfo: false,
	viewItemModalDelete: false,
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_PROJECT_COMPONENTS_DISPLAY:
			if (action.reset === true) {
				return initialState;
			} else {
				return {
					listTable:
						action.displays.listTable !== undefined
							? action.displays.listTable
							: false,
					listTableMassDeleteItemsModal:
						action.displays.listTableMassDeleteItemsModal !== undefined
							? action.displays.listTableMassDeleteItemsModal
							: false,
					createItemSidbar:
						action.displays.createItemSidbar !== undefined
							? action.displays.createItemSidbar
							: false,
					targetItem:
						action.displays.targetItem !== undefined
							? action.displays.targetItem
							: null,
					viewItemModal:
						action.displays.viewItemModal !== undefined
							? action.displays.viewItemModal
							: false,
					viewItemModalEditInfo:
						action.displays.viewItemModalEditInfo !== undefined
							? action.displays.viewItemModalEditInfo
							: false,
					viewItemModalDelete:
						action.displays.viewItemModalDelete !== undefined
							? action.displays.viewItemModalDelete
							: false,
				};
			}
		default:
			return state;
	}
}
