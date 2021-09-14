import { SET_WHICH_GENERAL_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

// Initial state for which general components should be displayed by the app
const initialState = {
	registerComponentShouldDisplay: false,
	// Default is true so the app will open on the Login component.
	loginComponentShouldDisplay: true,
	homeComponentShouldDisplay: false,
	// The next two are in the 'GENERAL_CONTAINER' since values should be
	// shared for both the project and bug versions of ItemViewListSidebar
	// component (as user likely would expect them to be).
	// When itemViewListSidebarComponentContainerElementExpanded is true the
	// below must be done by the DEVELOPER in JSX:
	// 	1) ItemViewListSidebar component's 'list-sidebar-container'
	// 		(className) element should have 'list-sidebar-container--expanded'
	// 		modifier appended.
	// 	2) ItemViewListSidebar component's 'expand-minimize-button'
	// 		(className) element should have 'expand-minimize-button--expanded'
	// 		modifier appended.
	// 	3) ItemView component's 'item-content-container' (className) element
	// 		should have 'item-content-container--shifted-right' modifier appended.
	// When itemViewListSidebarComponentContainerElementExpanded is false the
	// below must be done by the DEVELOPER in JSX:
	// ItemViewTopBar component's 'search-container' and 'list-filter-or-sort-container'
	// (className) elements should not be present in that component's JSX.
	itemViewListSidebarComponentContainerElementExpanded: false,
	itemViewListSidebarComponentContainerElementExpandedUserSet: false,
};

/**
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how general
 * components should display by the app) in 'GENERAL_CONTAINER' of the redux
 * state. As a rule, 'displays' prop should have at most only one of
 * 'registerComponentShouldDisplay', 'loginComponentShouldDisplay', or
 * 'homeComponentShouldDisplay' booleans as true, as well as
 * 'homeComponentShouldDisplay' should always be true while a user is logged
 * into the app, and either 'registerComponentShouldDisplay' or
 * 'loginComponentShouldDisplay' should be true if a user is not logged in. If
 * the 'displays' prop does not follow the rules then a fail safe will alter to
 * do so (in the reducer). As another rule,
 * 'itemViewListSidebarComponentContainerElementExpandedUserSet' should be set
 * to true whenever the user clicks the ItemViewListSidebar component's
 * 'expand-minimize-button' (className) element (there is no fail safe to ensure
 * this rule is followed). Also if any properties in 'displays' prop are
 * undefined, then they will be set to false in 'componentsDisplay'.
 *
 * Note: The purpose of 'registerComponentShouldDisplay', 'loginComponentShouldDisplay',
 * and 'homeComponentShouldDisplay' booleans in 'componentsDisplay' Object are
 * to be used as flags for whether the components they represent (sharing the
 * same name, e.g. 'homeComponentShouldDisplay' boolean represents Home
 * component) should be displayed by the app. The reason at most only one of
 * these three booleans should be true is to both prevent CSS issues, as their
 * components will break each others intended CSS design, and because it makes
 * sense to seperate their component's functionalities (e.g. registering or
 * logging-in is best done when not already logged-in and using the Home
 * component). The purpose of the 'itemViewListSidebarComponentContainerElementExpanded'
 * property is to be used as a flag for whether the ItemViewListSidebar
 * component's 'list-sidebar-container' (className) element should be expanded.
 * The purpose of the 'itemViewListSidebarComponentContainerElementExpandedUserSet'
 * property is to be used as a flag by the custom hook in
 * useAutoDecideIfItemViewListSidebarComponentDisplaysHookUtils.js for whether
 * the app should auto-decide if ItemViewListSidebar component's
 * 'list-sidebar-container' (className) element should be expanded based on the
 * current window size. If false it will continue to auto-decide, if true it
 * will no longer auto-decide (until turned false again through an app reset).
 * The reason undefined properties in 'displays' prop are set to false in
 * 'componentsDisplay' is to allow devs to only have to pass properties they
 * wish to set to true (making life easier).
 *
 * @param {{
 * 	registerComponentShouldDisplay: boolean,
 * 	loginComponentShouldDisplay: boolean,
 * 	homeComponentShouldDisplay: boolean,
 * 	itemViewListSidebarComponentContainerElementExpanded: boolean,
 * 	itemViewListSidebarComponentContainerElementExpandedUserSet: boolean
 * }} state - Current Object (in the redux state) for which general components
 * are being displayed by the app
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	registerComponentShouldDisplay: boolean,
 * 	loginComponentShouldDisplay: boolean,
 * 	homeComponentShouldDisplay: boolean,
 * 	itemViewListSidebarComponentContainerElementExpanded: boolean,
 * 	itemViewListSidebarComponentContainerElementExpandedUserSet: boolean
 * }} Object for which general components should display by the app
 */
export default function generalComponentsDisplayReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case SET_WHICH_GENERAL_COMPONENTS_DISPLAY:
			const validatedDisplays = getValidatedDisplays(action.displays);

			return {
				registerComponentShouldDisplay:
					validatedDisplays.registerComponentShouldDisplay !== undefined
						? validatedDisplays.registerComponentShouldDisplay
						: false,
				// If undefined then false despite default being true in
				// ...'initialState' since a Dev would likely expect it to turn
				// ...false like the others
				loginComponentShouldDisplay:
					validatedDisplays.loginComponentShouldDisplay !== undefined
						? validatedDisplays.loginComponentShouldDisplay
						: false,
				homeComponentShouldDisplay:
					validatedDisplays.homeComponentShouldDisplay !== undefined
						? validatedDisplays.homeComponentShouldDisplay
						: false,
				itemViewListSidebarComponentContainerElementExpanded:
					validatedDisplays.itemViewListSidebarComponentContainerElementExpanded !==
					undefined
						? validatedDisplays.itemViewListSidebarComponentContainerElementExpanded
						: false,
				itemViewListSidebarComponentContainerElementExpandedUserSet:
					validatedDisplays.itemViewListSidebarComponentContainerElementExpandedUserSet !==
					undefined
						? validatedDisplays.itemViewListSidebarComponentContainerElementExpandedUserSet
						: false,
			};
		default:
			return state;
	}
}

