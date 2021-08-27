// Container names used to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "./constants/containerNames";
import {
	SET_WHICH_GENERAL_COMPONENTS_DISPLAY,
	SET_WHICH_GENERAL_DROPDOWNS_DISPLAY,
	SET_WHICH_LIST_COMPONENTS_DISPLAY,
	SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
	SET_WHICH_COMMENT_COMPONENTS_DISPLAY,
} from "./constants/types";

/**
 * Sets 'componentsDisplay' property in GENERAL_CONTAINER of the redux state for
 * how general components should be displayed by the app. The 'register', 
 * 'login', and 'home' properties in the 'displays' prop refer to whether the 
 * components they represent should display (e.g. 'login' represents the Login
 * component). As a rule, exactly one of these three properties should be true 
 * at any point in time in the redux state (as the components they represent
 * were not intended to be displayed simultaneously), as well as 'home' should
 * always be true while a user is logged into the app, and either 'register' or
 * 'login' should be true if a user is not logged in. The 
 * generalComponentsDisplayReducer ensures these rules are followed, meaning 
 * which of these three properties actually gets set to true in the redux state
 * may not match up with which were set to true in the 'displays' prop. It 
 * should be noted that 'login' takes prioirty over 'register', meaning if no
 * account is logged in, and both or neither are set to true in the 'display'
 * prop, then 'login' will be set to true in the redux state. The 
 * 'itemViewListSidebarComponentContainerElementExpanded' property represents
 * if the ItemViewListSidebar component should be expanded or minimized. The 
 * 'itemViewListSidebarComponentContainerElementExpandedUserSet' property 
 * represents if the user has clicked the ItemViewListSidebar component's
 * 'expand-minimize-button' (className) element during the current session.
 * If any expected properties in 'displays' prop (e.g. 'resgister', 'login', 
 * ect.) are undefined, then they will be attempted to be set to false in the
 * redux state (except for 'itemViewListSidebarComponentContainerElementExpanded',
 * which will be attempted to be set to true).
 *
 * Note: The way the 'register', 'login', and 'home' properties in the redux 
 * state are intended to control whether the components they represent display,
 * is by having their parent component (i.e. App component), check the value of
 * these properties, and only have their corresponding component be present in
 * the JSX if their property is true, which can be done using a ternary operator. 
 * 
 * Note: The way the 'itemViewListSidebarComponentContainerElementExpanded' 
 * property in the redux state is intended to control whether the 
 * ItemViewListSidebar component is expanded or not is by in that component's
 * JSX, list-sidebar-container--expanded' className to the 
 * 'list-sidebar-container' (className) element whenever the 
 * 'itemViewListSidebarComponentContainerElementExpanded' property is .
 * This can be done using a ternary operator.
 * 
 * Note: The 'itemViewListSidebarComponentContainerElementExpandedUserSet' 
 * property should be set to true whenever the user clicks the 
 * ItemViewListSidebar component's 'expand-minimize-button' (className) element.
 * The purpose of this property is to be used by the custom hook in 
 * useAutoDecideIfItemViewListSidebarComponentDisplaysHookUtils.js to determin 
 * if its auto-decide functionality should run (more info available the JsDoc 
 * of that file).
 * 
 * @param {{
 * 	register: (boolean|undefined),
 * 	login: (boolean|undefined),
 * 	home: (boolean|undefined),
 * 	itemViewListSidebarComponentContainerElementExpanded: (boolean|undefined),
 * 	itemViewListSidebarComponentContainerElementExpandedUserSet: (boolean|undefined)
 * }} displays - Object containing info for how general components should be
 * displyed in the app. Any general components set to undefined or excluded
 * from this param will be set to false in the redux state.
 *
 * @example
 * // Sets 'home' and 'itemViewListSidebarComponentContainerElementExpanded' 
 * // ...properties to true, and all other properties to false. The dispatch
 * // ...function is from useDispatch() imported from react-redux.
 * // ...dispatch(setWhichGeneralComponentsDisplay({ home: true }));
 * 
 * @example
 * // Sets either 'home' or 'login' property to true depending on if an account
 * // ...is logged into the app, as well as the 
 * // ... 'itemViewListSidebarComponentContainerElementExpanded' property to 
 * // ...true, and all other properties to false. The dispatch function is 
 * // ...from useDispatch() imported from react-redux.
 * dispatch(setWhichGeneralComponentsDisplay({}));
 */
export const setWhichGeneralComponentsDisplay =
	(displays) => (dispatch) => {
		dispatch({
			container: GENERAL_CONTAINER,
			type: SET_WHICH_GENERAL_COMPONENTS_DISPLAY,
			displays: displays,
		});
	};

