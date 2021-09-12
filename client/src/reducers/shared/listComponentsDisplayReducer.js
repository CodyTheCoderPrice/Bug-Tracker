import { SET_WHICH_LIST_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

// Initial state for either which project or bug components (reducer used for
// ...'PROJECT_CONTAINER' and 'BUG_CONTAINER') should be displayed by the app
const initialState = {
	// The following five relate to specific components and if they should be
	// ...displayed. Each of these five is named after the component they
	// ...represent. Also listViewComponentShouldDisplay and itemViewComponentShouldDisplay properties should never both be
	// ...true at any given point in time, this includes between 'PROJECT_CONTAINER'
	// ...and 'BUG_CONTAINER', meaning if a listViewComponentShouldDisplay or itemViewComponentShouldDisplay property is true
	// ...in one container, they should both be false in the other container, or
	// ...else their components will cause CSS issues with one another if
	// ...displayed simutaneously. A higher prioirty is given to listViewComponentShouldDisplay as
	// ...ListView component for projects is the default displayed child
	// ...component of the Home component.
	listViewComponentShouldDisplay: false,
	// The following two properties should only be true if listViewComponentShouldDisplay is also true
	deleteModalComponentForListViewShouldDisplay: false,
	listViewCreateItemSidbarComponentShouldDisplay: false,
	itemViewComponentShouldDisplay: false,
	// This property should only be true if itemViewComponentShouldDisplay is also true
	deleteModalComponentForItemViewShouldDisplay: false,
	// Is the current item attached to ItemView (i.e. itemViewCurrentItem
	/// ...property below) being edited. If false then ItemViewDisplayItemInfo
	// ...component should be displayed, otherwise ItemViewEditItemInfo component
	// ...should be displayed.
	itemViewEditItemInfoComponentShouldDisplay: false,
	// Which item is currently attached to the ItemView component. If this is
	// ...null then itemViewComponentShouldDisplay should be false.
	itemViewCurrentItem: null,
};

/**
 * Used to set 'componentsDisplay' property into either 'PROJECT_CONTAINER' or
 * 'BUG_CONTAINER' (reducer used for both) of the redux state for either which
 * project or bug components should be displayed by the app. At most,
 * actions.displays should have one of either its listViewComponentShouldDisplay or itemViewComponentShouldDisplay properties
 * set to true. If both are set to true in aciton.displays, then listViewComponentShouldDisplay will
 * take priorty and itemViewComponentShouldDisplay will be set to false in the redux state. Also
 * actions.displays should not have listViewComponentShouldDisplay's child components (i.e.
 * deleteModalComponentForListViewShouldDisplay & listViewCreateItemSidbarComponentShouldDisplay) set to true if listViewComponentShouldDisplay is
 * not. Neither should itemViewComponentShouldDisplay's child component (i.e. deleteModalComponentForItemViewShouldDisplay) be
 * set to true if itemViewComponentShouldDisplay is not. If this is the case for either of them, then
 * their child components will be set to false in the redux state. If any
 * expected properties in action.displays (e.g. listViewComponentShouldDisplay, itemViewComponentShouldDisplay, ect.) are
 * undefined, then they will be set to false/null (depending on their type) in
 * the redux state.
 *
 * Note: The purpose of the listViewComponentShouldDisplay, deleteModalComponentForListViewShouldDisplay, listViewCreateItemSidbarComponentShouldDisplay,
 * itemViewComponentShouldDisplay, and deleteModalComponentForItemViewShouldDisplay properties inside this reducer are to be
 * used as flags for whether the components they represent (they share the same
 * name, e.g. listViewComponentShouldDisplay represents the ListView component) should be displayed by
 * the app. The purpose of itemViewEditItemInfoComponentShouldDisplay property is to be used to
 * indaicate for ItemView component to display ItemViewDisplayItemInfo child
 * component when false and ItemViewEditItemInfo child component when true. The
 * purpose of itemViewCurrentItem property is to be used to indicate which item
 * (project or bug) is currently attached to the ItemView component, so that
 * item's info can be displayed in the ItemView component.
 *
 * deleteModalComponentForListViewShouldDisplay is for mass deleteing items
 *
 *
 * @param {{
 * 	listViewComponentShouldDisplay: boolean,
 * 	deleteModalComponentForListViewShouldDisplay: boolean,
 * 	listViewCreateItemSidbarComponentShouldDisplay: boolean,
 * 	itemViewComponentShouldDisplay: boolean,
 * 	deleteModalComponentForItemViewShouldDisplay: boolean,
 * 	itemViewEditItemInfoComponentShouldDisplay: boolean,
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
 * bug components (reducer used by 'PROJECT_CONTAINER' and 'BUG_CONTAINER') are
 * currently being displayed by the app
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	listViewComponentShouldDisplay: boolean,
 * 	deleteModalComponentForListViewShouldDisplay: boolean,
 * 	listViewCreateItemSidbarComponentShouldDisplay: boolean,
 * 	itemViewComponentShouldDisplay: boolean,
 * 	deleteModalComponentForItemViewShouldDisplay: boolean,
 * 	itemViewEditItemInfoComponentShouldDisplay: boolean,
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
 * 'PROJECT_CONTAINER' and 'BUG_CONTAINER') should be displayed by the app
 */
export default function listComponentsDisplayReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case SET_WHICH_LIST_COMPONENTS_DISPLAY:
			// Note: Since this reducer is used separately both by the 'PROJECT_CONTAINER'
			// ...and 'BUG_CONTAINER', this reducer can not manage both of their
			// ...states at once. Meaning the check to ensure if listViewComponentShouldDisplay or
			// ...itemViewComponentShouldDisplay is true in one container, then neither are true in the
			// ...other, must be done outside of this reducer. App.js was the
			// ...chosen location to do this check.

			// Makes sure listViewComponentShouldDisplay and itemViewComponentShouldDisplay properties are never both set to
			// ...true at any given point in time
			if (
				action.displays.listViewComponentShouldDisplay === true &&
				action.displays.itemViewComponentShouldDisplay === true
			) {
				console.log(
					"FAIL SAFE: 'itemViewComponentShouldDisplay' and 'listViewComponentShouldDisplay' components were both attempted to be set to true in the redux state which goes against their intended use. Only 'listViewComponentShouldDisplay' was set to true (as it has a higher priorirty)."
				);

				action.displays["listViewComponentShouldDisplay"] = true;
				action.displays["itemViewComponentShouldDisplay"] = false;
			}

			// Makes sure itemViewComponentShouldDisplay property is not set to true if
			// ...itemViewCurrentItem will be set to null
			if (
				action.displays.itemViewComponentShouldDisplay === true &&
				action.displays.itemViewCurrentItem === null
			) {
				console.log(
					"FAIL SAFE: 'itemViewComponentShouldDisplay' was attempted to be set to true while 'itemViewCurrentItem' was attempted to be set to null in the redux state which goes against their intended use. So 'itemViewComponentShouldDisplay' was instead set to false."
				);

				action.displays["itemViewComponentShouldDisplay"] = false;
			}

			let listViewChildComponentsSetToTrue = filterObject(
				{
					deleteModalComponentForListViewShouldDisplay:
						action.displays.deleteModalComponentForListViewShouldDisplay,
					listViewCreateItemSidbarComponentShouldDisplay:
						action.displays.listViewCreateItemSidbarComponentShouldDisplay,
				},
				(boolean) => boolean === true
			);

			const keysOfListViewChildComponentsSetToTrue = Object.keys(
				listViewChildComponentsSetToTrue
			);

			// Makes sure none of ListView component's child component properties
			// ...are set to true while listViewComponentShouldDisplay property is false
			if (
				action.displays.listViewComponentShouldDisplay === false &&
				keysOfListViewChildComponentsSetToTrue.length > 0
			) {
				console.log(
					"FAIL SAFE: " +
						getStringOfAllArrayValues(keysOfListViewChildComponentsSetToTrue) +
						(keysOfListViewChildComponentsSetToTrue.length > 1
							? " were"
							: " was") +
						" attempted to be set to true while 'listViewComponentShouldDisplay' was attempted to be set to false in the redux state which goes against their intended use. So they were all set to false."
				);

				action.displays["deleteModalComponentForListViewShouldDisplay"] = false;
				action.displays[
					"listViewCreateItemSidbarComponentShouldDisplay"
				] = false;
			}

			// Makes sure none of ItemView component's child component properties
			// ...are set to true while itemViewComponentShouldDisplay property is false. This must be
			// ...after the if statement blocks for ensuring listViewComponentShouldDisplay and itemViewComponentShouldDisplay
			// ...properties are not both true simutaneously, as well as the if
			// ...statement block for ensuring itemViewComponentShouldDisplay is not true while
			// ...itemViewCurrentItem is null, as both of those blocks may
			// ...change itemViewComponentShouldDisplay property to false.
			if (
				action.displays.itemViewComponentShouldDisplay === false &&
				action.displays.deleteModalComponentForItemViewShouldDisplay === true
			) {
				console.log(
					"FAIL SAFE: 'deleteModalComponentForItemViewShouldDisplay' was attempted to be set to true while 'itemViewComponentShouldDisplay' was attempted to be set to false in the redux state which goes against their intended use. So they were both set to false."
				);

				action.displays["deleteModalComponentForItemViewShouldDisplay"] = false;
			}

			return {
				// Ternary operator is used to set undefined properties to
				// ...false/null (depending on their type), so you only have to
				// ...pass the properties you want to set to true/Object, which
				// ...makes using this redux action easier
				listViewComponentShouldDisplay:
					action.displays.listViewComponentShouldDisplay !== undefined
						? action.displays.listViewComponentShouldDisplay
						: false,
				deleteModalComponentForListViewShouldDisplay:
					action.displays.deleteModalComponentForListViewShouldDisplay !==
					undefined
						? action.displays.deleteModalComponentForListViewShouldDisplay
						: false,
				listViewCreateItemSidbarComponentShouldDisplay:
					action.displays.listViewCreateItemSidbarComponentShouldDisplay !==
					undefined
						? action.displays.listViewCreateItemSidbarComponentShouldDisplay
						: false,
				itemViewComponentShouldDisplay:
					action.displays.itemViewComponentShouldDisplay !== undefined
						? action.displays.itemViewComponentShouldDisplay
						: false,
				deleteModalComponentForItemViewShouldDisplay:
					action.displays.deleteModalComponentForItemViewShouldDisplay !==
					undefined
						? action.displays.deleteModalComponentForItemViewShouldDisplay
						: false,
				itemViewEditItemInfoComponentShouldDisplay:
					action.displays.itemViewEditItemInfoComponentShouldDisplay !==
					undefined
						? action.displays.itemViewEditItemInfoComponentShouldDisplay
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
