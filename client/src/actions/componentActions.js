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
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how general
 * components should display by the app) in 'GENERAL_CONTAINER' of the redux
 * state. As a rule, 'displays' prop should have at most only one of 'register',
 * 'login', or 'home' booleans as true, as well as 'home' should always be true
 * while a user is logged into the app, and either 'register' or 'login' should
 * be true if a user is not logged in. If the 'displays' prop does not follow
 * the rules then a fail safe will alter it does (in the reducer). As another 
 * rule, 'itemViewListSidebarComponentContainerElementExpandedUserSet' should be
 * set to true whenever the user clicks the ItemViewListSidebar component's
 * 'expand-minimize-button' (className) element (there is no fail safe to ensure
 * this rule is followed). Also if any properties in 'displays' prop are 
 * undefined, then they will be set to false in 'componentsDisplay'.
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
 * Sets 'dropdownsDisplay' property in 'GENERAL_CONTAINER' of the redux state for
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
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how account
 * components should display by the app) in 'ACCOUNT_CONTAINER' of the redux
 * state. As a rule, 'displays' prop should have at most only one of its
 * boolean properties as true. If the 'displays' prop does not follow the rules
 * then a fail safe will alter it does (in the reducer). Also if any properties 
 * in 'displays' prop are undefined, then they will be set to false in 
 * 'componentsDisplay'.
 *
 * Note: The purpose of each boolean in 'componentsDisplay' Object are to be
 * used as flags for whether the components they represent (sharing the same
 * name, e.g. 'accountSidebar' boolean represents AccountSidebar component)
 * should be displayed by the app. The reason at most only one of these
 * properties should be true is for both cosmetic reasons, as AccountSidebar and
 * AccountModal components do not look nice displaying together, and to prevent
 * CSS issues, as having more than one child component of AccountModal component
 * displaying together (e.g. AccountModalEditInfo, AccountModalEditEmail, ect.)
 * will break its intended CSS design. The reason undefined properties in
 * 'displays' prop are set to false in 'componentsDisplay' is to allow devs to
 * only have to pass properties they wish to set to true (making life easier).
 *
 * @param {{
 * 	accountSidebar: (boolean|undefined),
 * 	accountModalEditInfo: (boolean|undefined),
 * 	accountModalEditEmail: (boolean|undefined),
 * 	accountModalEditPassword: (boolean|undefined),
 * 	accountModalDeleteAccount: (boolean|undefined),
 * 	accountModalEditSettings: (boolean|undefined)
 * }} displays - Object containing properties to guide how account components
 * should be displyed in the app. At most only one of its properties should be 
 * set to true. Any properties set to undefined or excluded from this Object 
 * will be set to false in 'componentsDisplay' Object.
 *
 * @example
 * // Sets 'accountSidebar' to true, and all other properties to false, in 
 * // ...'componentsDisplay' Object. The dispatch function is from useDispatch()
 * // ...imported from react-redux.
 * dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
 *
 * @example
 * // Sets all properties to false in 'componentsDisplay' Object. The dispatch
 * // ...function is from useDispatch() imported from react-redux.
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
 * Sets 'componentsDisplay' property in 'PROJECT_CONTAINER' of the redux state for
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
 * Sets 'componentsDisplay' property in 'BUG_CONTAINER' of the redux state for how
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
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how comment
 * components should display by the app) in 'COMMENT_CONTAINER' of the redux 
 * state. If any properties in 'displays' prop are undefined, then they will be
 * set to null in 'componentsDisplay'.
 *
 * Note: The purpose of 'commentBeingEdited' property in 'componentsDisplay' 
 * Object is to be used by the ItemViewCommentsBoxIndividualComment component
 * to tell if the comment attached to it is being edited, and if so, display a
 * textarea to edit the comment. The purpose of 'commentToBeDeleted' property
 * is to be used to determin if the DeleteModal component should display, as
 * well as what message it should display (DeleteModal is also used for deleting
 * projects and bugs, and has a unique message for each). The reason undefined 
 * properties in 'displays' prop are set to null in 'componentsDisplay' is to
 * allow devs to only have to pass properties they wish to set to an Object 
 * (making life easier).
 *
 * @param {{
 * 	commentBeingEdited: ({
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
 * }} displays - Object containing properties to guide how comment components 
 * should be displyed in the app. Any properties set to undefined or excluded
 * from this Object will be set to null in 'componentsDisplay' Object.
 *
 * @example
 * // Sets 'commentBeingEdited' to be the bellow Object and 'commentToBeDeleted' 
 * // ...to null in 'componentsDisplay' Object. The dispatch function is from
 * // ...useDispatch() imported from react-redux.
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
 * // Sets all properties to null in 'componentsDisplay' Object. The dispatch 
 * // ...function is from useDispatch() imported from react-redux.
 * dispatch(setWhichCommentComponentsDisplay({}));
 */
export const setWhichCommentComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		container: COMMENT_CONTAINER,
		type: SET_WHICH_COMMENT_COMPONENTS_DISPLAY,
		displays: displays,
	});
};
