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
 * state. As a rule, 'displays' prop should have at most only one of
 * 'registerComponentShouldDisplay', 'loginComponentShouldDisplay', or
 * 'homeComponentShouldDisplay' booleans as true, as well as
 * 'homeComponentShouldDisplay' should always be true while a user is logged
 * into the app, and either 'registerComponentShouldDisplay' or
 * 'loginComponentShouldDisplay' should be true if a user is not logged in. If
 * the 'displays' prop does not follow the rules then a fail safe will alter it
 * to do so (in the reducer). As another rule,
 * 'itemViewListSidebarComponentContainerElementExpandedUserSet' should be set
 * to true whenever the user clicks the ItemViewListSidebar component's
 * 'expand-minimize-button' (className) element. However, a fail safe could not 
 * be figured out to ensure this rule is followed. Also if any properties in 
 * 'displays' prop are undefined, then they will be set to false in 
 * 'componentsDisplay'.
 * 
 * Note: The purpose of each booleans in 'componentsDisplay' Object with names
 * ending in '...ShouldDisplay' are to be used as flags for whether the 
 * components they represent should be displayed by the app. The reason at most
 * only one of these three booleans should be true is to both prevent CSS issues,
 * as their components will break each others intended CSS design, and because 
 * it makes sense to seperate their component's functionalities (e.g. registering
 * or logging-in is best done when not already logged-in and using the Home
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
 * 	registerComponentShouldDisplay: (boolean|undefined),
 * 	loginComponentShouldDisplay: (boolean|undefined),
 * 	homeComponentShouldDisplay: (boolean|undefined),
 * 	itemViewListSidebarComponentContainerElementExpanded: (boolean|undefined),
 * 	itemViewListSidebarComponentContainerElementExpandedUserSet: (boolean|undefined)
 * }} displays - Object containing properties to guide how general components
 * should be displyed in the app.
 *
 * @example
 * // Sets 'homeComponentShouldDisplay' to true and all other booleans to false.
 * // The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(setWhichGeneralComponentsDisplay({ homeComponentShouldDisplay: true }));
 *
 * @example
 * // Sets either 'homeComponentShouldDisplay' or 'loginComponentShouldDisplay'
 * // to true (depending on if an account is logged into the app) and all other
 * // booleans to false. The dispatch function is from useDispatch() imported
 * // from react-redux.
 * dispatch(setWhichGeneralComponentsDisplay({}));
 */
