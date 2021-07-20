import { SET_WHICH_LIST_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

// Initial state for either which project or bug components (reducer used for
// ...PROJECT_CONTAINER and BUG_CONTAINER) should be displayed by the app
const initialState = {
	// The following five relate to specific components and if they should be
	// ...displayed. Each of these five is named after the component they 
	// ...represent. Also listView and itemView properties should never both be
	// ...true at any given point in time, this includes between PROJECT_CONTAINER
	// ...and BUG_CONTAINER, meaning if a listView or itemView property is true 
	// ...in one container, they should both be false in the other container, or
	// ...else their components will cause CSS issues with one another if 
	// ...displayed simutaneously. A higher prioirty is given to listView as
	// ...ListView component for projects is the default displayed child 
	// ...component of the Home component.
	listView: false,
	// The following two properties should only be true if listView is also true
	listViewDeleteModal: false,
	listViewCreateItemSidbar: false,
	itemView: false,
	// This property should only be true if itemView is also true
	itemViewDeleteModal: false,
	// Is the current item attached to ItemView (i.e. itemViewCurrentItem
	/// ...property below) being edited. If false then ItemViewDisplayItemInfo
	// ...component should be displayed, otherwise ItemViewEditItemInfo component
	// ...should be displayed.
	itemViewEditItemInfo: false,
	// Which item is currently attached to the ItemView component. If this is 
	// ...null then itemView should be false.
	itemViewCurrentItem: null,
};

/**
 * Used to set 'componentsDisplay' property into either PROJECT_CONATINER or
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
 * Note: The purpose of the listView, listViewDeleteModal, listViewCreateItemSidbar,
 * itemView, and itemViewDeleteModal properties inside this reducer are to be 
 * used as flags for whether the components they represent (they share the same 
 * name, e.g. listView represents the ListView component) should be displayed by
 * the app. The purpose of itemViewEditItemInfo property is to be used to 
 * indaicate for ItemView component to display ItemViewDisplayItemInfo child 
 * component when false and ItemViewEditItemInfo child component when true. The
 * purpose of itemViewCurrentItem property is to be used to indicate which item
 * (project or bug) is currently attached to the ItemView component, so that 
 * item's info can be displayed in the ItemView component.
 * 
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

			// Makes sure listView and itemView properties are never both set to
			// ...true at any given point in time
			if (action.displays.listView === true && action.displays.itemView === true) {
				console.log(
					"Error: itemView and listView components were both attempted to be set to true in listComponentsDisplayReducer, which goes against their intended use. Only listView was set to true, as it has a higher priorirty."
				);

				action.displays["listView"] = true;
				action.displays["itemView"] = false;
			}

			// Makes sure itemView property is not set to true if 
			// ...itemViewCurrentItem will be set to null
			if (action.displays.itemView === true && action.displays.itemViewCurrentItem === null) {
				console.log(
					"Error: itemView was attempted to be set to true while itemViewCurrentItem was attempted to be set to null in listComponentsDisplayReducer, which goes against their intended use. So itemView was instead set to false."
				);

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

			// Makes sure none of ListView component's child component properties
			// ...are set to true while listView property is false
			if (action.displays.listView === false && keysOfListViewChildComponentsSetToTrue.length > 0) {
				console.log(
					"Error: " +
						getStringOfAllArrayValues(keysOfListViewChildComponentsSetToTrue) +
						(keysOfListViewChildComponentsSetToTrue.length > 1 ? " were" : " was") +
						" attempted to be set to true while listView was attempted to be set to false in listComponentsDisplayReducer, which goes against their intended use. So they were all set to false."
				);

				action.displays["listViewDeleteModal"] = false;
				action.displays["listViewCreateItemSidbar"] = false;
			}

			// Makes sure none of ItemView component's child component properties
			// ...are set to true while itemView property is false. This must be 
			// ...after the if statement blocks for ensuring listView and itemView 
			// ...properties are not both true simutaneously, as well as the if
			// ...statement block for ensuring itemView is not true while 
			// ...itemViewCurrentItem is null, as both of those blocks may 
			// ...change itemView property to false.
			if (action.displays.itemView === false && action.displays.itemViewDeleteModal === true) {
				console.log(
					"Error: itemViewDeleteModal was attempted to be set to true while itemView was attempted to be set to false in listComponentsDisplayReducer, which goes against their intended use. So they were both set to false."
				);

				action.displays["itemViewDeleteModal"] = false;
			}

			return {
				// Ternary operator is used to set undefined properties to
				// ...false/null (depending on their type), so you only have to
				// ...pass the properties you want to set to true/Object, which
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
