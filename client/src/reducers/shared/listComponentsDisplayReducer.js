import { SET_WHICH_LIST_COMPONENTS_DISPLAY } from "../../actions/constants/types";

// Default state for either which project or bug components (reducer used by
// ...both containers) should be displayed by the app
const initialState = {
	// The following four relate to components and if they should be displayed
	listView: false,
	// Should DeleteModal for ListView be displayed
	listViewDeleteModal: false,
	listViewCreateItemSidbar: false,
	itemView: false,
	// Is the current item for ItemView being edited
	itemViewEditItemInfo: false,
	// Should DeleteModal for ItemView be displayed
	itemViewDeleteModal: false,
	// Which item is currently attachted to the itemView
	itemViewCurrentItem: null,
};

/**
 * Used to set Object in either the project or bug container (reducer used by
 * both) of the redux state for either which project or bug components should
 * display by the app
 *
 * @param {{
 * 	listView: boolean,
 * 	listViewDeleteModal: boolean,
 * 	listViewCreateItemSidbar: boolean,
 * 	itemView: boolean,
 * 	itemViewEditItemInfo: boolean,
 * 	itemViewDeleteModal: boolean,
 * 	itemViewCurrentItem: ({
 * 		account_id: number,
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: (string|undefined),
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		last_edited_timestamp: string
 * 	}|null)
 * }} state - Object for either which project or bug components
 * (reducer used by both containers) are currently being displayed by the app
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {{
 * 	listView: boolean,
 * 	listViewDeleteModal: boolean,
 * 	listViewCreateItemSidbar: boolean,
 * 	itemView: boolean,
 * 	itemViewEditItemInfo: boolean,
 * 	itemViewDeleteModal: boolean,
 * 	itemViewCurrentItem: ({
 * 		account_id: number,
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: (string|undefined),
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		last_edited_timestamp: string
 * 	}|null)
 * }} Object for either which project or bug components (reducer
 * used by both containers) should display by the app, to be stored in either
 * the project or bug container of the redux state
 */
export default function listComponentsDisplayReducer(state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_LIST_COMPONENTS_DISPLAY:
			return {
				// Ternary operator is used to set undefined components to
				// ...false, so you only have to pass the components you want
				// ...to set to true, to make using this redux action easier
				listView:
					action.displays.listView !== undefined
						? action.displays.listView
						: false,
				listViewDeleteModal:
					action.displays.listViewDeleteModal !== undefined
						? action.displays.listViewDeleteModal
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
				itemViewCurrentItem:
					action.displays.itemViewCurrentItem !== undefined
						? action.displays.itemViewCurrentItem
						: null,
			};
		default:
			return state;
	}
}