export const setWhichGeneralComponentsDisplay = (displays) => (dispatch) => {
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
 * displyed in the app.
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
 * then a fail safe will alter it to do so (in the reducer). Also if any
 * properties in 'displays' prop are undefined, then they will be set to false
 * in 'componentsDisplay'.
 *
 * Note: The purpose of each boolean in 'componentsDisplay' Object are to be
 * used as flags for whether the components they represent should be displayed
 * by the app. The reason at most only one of these properties should be true
 * is for both cosmetic reasons, as AccountSidebar and AccountModal components
 * do not look nice displaying together, and to prevent CSS issues, as having
 * more than one child component of AccountModal component displaying together
 * (e.g. AccountModalEditInfo, AccountModalEditEmail, ect.) will break its
 * intended CSS design. The reason undefined properties in 'displays' prop are
 * set to false in 'componentsDisplay' is to allow Devs to only have to pass
 * properties they wish to set to true (making life easier).
 *
 * @param {{
 * 	accountSidebarComponentShouldDisplay: (boolean|undefined),
 * 	accountModalEditInfoComponentShouldDisplay: (boolean|undefined),
 * 	accountModalEditEmailComponentShouldDisplay: (boolean|undefined),
 * 	accountModalEditPasswordComponentShouldDisplay: (boolean|undefined),
 * 	accountModalDeleteAccountComponentShouldDisplay: (boolean|undefined),
 * 	accountModalEditSettingsComponentShouldDisplay: (boolean|undefined)
 * }} displays - Object containing properties to guide how account components
 * should be displyed in the app.
 *
 * @example
 * // Sets 'accountSidebarComponentShouldDisplay' to true and all other booleans
 * // to false in 'componentsDisplay' Object. The dispatch function is from
 * // useDispatch() imported from react-redux.
 * dispatch(setWhichAccountComponentsDisplay({ accountSidebarComponentShouldDisplay: true }));
 *
 * @example
 * // Sets all booleans to false in 'componentsDisplay' Object. The dispatch
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
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how list
 * and item components should display by the app) in 'PROJECT_CONTAINER'
 * of the redux state. As rules, 'displays' prop should have at most only one
 * of 'listViewComponentShouldDisplay' and 'itemViewComponentShouldDisplay' 
 * booleans as true. If 'itemViewComponentShouldDisplay' is true, then
 * 'itemViewCurrentItem' must be set to an Object containing the item to be 
 * displayed. Only if 'listViewComponentShouldDisplay' is true, then at most
 * only one of 'deleteModalComponentForListViewShouldDisplay' and 
 * 'listViewCreateItemSidbarComponentShouldDisplay' should be true, otherwise
 * both should be false. Only if 'itemViewComponentShouldDisplay' is true, then 
 * at most only one of 'deleteModalComponentForItemViewShouldDisplay' and 
 * 'itemViewEditItemInfoComponentShouldDisplay' should be true, otherwise both
 * should be false. If the 'displays' prop does not follow the rules then a 
 * fail safe will alter it to do so (in the reducer). As further rules, only one
 * of the 'componentsDisplay' Objects in both 'PROJECT_CONTAINER' and 'BUG_CONTAINER'
 * of the redux state at a time should have booleans as true. Also that exactly 
 * one of 'listViewComponentShouldDisplay' and 'itemViewComponentShouldDisplay'
 * booleans at a time in either 'componentsDisplay' must be true. Fail safes
 * for these two rules take place outside the reducer via functions from 
 * reduxFailSafeHookUtils.js file. Also if any properties in 'displays' prop are
 * undefined, then they will be set to false (if a boolean) or null (if an 
 * Object) in 'componentsDisplay'.
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
 * @param {{
 * 	listViewComponentShouldDisplay: (boolean|undefined),
 * 	deleteModalComponentForListViewShouldDisplay: (boolean|undefined),
 * 	listViewCreateItemSidbarComponentShouldDisplay: (boolean|undefined),
 * 	itemViewComponentShouldDisplay: (boolean|undefined),
 * 	itemViewComponentShouldDisplay: (boolean|undefined),
 * 	deleteModalComponentForItemViewShouldDisplay: (boolean|undefined),
 * 	itemViewEditItemInfoComponentShouldDisplay: (boolean|undefined),
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
 * }} displays - Object containing properties to guide how project components
 * should be displyed in the app.
 *
 * @example
 * // Sets listViewComponentShouldDisplay to true, and all other project components to false/null.
 * // ...The dispatch function is from useDispatch() imported from react-redux.
 * dispatch(setWhichProjectComponentsDisplay({ listViewComponentShouldDisplay: true }));
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
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how list
 * and item components should display by the app) in 'BUG_CONTAINER'
 * of the redux state. As rules, 'displays' prop should have at most only one
 * of 'listViewComponentShouldDisplay' and 'itemViewComponentShouldDisplay' 
 * booleans as true. If 'itemViewComponentShouldDisplay' is true, then
 * 'itemViewCurrentItem' must be set to an Object containing the item to be 
 * displayed. Only if 'listViewComponentShouldDisplay' is true, then at most
 * only one of 'deleteModalComponentForListViewShouldDisplay' and 
 * 'listViewCreateItemSidbarComponentShouldDisplay' should be true, otherwise
 * both should be false. Only if 'itemViewComponentShouldDisplay' is true, then 
 * at most only one of 'deleteModalComponentForItemViewShouldDisplay' and 
 * 'itemViewEditItemInfoComponentShouldDisplay' should be true, otherwise both
 * should be false. If the 'displays' prop does not follow the rules then a 
 * fail safe will alter it to do so (in the reducer). As further rules, only one
 * of the 'componentsDisplay' Objects in both 'PROJECT_CONTAINER' and 'BUG_CONTAINER'
 * of the redux state at a time should have booleans as true. Also that exactly 
 * one of 'listViewComponentShouldDisplay' and 'itemViewComponentShouldDisplay'
 * booleans at a time in either 'componentsDisplay' must be true. Fail safes
 * for these two rules take place outside the reducer via functions from 
 * reduxFailSafeHookUtils.js file. Also if any properties in 'displays' prop are
 * undefined, then they will be set to false (if a boolean) or null (if an 
 * Object) in 'componentsDisplay'.
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
 * @param {{
 * 	listViewComponentShouldDisplay: (boolean|undefined),
 * 	deleteModalComponentForListViewShouldDisplay: (boolean|undefined),
 * 	listViewCreateItemSidbarComponentShouldDisplay: (boolean|undefined),
 * 	itemViewComponentShouldDisplay: (boolean|undefined),
 * 	itemViewComponentShouldDisplay: (boolean|undefined),
 * 	deleteModalComponentForItemViewShouldDisplay: (boolean|undefined),
 * 	itemViewEditItemInfoComponentShouldDisplay: (boolean|undefined),
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
 * }} displays - Object containing properties to guide how bug components
 * should be displyed in the app.
 *
 * @example
 * // Sets listViewComponentShouldDisplay to true, and all other bug components to false/null. The
 * // ...dispatch function is from useDispatch() imported from react-redux.
 * dispatch(setWhichBugComponentsDisplay({ listViewComponentShouldDisplay: true }));
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
 * should be displyed in the app.
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
