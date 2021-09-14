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
			const validatedDisplays = getValidatedDisplays(action.displays);

			return {
				listViewComponentShouldDisplay:
					validatedDisplays.listViewComponentShouldDisplay !== undefined
						? validatedDisplays.listViewComponentShouldDisplay
						: false,
				deleteModalComponentForListViewShouldDisplay:
					validatedDisplays.deleteModalComponentForListViewShouldDisplay !==
					undefined
						? validatedDisplays.deleteModalComponentForListViewShouldDisplay
						: false,
				listViewCreateItemSidbarComponentShouldDisplay:
					validatedDisplays.listViewCreateItemSidbarComponentShouldDisplay !==
					undefined
						? validatedDisplays.listViewCreateItemSidbarComponentShouldDisplay
						: false,
				itemViewComponentShouldDisplay:
					validatedDisplays.itemViewComponentShouldDisplay !== undefined
						? validatedDisplays.itemViewComponentShouldDisplay
						: false,
				deleteModalComponentForItemViewShouldDisplay:
					validatedDisplays.deleteModalComponentForItemViewShouldDisplay !==
					undefined
						? validatedDisplays.deleteModalComponentForItemViewShouldDisplay
						: false,
				itemViewEditItemInfoComponentShouldDisplay:
					validatedDisplays.itemViewEditItemInfoComponentShouldDisplay !==
					undefined
						? validatedDisplays.itemViewEditItemInfoComponentShouldDisplay
						: false,
				itemViewCurrentItem:
					validatedDisplays.itemViewCurrentItem !== undefined
						? validatedDisplays.itemViewCurrentItem
						: null,
			};
		default:
			return state;
	}
}

/**
 * Checks if 'displays' prop follows the rules. If valid, then it's returned
 * unchanged. If invalid, then a version that's altered to follow the rules
 * is returned.
 *
 * Note: Since this reducer is used separately by both the 'PROJECT_CONTAINER'
 * and 'BUG_CONTAINER', this means the fail safe to ensure only one of these
 * container's 'componentsDisplay' Object has any of their booleans as true at
 * any given point in time must be done outside this container. The code for
 * this fail safe is in ReduxFailSafeHookUtils Home.js was the
 * chosen location to do run this Fail Safe.
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
 * }} displays - 'action.displays' Object containing properties to guide how
 * list components should be displyed in the app.
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
 * }} Validated 'action.displays' Object containing properties to guide how
 * list components should be displyed in the app.
 */
function getValidatedDisplays(displays) {
	const newDisplays = displays;

	// Fail Safe #1
	if (
		displays.listViewComponentShouldDisplay === true &&
		displays.itemViewComponentShouldDisplay === true
	) {
		console.log(
			"FAIL SAFE: 'itemViewComponentShouldDisplay' and 'listViewComponentShouldDisplay' were both attempted to be set to true in the redux state, which goes against their intended use. Only 'listViewComponentShouldDisplay' was set to true (as it has a higher priorirty)."
		);

		displays["listViewComponentShouldDisplay"] = true;
		displays["itemViewComponentShouldDisplay"] = false;
	}

	// Fail Safe #2
	if (
		displays.itemViewComponentShouldDisplay === true &&
		displays.itemViewCurrentItem === null
	) {
		console.log(
			"FAIL SAFE: 'itemViewComponentShouldDisplay' was attempted to be set to true while 'itemViewCurrentItem' was attempted to be set to null in the redux state, which goes against their intended use. So 'itemViewComponentShouldDisplay' was instead set to false."
		);

		newDisplays["itemViewComponentShouldDisplay"] = false;
	}

	const keysOfListViewChildComponentsSetToTrue = Object.keys(
		filterObject(
			{
				deleteModalComponentForListViewShouldDisplay:
					displays.deleteModalComponentForListViewShouldDisplay,
				listViewCreateItemSidbarComponentShouldDisplay:
					displays.listViewCreateItemSidbarComponentShouldDisplay,
			},
			(boolean) => boolean === true
		)
	);

	// Fail Safe #3
	// "!== true" must be used instead of "=== false" as the property may be undefined
	if (
		displays.listViewComponentShouldDisplay !== true &&
		keysOfListViewChildComponentsSetToTrue.length > 0
	) {
		console.log(
			"FAIL SAFE: " +
				getStringOfAllArrayValues(
					keysOfListViewChildComponentsSetToTrue,
					true
				) +
				(keysOfListViewChildComponentsSetToTrue.length > 1 ? " were" : " was") +
				" attempted to be set to true while 'listViewComponentShouldDisplay' was not attempted to be set to true in the redux state, which goes against their intended use. So " +
				getStringOfAllArrayValues(
					keysOfListViewChildComponentsSetToTrue,
					true
				) +
				(keysOfListViewChildComponentsSetToTrue.length > 1 ? " were" : " was") +
				" set to false."
		);

		newDisplays["deleteModalComponentForListViewShouldDisplay"] = false;
		newDisplays["listViewCreateItemSidbarComponentShouldDisplay"] = false;
	} else if (keysOfListViewChildComponentsSetToTrue.length > 1) {
		console.log(
			"FAIL SAFE: 'deleteModalComponentForListViewShouldDisplay' and 'listViewCreateItemSidbarComponentShouldDisplay' were both attempted to be set to true in the redux state, which goes against their intended use. so both were set to false."
		);

		newDisplays["deleteModalComponentForListViewShouldDisplay"] = false;
		newDisplays["listViewCreateItemSidbarComponentShouldDisplay"] = false;
	}

	const keysOfItemViewChildComponentsSetToTrue = Object.keys(
		filterObject(
			{
				deleteModalComponentForItemViewShouldDisplay:
					displays.deleteModalComponentForItemViewShouldDisplay,
				itemViewEditItemInfoComponentShouldDisplay:
					displays.itemViewEditItemInfoComponentShouldDisplay,
			},
			(boolean) => boolean === true
		)
	);

	// Fail Safe #4
	// This fail safe must be after the first two as both may have changed
	// ...itemViewComponentShouldDisplay to false. Also "!== true" must be used
	// instead of "=== false" as the property may be undefined
	if (
		displays.itemViewComponentShouldDisplay !== true &&
		keysOfItemViewChildComponentsSetToTrue.length > 0
	) {
		console.log(
			"FAIL SAFE: " +
				getStringOfAllArrayValues(
					keysOfItemViewChildComponentsSetToTrue,
					true
				) +
				(keysOfItemViewChildComponentsSetToTrue.length > 1 ? " were" : " was") +
				" attempted to be set to true while 'itemViewComponentShouldDisplay' was not attempted to be set to true in the redux state, which goes against their intended use. So " +
				getStringOfAllArrayValues(
					keysOfItemViewChildComponentsSetToTrue,
					true
				) +
				(keysOfItemViewChildComponentsSetToTrue.length > 1 ? " were" : " was") +
				" set to false."
		);

		newDisplays["deleteModalComponentForItemViewShouldDisplay"] = false;
		newDisplays["itemViewEditItemInfoComponentShouldDisplay"] = false;
	}

	return newDisplays;
}