/**
 * Sets 'dropdownsDisplay' property in GENERAL_CONTAINER of the redux state for
 * how general dropdowns should be displayed by the app. If any expected
 * properties in displays prop (e.g. navbarHambugerDropdown,
 * itemViewTopBarSortDropdown, ect.) are undefined, then they will be set to
 * false in the redux state.
 *
 * @param {{
 * 	navbarHambugerDropdown: (boolean|undefined),
 * 	listViewTopBarFilterDropdown: (boolean|undefined),
 * 	itemViewTopBarSortDropdown: (boolean|undefined),
 * 	itemViewTopBarFilterDropdown: (boolean|undefined),
 * 	itemViewTopBarOptionsDropdown: (boolean|undefined)
 * }} displays - Object containing info for how general dropdowns should be
 * displyed in the app. Any general dropdowns set to undefined or excluded from
 * this param will be set to false in the redux state.
 *
 * @example
 * // Sets navbarHambugerDropdown to true, and all other general dropdowns to
 * // ...false. The dispatch function is from useDispatch() imported from
 * // ...react-redux.
 * dispatch(
 *		setWhichGeneralDropdownsDisplay({ navbarHambugerDropdown: true })
 *	);
 *
 * @example
 * // Sets all general dropdowns to false. The dispatch function is from
 * // ...useDispatch() imported from react-redux.
 * dispatch(setWhichGeneralDropdownsDisplay({}));
 */
export const setWhichGeneralDropdownsDisplay = (displays) => (dispatch) => {
	dispatch({
		container: GENERAL_CONTAINER,
		type: SET_WHICH_GENERAL_DROPDOWNS_DISPLAY,
		displays: displays,
	});
};

/**
 * Sets 'componentsDisplay' property in ACCOUNT_CONTAINER of the redux state for
 * how account components should be displayed by the app. At most only one
 * property inside the 'displays' prop should be set to true. If more than one 
 * is set to true, then the reducer will arbitrarily select only one to be set to
 * true in the redux state. Also if any expected properties in 'displays' prop 
 * (e.g. 'accountSidebar', 'accountModalEditInfo', ect.) are undefined, then they 
 * will be set to false in the redux state.
 * 
 * Note: The purpose of each property inside 'componentsDisplay' property in 
 * ACCOUNT_CONTAINER is to be used as a flag for whether the component they 
 * represent (they share the same name, e.g. 'accountSidebar' property represents
 * AccountSidebar component) should be displayed by the app. The reason at most 
 * only one property should be true inside the 'displays' prop is for both 
 * cosmetic reasons, as AccountSidebar and AccountModal components do not look 
 * nice displaying together, and to prevent CSS issues, as having more than one
 * child component of AccountModal component (e.g. AccountModalEditInfo and
 * AccountModalEditEmail components) will break its intended CSS design.
 *
 * @param {{
 * 	accountSidebar: (boolean|undefined),
 * 	accountModalEditInfo: (boolean|undefined),
 * 	accountModalEditEmail: (boolean|undefined),
 * 	accountModalEditPassword: (boolean|undefined),
 * 	accountModalDeleteAccount: (boolean|undefined),
 * 	accountModalEditSettings: (boolean|undefined)
 * }} displays - Object containing info for how account components should be
 * displyed in the app. At most only one account component should be set to
 * true. Any account components set to undefined or excluded from this param
 * will be set to false in the redux state.
 *
 * @example
 * // Sets accountSidebar to true, and all other account components to false.
 * // ...The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
 *
 * @example
 * // Sets all account components to false. The dispatch function is from
 * // ...useDispatch() imported from react-redux.
 * dispatch(setWhichAccountComponentsDisplay({}));
 */
export const setWhichAccountComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
		displays: displays,
	});
};

/**
 * Sets 'componentsDisplay' property in PROJECT_CONTAINER of the redux state for
 * how project components should be displayed by the app. The displays prop 
 * should have at most one of either its listView or itemView properties set to
 * true. If both are set to true then listView will take priorty and itemView 
 * will be set to false in the redux state. Also displays prop should not have
 * any of listView's child component properties (i.e. listViewDeleteModal & 
 * listViewCreateItemSidbar) set to true if listView property is not. Neither
 * should itemView's child component property (i.e. itemViewDeleteModal) be set 
 * to true if itemView property is not. If this is the case for either of them,
 * then their child components will be set to false in the redux state. If any 
 * expected properties in displays prop (e.g. listView, itemView, ect.) are 
 * undefined, then they will be set to false/null (depending on their type) in
 * the redux state.
 *
 * @param {{
 * 	listView: (boolean|undefined),
 * 	listViewDeleteModal: (boolean|undefined),
 * 	listViewCreateItemSidbar: (boolean|undefined),
 * 	itemView: (boolean|undefined),
 * 	itemView: (boolean|undefined),
 * 	itemViewDeleteModal: (boolean|undefined),
 * 	itemViewEditItemInfo: (boolean|undefined),
 * 	itemViewCurrentItem: ({
 * 		account_id: number,
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		last_edited_timestamp: string
 * 	}|null|undefined)
 * }} displays - Object containing info for how project components should be
 * displyed in the app. Any project components set to undefined or excluded
 * from this param will be set to their default value.
 *
 * @example
 * // Sets listView to true, and all other project components to false/null.
 * // ...The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(setWhichProjectComponentsDisplay({ listView: true }));
 *
 * @example
 * // Sets all project components to false/null. The dispatch function is from
 * // ...useDispatch() imported from react-redux.
 * dispatch(setWhichProjectComponentsDisplay({}));
 */
