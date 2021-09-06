import { SET_WHICH_GENERAL_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

// Initial state for which general components should be displayed by the app
const initialState = {
	register: false,
	// Default is true only so the app will open on the Login component.
	login: true,
	home: false,
	// This is in the 'GENERAL_CONTAINER' since value should be same for both the
	// ...project and bug versions of ItemViewListSidebar component (as user
	// ...likely would expect them to be).
	itemViewListSidebarComponentContainerElementExpanded: true,
	itemViewListSidebarComponentContainerElementExpandedUserSet: false,
};

/**
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how general
 * components should display by the app) in 'GENERAL_CONTAINER' of the redux
 * state. As a rule, 'displays' prop should have at most only one of 'register',
 * 'login', or 'home' booleans as true, as well as 'home' should always be true
 * while a user is logged into the app, and either 'register' or 'login' should
 * be true if a user is not logged in. If the 'displays' prop does not follow
 * the rules then it will be altered to do so (in the reducer). Also if any
 * properties in 'displays' prop are undefined, then they will be set to false
 * (except for 'itemViewListSidebarComponentContainerElementExpanded' which will
 * be set to true) in 'componentsDisplay'.
 *
 * Note: The purpose of 'register', 'login', and 'home' booleans in
 * 'componentsDisplay' Object are to be used as flags for whether the components
 * they represent (sharing the same name, e.g. 'home' boolean represents Home
 * component) should be displayed by the app. The reason at most only one of
 * these three booleans should be true is to both prevent CSS issues, as their
 * components will break each others intended CSS design, and because it makes
 * sense to seperate their component's functionalities (e.g. registering or
 * logging-in is best done when not already logged-in and using the Home
 * component). The purpose of the 'itemViewListSidebarComponentContainerElementExpanded'
 * property is to be used as a flag for whether the ItemViewListSidebar
 * component's 'list-sidebar-container' (className) element should be expanded.
 * When true, the following must be done by the developer in JSX:
 * 		ItemViewListSidebar component's 'list-sidebar-container' (className)
 * 		element should have 'list-sidebar-container--expanded' modifier appended.
 * 		ItemViewListSidebar component's 'expand-minimize-button' (className)
 * 		element should have 'expand-minimize-button--expanded' modifier appended.
 * 		ItemView component's 'item-content-container' (className) element should
 * 		have 'item-content-container--shifted-right' modifier appended.
 * When false, the following must be done by the developer in JSX:
 * 		ItemViewTopBar component's 'search-container' and 'list-filter-or-sort-container'
 * 		 (className) elements should not be present in that component's JSX.
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
 * 	register: boolean,
 * 	login: boolean,
 * 	home: boolean,
 * 	itemViewListSidebarComponentContainerElementExpanded: boolean,
 * 	itemViewListSidebarComponentContainerElementExpandedUserSet: boolean
 * }} state - Current Object (in the redux state) for which general components
 * are being displayed by the app
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	register: boolean,
 * 	login: boolean,
 * 	home: boolean,
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
				register:
					validatedDisplays.register !== undefined
						? validatedDisplays.register
						: false,
				// If undefined then false despite default being true in 
				// ...'initialState' since a Dev would try to set it to false
				// ...by leaving it undefined
				login:
					validatedDisplays.login !== undefined
						? validatedDisplays.login
						: false,
				home:
					validatedDisplays.home !== undefined ? validatedDisplays.home : false,
				// If undefined then true since default is true in 'initialState'
				// ...and it's not expected a Dev would try to set it to false
				// ...by leaving it undefined (unlike with 'login')
				itemViewListSidebarComponentContainerElementExpanded:
					validatedDisplays.itemViewListSidebarComponentContainerElementExpanded !==
					undefined
						? validatedDisplays.itemViewListSidebarComponentContainerElementExpanded
						: true,
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
 * 'register', 'login', or 'home' booleans are true, as well as 'home' should
 * always be true while a user is logged into the app, and either 'register' or
 * 'login' should be true if a user is not logged in). If valid, then it's
 * returned unchanged. If invalid, then a version that's altered to follow the
 * rules is returned.
 *
 * @param {{
 * 	register: boolean,
 * 	login: boolean,
 * 	home: boolean,
 * 	itemViewListSidebarComponentContainerElementExpanded: boolean,
 * 	itemViewListSidebarComponentContainerElementExpandedUserSet: boolean
 * }} displays - 'action.displays' Object containing properties to guide how
 * general components should be displyed in the app.
 * @returns {{
 * 	register: boolean,
 * 	login: boolean,
 * 	home: boolean,
 * 	itemViewListSidebarComponentContainerElementExpanded: boolean,
 * 	itemViewListSidebarComponentContainerElementExpandedUserSet: boolean
 * }} Validated 'action.displays' Object containing properties to guide how
 * general components should be displyed in the app.
 */
function getValidatedDisplays(displays) {
	let registerLoginHomeComponentsSetToTrue = filterObject(
		{
			register: displays.register,
			login: displays.login,
			home: displays.home,
		},
		(boolean) => boolean === true
	);

	const keysOfRegisterLoginHomeComponentsSetToTrue = Object.keys(
		registerLoginHomeComponentsSetToTrue
	);

	const newDisplays = displays;

	// Having 'jwToken' in local storage means an account is logged into the app
	if (localStorage.getItem("jwToken") !== null) {
		if (displays.home !== true) {
			console.log(
				"FAIL SAFE: An account is logged into the app, but 'home' was not attempted to be set to true in in the redux state which goes against its intended use. So 'home' was set to true while 'register' and 'login' were set to false."
			);
		} else if (keysOfRegisterLoginHomeComponentsSetToTrue.length > 1) {
			console.log(
				"FAIL SAFE: " +
					getStringOfAllArrayValues(
						keysOfRegisterLoginHomeComponentsSetToTrue
					) +
					" were all attempted to be set to true in the redux state which goes against their intended use. Since an account is logged into the app, 'home' was set to true while 'login' and 'register' were set to false."
			);
		}

		newDisplays["register"] = false;
		newDisplays["login"] = false;
		newDisplays["home"] = true;
	} else if (keysOfRegisterLoginHomeComponentsSetToTrue.length > 1) {
		if (displays.login === true) {
			console.log(
				"FAIL SAFE: " +
					getStringOfAllArrayValues(
						keysOfRegisterLoginHomeComponentsSetToTrue
					) +
					" were all attempted to be set to true in the redux state which goes against their intended use. Since no account is logged in, 'login' was set to true while 'register' and 'home' components were set to false."
			);

			newDisplays["register"] = false;
			newDisplays["login"] = true;
			newDisplays["home"] = false;
		} else {
			console.log(
				"FAIL SAFE: " +
					getStringOfAllArrayValues(
						keysOfRegisterLoginHomeComponentsSetToTrue
					) +
					" were all attempted to be set to true in the redux state which goes against their intended use. Since no account is logged in, 'register' component was set to true while 'login' and 'home' components were set to false."
			);

			newDisplays["register"] = true;
			newDisplays["login"] = false;
			newDisplays["home"] = false;
		}
	}

	return newDisplays;
}
