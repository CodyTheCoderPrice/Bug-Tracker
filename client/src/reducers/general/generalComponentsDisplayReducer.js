import { SET_WHICH_GENERAL_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

// Initial state for which general components should be displayed by the app
const initialState = {
	register: false,
	login: true,
	home: false,
	// This is in the 'GENERAL_CONTAINER' since value should be same for both the
	// ...project and bug versions of ItemViewListSidebar component (as user
	// ...likely would expect them to be).
	itemViewListSidebarComponentContainerElementExpanded: true,
	itemViewListSidebarComponentContainerElementExpandedUserSet: false,
};

/**
 * Used to Set 'componentsDisplay' property in 'GENERAL_CONTAINER' of the redux
 * state for how general components should be displayed by the app. The 
 * 'register', 'login', and 'home' properties refer to whether the components
 * they represent should display (e.g. 'login' represents the Login component).
 * As a rule, exactly one of these three properties should be true at any point
 * in time (as the components they represent were not intended to be displayed
 * simultaneously), as well as 'home' should always be true while a user is 
 * logged into the app, and either 'register' or 'login' should be true if a 
 * user is not logged in. This reducer ensures these rules are followed, meaning 
 * which of these three properties actually gets set to true in the redux state
 * may not match up with which were set to true in action.displays. It should 
 * be noted that 'login' takes prioirty over 'register', meaning if no account
 * is logged in, and both or neither are set to true in action.displays, then 
 * 'login' will be set to true in the redux state. The 
 * 'itemViewListSidebarComponentContainerElementExpanded' property represents
 * if the ItemViewListSidebar component should be expanded or minimized. The 
 * 'itemViewListSidebarComponentContainerElementExpandedUserSet' property 
 * represents if the user has clicked the ItemViewListSidebar component's
 * 'expand-minimize-button' (className) element during the current session.
 * If any expected properties in action.displays (e.g. 'resgister', 'login', 
 * ect.) are undefined, then they will be attempted to be set to false in the
 * redux state (except for 'itemViewListSidebarComponentContainerElementExpanded',
 * which will be attempted to be set to true).
 *
 * Note: The purpose of the 'register', 'login', and 'home' properties inside
 * this reducer are to be used as flags for whether the components they represent
 * (e.g. home represents the Home component) should be displayed by the app. The
 * purpose of the 'itemViewListSidebarComponentContainerElementExpanded' property
 * is to be used as a flag for whether the ItemViewListSidebar component's
 * 'list-sidebar-container' (className) element should be expanded. When true,
 * the following must be done:
 * 		ItemViewListSidebar component's 'list-sidebar-container' (className)
 * 		element should have 'list-sidebar-container--expanded' modifier appended.
 * 		ItemViewListSidebar component's 'expand-minimize-button' (className)
 * 		element should have 'expand-minimize-button--expanded' modifier appended.
 * 		ItemView component's 'item-content-container' (className) element should
 * 		have 'item-content-container--shifted-right' modifier appended.
 * When false, the following must be done:
 * 		ItemViewTopBar component's 'search-container' and 'list-filter-or-sort-container'
 * 		 (className) elements should not be present in that component's JSX.
 * The purpose of the 'itemViewListSidebarComponentContainerElementExpandedUserSet'
 * property is to be used as a flag by the custom hook in
 * useAutoDecideIfItemViewListSidebarComponentDisplaysHookUtils.js for whether
 * the app should auto-decide if ItemViewListSidebar component's
 * 'list-sidebar-container' (className) element should be expanded based on the
 * current window size. If false it will continue to auto-decide, if true it
 * will no longer auto-decide (until turned false again through an app reset).
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
			let registerLoginHomeComponentsSetToTrue = filterObject(
				{
					register: action.displays.register,
					login: action.displays.login,
					home: action.displays.home,
				},
				(boolean) => boolean === true
			);

			const keysOfRegisterLoginHomeComponentsSetToTrue = Object.keys(
				registerLoginHomeComponentsSetToTrue
			);

			// Makes sure if an account is logged into the app (i.e. there is a
			// ...jwToken in localStorage) then home property is trues instead
			// ...of register or login
			if (localStorage.getItem("jwToken") !== null) {
				if (action.displays.home !== true) {
					console.log(
						"Error: An account is logged into the app, but home was not attempted to be set to true in in generalComponentsDisplayReducer, which goes against its intended use, so home component was set to true."
					);
				} else if (keysOfRegisterLoginHomeComponentsSetToTrue.length > 1) {
					console.log(
						"Error: " +
							getStringOfAllArrayValues(
								keysOfRegisterLoginHomeComponentsSetToTrue
							) +
							" were all attempted to be set to true in generalComponentsDisplayReducer, which goes against their intended use. Since an account is logged into the app, home component was set to true, while login and register components were set to false."
					);
				}

				action.displays["register"] = false;
				action.displays["login"] = false;
				action.displays["home"] = true;
			}
			// Since an account is not logged into the app (i.e. there is no
			// ...jwToken in localStoreage), makes sure either login or resiger
			// ...properties are true instead of home
			else if (keysOfRegisterLoginHomeComponentsSetToTrue.length > 1) {
				if (action.displays.login === true) {
					console.log(
						"Error: " +
							getStringOfAllArrayValues(
								keysOfRegisterLoginHomeComponentsSetToTrue
							) +
							" were all attempted to be set to true in generalComponentsDisplayReducer, which goes against their intended use. Since no account is authenticaed as logged in, login component was set to true, while register and home components were set to false."
					);

					action.displays["register"] = false;
					action.displays["login"] = true;
					action.displays["home"] = false;
				} else {
					console.log(
						"Error: " +
							getStringOfAllArrayValues(
								keysOfRegisterLoginHomeComponentsSetToTrue
							) +
							" were all attempted to be set to true in generalComponentsDisplayReducer, which goes against their intended use. Since no account is authenticaed as logged in, register component was set to true, while login and home components were set to false."
					);

					action.displays["register"] = true;
					action.displays["login"] = false;
					action.displays["home"] = false;
				}
			}

			return {
				// Ternary operator is used to set undefined properties to
				// ...their default, so you only have to pass the properties you
				// ...want to set differently, which makes using this redux
				// ...action easier
				register:
					action.displays.register !== undefined
						? action.displays.register
						: false,
				login:
					action.displays.login !== undefined ? action.displays.login : false,
				home: action.displays.home !== undefined ? action.displays.home : false,
				// If undefined then true since default is true
				itemViewListSidebarComponentContainerElementExpanded:
					action.displays
						.itemViewListSidebarComponentContainerElementExpanded !== undefined
						? action.displays
								.itemViewListSidebarComponentContainerElementExpanded
						: true,
				itemViewListSidebarComponentContainerElementExpandedUserSet:
					action.displays
						.itemViewListSidebarComponentContainerElementExpandedUserSet !==
					undefined
						? action.displays
								.itemViewListSidebarComponentContainerElementExpandedUserSet
						: false,
			};
		default:
			return state;
	}
}
