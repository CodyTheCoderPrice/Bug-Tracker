import { SET_WHICH_LIST_AND_ITEM_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

// Initial state for either which project or bug components (reducer used for
// ...'PROJECT_CONTAINER' and 'BUG_CONTAINER') should be displayed by the app
const initialState = {
	listViewComponentShouldDisplay: false,
	deleteModalComponentForListViewShouldDisplay: false,
	listViewCreateItemSidbarComponentShouldDisplay: false,
	itemViewComponentShouldDisplay: false,
	deleteModalComponentForItemViewShouldDisplay: false,
	// This boolean impacts two components. If true, then ItemViewEditItemInfo
	// component should be displayed. If false, then ItemViewDisplayItemInfo
	// component should be displayed.
	itemViewEditItemInfoComponentShouldDisplay: false,
	itemViewCurrentItem: null,
};

/**
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how list
 * and item components should display by the app) into either 'PROJECT_CONTAINER'
 * or 'BUG_CONTAINER' (reducer used for both) of the redux state. If any
 * properties in 'displays' prop are undefined, then they will be set to false
 * (if a boolean) or null (if an Object) in 'componentsDisplay'.
 *
 * Rules: The 'displays' prop should have at most only one of
 * 'listViewComponentShouldDisplay' and 'itemViewComponentShouldDisplay'
 * booleans as true. If 'itemViewComponentShouldDisplay' is true, then
 * 'itemViewCurrentItem' must be set to an Object containing the item to be
 * displayed. Only if 'listViewComponentShouldDisplay' is true, then at most
 * only one of 'deleteModalComponentForListViewShouldDisplay' and
 * 'listViewCreateItemSidbarComponentShouldDisplay' should be true, otherwise
 * both should be false. Only if 'itemViewComponentShouldDisplay' is true, then
 * at most only one of 'deleteModalComponentForItemViewShouldDisplay' and
 * 'itemViewEditItemInfoComponentShouldDisplay' should be true, otherwise both
 * should be false. If the 'displays' prop does not follow the rules then a
 * fail safe will alter it to do so (in the reducer). Also only one of the
 * 'componentsDisplay' Objects in both 'PROJECT_CONTAINER' and 'BUG_CONTAINER'
 * of the redux state at a time should have any booleans as true. Also exactly
 * one of 'listViewComponentShouldDisplay' and 'itemViewComponentShouldDisplay'
 * booleans at a time in either 'componentsDisplay' Object must be true. Fail
 * safes for these two rules take place outside the reducer via functions from
 * reduxFailSafeHookUtils.js file because the reducers are not set up to manage
 * Objects within multiple containers at once.
 *
 * Note: The purpose of each booleans in 'componentsDisplay' Object with names
 * ending in '...ShouldDisplay' are to be used as flags for whether the
 * components they represent should be displayed by the app. The reason there
 * are rules that some booleans can only be true if another specifc boolean is
 * true is becasue of CSS dependencies (i.e. one of the components they represent
 * relies on the other to display properly) or they were designed to appear
 * along side one another. The reason there are rules that some booleans are not
 * allowed to be true at the same time is either to prevent CSS issues (i.e.
 * their components will break each others intended design) or because it makes
 * sense to seperate their component's functionalities (e.g. users should not be
 * able to create new items while viewing a specific item). It should be noted
 * that when 'itemViewEditItemInfoComponentShouldDisplay' is false, then
 * ItemViewDisplayItemInfo component should display instead. Also the difference
 * between how DeleteModal component works for ListView as opposed to ItemView
 * is that ListView allows for deleting multiple items at once, while ItemView
 * only allows for deleting its specific item. Also the reason undefined
 * properties in 'displays' prop are set to false/null in 'componentsDisplay'
 * is to allow devs to only have to pass properties they wish to set to
 * true/Object (making life easier).
 *
 * @param {({
 * 	listViewComponentShouldDisplay: (boolean|undefined),
 * 	deleteModalComponentForListViewShouldDisplay: (boolean|undefined),
 * 	listViewCreateItemSidbarComponentShouldDisplay: (boolean|undefined),
 * 	itemViewComponentShouldDisplay: (boolean|undefined),
 * 	deleteModalComponentForItemViewShouldDisplay: (boolean|undefined),
 * 	itemViewEditItemInfoComponentShouldDisplay: (boolean|undefined),
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
 * 	}|null|undefined))
 * }|undefined)} state - Current Object (in the redux state) for either which
 * project or bug components (reducer used by 'PROJECT_CONTAINER' and 'BUG_CONTAINER')
 * are currently being displayed by the app
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
export default function listAndItemComponentsDisplayReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case SET_WHICH_LIST_AND_ITEM_COMPONENTS_DISPLAY:
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
 * Checks if 'displays' prop follows the rules stated in JsDoc of
 * listAndItemComponentsDisplayReducer. If valid, then 'displays' returned
 * unchanged. If invalid, then a new version that's altered to follow the rules
 * is returned instead.
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
