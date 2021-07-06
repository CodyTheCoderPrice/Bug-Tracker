import { SET_WHICH_LIST_COMPONENTS_DISPLAY } from "../../actions/constants/types";

// Initial state for either which project or bug components (reducer used for
// ...PROJECT_CONTAINER and BUG_CONTAINER) should be displayed by the app
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
 * Used to set 'componentsDisplay' Object into either PROJECT_CONATINER or 
 * BUG_CONTAINER (reducer used for both) of the redux state for either which 
 * project or bug components should be displayed by the app. If any expected
 * properties in action.displays (e.g. listView, itemView, ect.) are undefined,
 * then they will be set to false/null (depending on their type) in the state.
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
 * }} state - Current Object (in the redux state) for either which project or 
 * bug components (reducer used by PROJECT_CONTAINER and BUG_CONTAINER) are 
 * currently being displayed by the app
 * @param {Object} action - Object with a 'container' property (determins where 
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
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
 * }} Object for either which project or bug components (reducer used by
 * PROJECT_CONTAINER and BUG_CONTAINER) should be displayed by the app
 */
export default function listComponentsDisplayReducer(state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_LIST_COMPONENTS_DISPLAY:
			return {
				// Ternary operator is used to set undefined components to
				// ...false/null (depending on their type), so you only have to
				// ...pass the components you want to set to true/Object, which 
				// ...makes using this redux action easier
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