/**
 * Checks if 'displays' prop follows the rules (i.e. that at most only one of
 * 'registerComponentShouldDisplay', 'loginComponentShouldDisplay', or 'homeComponentShouldDisplay' booleans are true, as well as 'homeComponentShouldDisplay' should
 * always be true while a user is logged into the app, and either 'registerComponentShouldDisplay' or
 * 'loginComponentShouldDisplay' should be true if a user is not logged in). If valid, then it's
 * returned unchanged. If invalid, then a version that's altered to follow the
 * rules is returned.
 *
 * @param {{
 * 	registerComponentShouldDisplay: boolean,
 * 	loginComponentShouldDisplay: boolean,
 * 	homeComponentShouldDisplay: boolean,
 * 	itemViewListSidebarComponentContainerElementExpanded: boolean,
 * 	itemViewListSidebarComponentContainerElementExpandedUserSet: boolean
 * }} displays - 'action.displays' Object containing properties to guide how
 * general components should be displyed in the app.
 * @returns {{
 * 	registerComponentShouldDisplay: boolean,
 * 	loginComponentShouldDisplay: boolean,
 * 	homeComponentShouldDisplay: boolean,
 * 	itemViewListSidebarComponentContainerElementExpanded: boolean,
 * 	itemViewListSidebarComponentContainerElementExpandedUserSet: boolean
 * }} Validated 'action.displays' Object containing properties to guide how
 * general components should be displyed in the app.
 */
function getValidatedDisplays(displays) {
	const keysOfRegisterLoginHomeComponentsSetToTrue = Object.keys(
		filterObject(
			{
				registerComponentShouldDisplay: displays.registerComponentShouldDisplay,
				loginComponentShouldDisplay: displays.loginComponentShouldDisplay,
				homeComponentShouldDisplay: displays.homeComponentShouldDisplay,
			},
			(boolean) => boolean === true
		)
	);

	const newDisplays = displays;

	// Fail Safe
	// Having 'jwToken' as null in local storage means no account is logged into the app
	if (localStorage.getItem("jwToken") === null) {
		if (keysOfRegisterLoginHomeComponentsSetToTrue.length > 1) {
			if (displays.loginComponentShouldDisplay === true) {
				console.log(
					"FAIL SAFE: " +
						getStringOfAllArrayValues(
							keysOfRegisterLoginHomeComponentsSetToTrue,
							true
						) +
						" were all attempted to be set to true in the redux state, which goes against their intended use. Since no account is logged into the app," +
						(displays.registerComponentShouldDisplay === true
							? " and Login component takes priority over Register component,"
							: "") +
						" 'loginComponentShouldDisplay' was set to true while 'registerComponentShouldDisplay' and 'homeComponentShouldDisplay' were set to false."
				);

				newDisplays["registerComponentShouldDisplay"] = false;
				newDisplays["loginComponentShouldDisplay"] = true;
				newDisplays["homeComponentShouldDisplay"] = false;
			} else {
				console.log(
					"FAIL SAFE: " +
						getStringOfAllArrayValues(
							keysOfRegisterLoginHomeComponentsSetToTrue,
							true
						) +
						" were all attempted to be set to true in the redux state, which goes against their intended use. Since no account is logged into the app, 'registerComponentShouldDisplay' was set to true while 'loginComponentShouldDisplay' and 'homeComponentShouldDisplay' were set to false."
				);

				newDisplays["registerComponentShouldDisplay"] = true;
				newDisplays["loginComponentShouldDisplay"] = false;
				newDisplays["homeComponentShouldDisplay"] = false;
			}
		} else if (displays.homeComponentShouldDisplay === true) {
			console.log(
				"FAIL SAFE: No account is logged into the app while 'homeComponentShouldDisplay' was attempted to be set to true in in the redux state. This goes against its intended use. So, 'loginComponentShouldDisplay' was set to true while 'registerComponentShouldDisplay' and 'homeComponentShouldDisplay' were set to false."
			);

			newDisplays["registerComponentShouldDisplay"] = false;
			newDisplays["loginComponentShouldDisplay"] = true;
			newDisplays["homeComponentShouldDisplay"] = false;
		}
	} else {
		if (displays.homeComponentShouldDisplay !== true) {
			console.log(
				"FAIL SAFE: An account is logged into the app while 'homeComponentShouldDisplay' was not attempted to be set to true in in the redux state. This goes against its intended use. So 'homeComponentShouldDisplay' was set to true while 'registerComponentShouldDisplay' and 'loginComponentShouldDisplay' were set to false."
			);
		} else if (keysOfRegisterLoginHomeComponentsSetToTrue.length > 1) {
			console.log(
				"FAIL SAFE: " +
					getStringOfAllArrayValues(
						keysOfRegisterLoginHomeComponentsSetToTrue,
						true
					) +
					" were all attempted to be set to true in the redux state which goes against their intended use. Since an account is logged into the app, 'homeComponentShouldDisplay' was set to true while 'loginComponentShouldDisplay' and 'registerComponentShouldDisplay' were set to false."
			);
		}

		newDisplays["registerComponentShouldDisplay"] = false;
		newDisplays["loginComponentShouldDisplay"] = false;
		newDisplays["homeComponentShouldDisplay"] = true;
	}

	return newDisplays;
}