export const setWhichProjectComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		container: PROJECT_CONTAINER,
		type: SET_WHICH_LIST_COMPONENTS_DISPLAY,
		displays: displays,
	});
};

/**
 * Sets 'componentsDisplay' property in BUG_CONTAINER of the redux state for how
 * bug components should be displayed by the app. The displays prop should have
 * at most one of either its listView or itemView properties set to true. If 
 * both are set to true then listView will take priorty and itemView will be set
 * to false in the redux state. Also displays prop should not have any of 
 * listView's child component properties (i.e. listViewDeleteModal & 
 * listViewCreateItemSidbar) set to true if listView property is not. Neither
 * should itemView's child component property (i.e. itemViewDeleteModal) be set 
 * to true if itemView property is not. If this is the case for either of them,
 * then their child components will be set to false in the redux state. If any 
 * expected properties in displays prop (e.g. listView, itemView, ect.) are 
 * undefined, then they will be set to false/null (depending on their type) in
 * the redux state.
 *
 * @param {{
 * 	listView: (boolean|undefined),
 * 	listViewDeleteModal: (boolean|undefined),
 * 	listViewCreateItemSidbar: (boolean|undefined),
 * 	itemView: (boolean|undefined),
 * 	itemView: (boolean|undefined),
 * 	itemViewDeleteModal: (boolean|undefined),
 * 	itemViewEditItemInfo: (boolean|undefined),
 * 	itemViewCurrentItem: ({
 * 		account_id: number,
 * 		id: number,
 * 		name: string,
 * 		description: string,
 * 		location: string,
 * 		creation_date: string,
 * 		start_date: (string|null),
 * 		due_date: (string|null),
 * 		completion_date: (string|null),
 * 		priority_id: number,
 * 		priority_option: string,
 * 		status_id: number,
 * 		status_option: string,
 * 		last_edited_timestamp: string
 * 	}|null|undefined)
 * }} displays - Object containing info for how bug components should be
 * displyed in the app. Any bug components set to undefined or excluded from
 * this param will be set to their default value.
 *
 * @example
 * // Sets listView to true, and all other bug components to false/null. The
 * // ...dispatch function is from useDispatch() imported from react-redux.
 * dispatch(setWhichBugComponentsDisplay({ listView: true }));
 *
 * @example
 * // Sets all bug components to false/null. The dispatch function is from
 * // ...useDispatch() imported from react-redux.
 * dispatch(setWhichBugComponentsDisplay({}));
 */
export const setWhichBugComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		container: BUG_CONTAINER,
		type: SET_WHICH_LIST_COMPONENTS_DISPLAY,
		displays: displays,
	});
};

/**
 * Sets 'componentsDisplay' property in COMMENT_CONTAINER of the redux state for
 * how comment components should be displayed by the app. If any expected
 * properties in displays prop (i.e. commentBeingEdited and commentToBeDeleted)
 * are undefined, then they will be set to null in the redux state.
 *
 * @param {{
 * 	commentToBeEdited: ({
 * 		id: number,
 * 		bug_id: number,
 * 		description: string,
 * 		creation_date: string,
 * 		last_edited_timestamp: string
 * 	}|null|undefined),
 * 	commentToBeDeleted: ({
 * 		id: number,
 * 		bug_id: number,
 * 		description: string,
 * 		creation_date: string,
 * 		last_edited_timestamp: string
 * 	}|null|undefined)
 * }} displays - Object containing info for how comment components should be
 * displyed in the app. Any comment components set to undefined or excluded
 * from this param will be set to their default value.
 *
 * @example
 * // Sets commentBeingEdited to be passed comment Object and all other 
 * // ...properties to null. The dispatch function is from useDispatch() 
 * // ...imported from react-redux.
 * dispatch(
 * 	setWhichCommentComponentsDisplay({
 * 		commentBeingEdited: {
 * 			id: 166,
 * 			bug_id: 96,
 * 			description: "Seems to be an issue with monitor resolution",
 * 			creation_date: "2020-10-27T04:00:00.000Z",
 * 			last_edited_timestamp: "1603821676"
 * 		}
 * 	})
 * );
 *
 * @example
 * // Sets all comment propertries to null. The dispatch function is from
 * // ...useDispatch() imported from react-redux.
 * dispatch(setWhichCommentComponentsDisplay({}));
 */
export const setWhichCommentComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		container: COMMENT_CONTAINER,
		type: SET_WHICH_COMMENT_COMPONENTS_DISPLAY,
		displays: displays,
	});
};
