import { SET_WHICH_LIST_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

// Initial state for either which project or bug components (reducer used for
// ...PROJECT_CONTAINER and BUG_CONTAINER) should be displayed by the app
const initialState = {
	// The following five relate to specific components and if they should be
	// ...displayed. Also listView and itemView components should never both be
	// ...true at any given point in time, this includes between PROJECT_CONTAINER
	// ...and BUG_CONTAINER, meaning if a listView or itemView componet is true 
	// ...in one container, they should both be false in the other container, or
	// ...else they will cause CSS issues. A higher prioirty is given to listView
	// ...as ListView component for projects is the default displayed child 
	// ...component of the Home component.
	listView: false,
	// The following two component should only be true if listView is also true
	listViewDeleteModal: false,
	listViewCreateItemSidbar: false,
	itemView: false,
	// This component should only be true if itemView is also true
	itemViewDeleteModal: false,
	// Is the current item for ItemView being edited (this decides whether
	// ...itemViewDisplayItemInfo or itemViewEditItemInfo component displays)
	itemViewEditItemInfo: false,
	// Which item is currently attachted to the itemView
	itemViewCurrentItem: null,
};

/**
 * Used to set 'componentsDisplay' Object into either PROJECT_CONATINER or
 * BUG_CONTAINER (reducer used for both) of the redux state for either which
 * project or bug components should be displayed by the app. At most, 
 * actions.displays should have one of either its listView or itemView properties
 * set to true. If both are set to true in aciton.displays, then listView will
 * take priorty and itemView will be set to false in the redux state. Also
 * actions.displays should not have listView's child components (i.e. 
 * listViewDeleteModal & listViewCreateItemSidbar) set to true if listView is 
 * not. Neither should itemView's child component (i.e. itemViewDeleteModal) be
 * set to true if itemView is not. If this is the case for either of them, then
 * their child components will be set to false in the redux state. If any 
 * expected properties in action.displays (e.g. listView, itemView, ect.) are 
 * undefined, then they will be set to false/null (depending on their type) in
 * the redux state.
 *
 * @param {{
 * 	listView: boolean,
 * 	listViewDeleteModal: boolean,
 * 	listViewCreateItemSidbar: boolean,
 * 	itemView: boolean,
 * 	itemViewDeleteModal: boolean,
 * 	itemViewEditItemInfo: boolean,
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
 * 	itemViewDeleteModal: boolean,
 * 	itemViewEditItemInfo: boolean,
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
export default function listComponentsDisplayReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case SET_WHICH_LIST_COMPONENTS_DISPLAY:
			// Note: Since this reducer is used separately both by the PROJECT_CONTAINER
			// ...and BUG_CONTAINER, this reducer can not manage both of their
			// ...states at once. Meaning the check to ensure if listView or 
			// ...itemView is true in one container, then neither are true in the
			// ...other, must be done outside of this reducer. App.js was the
			// ...chosen location to do this check.

			// Makes sure listView and itemView components are never both set to
			// ...true at any given point in time
			if (action.displays.listView === true && action.displays.itemView === true) {
				console.log(
					"Error: itemView and listView components were both attempted to be set to true in listComponentsDisplayReducer, which goes against their intended use. Only listView was set to true, as it has a higher priorirty."
				);

				action.displays["listView"] = true;
				action.displays["itemView"] = false;
			}

			let listViewChildComponentsSetToTrue = filterObject(
				{
					listViewDeleteModal: action.displays.listViewDeleteModal,
					listViewCreateItemSidbar: action.displays.listViewCreateItemSidbar,
				},
				(boolean) => boolean === true
			);	

			const keysOfListViewChildComponentsSetToTrue = Object.keys(
				listViewChildComponentsSetToTrue
			);

			// Makes sure none of listView's child components are set to true
			// while listView is not true
			if (action.displays.listView !== true && keysOfListViewChildComponentsSetToTrue.length > 0) {
				console.log(
					"Error: " +
						getStringOfAllArrayValues(keysOfListViewChildComponentsSetToTrue) +
						(keysOfListViewChildComponentsSetToTrue.length > 1 ? " were" : " was") +
						" attempted to be set to true while listView was attempted to be set to false in listComponentsDisplayReducer, which goes against their intended use. So they were all set to false."
				);

				action.displays["listViewDeleteModal"] = false;
				action.displays["listViewCreateItemSidbar"] = false;
			}

			// Makes sure none of itemView's child components are set to true
			// ...while itemView is not true. This must be after if statement
			// ...block for ensuring listView and itemView components are not 
			// ...both true simutaneously, as that block may set itemView to false
			if (action.displays.itemView !== true && action.displays.itemViewDeleteModal === true) {
				console.log(
					"Error: itemViewDeleteModal was attempted to be set to true while itemView was attempted to be set to false in listComponentsDisplayReducer, which goes against their intended use. So they were both set to false."
				);

				action.displays["itemViewDeleteModal"] = false;
			}

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
				itemViewDeleteModal:
					action.displays.itemViewDeleteModal !== undefined
						? action.displays.itemViewDeleteModal
						: false,
				itemViewEditItemInfo:
					action.displays.itemViewEditItemInfo !== undefined
						? action.displays.itemViewEditItemInfo
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
