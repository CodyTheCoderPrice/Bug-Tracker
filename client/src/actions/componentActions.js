// Redux containers
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "./constants/containerNames";
// Redux types
import {
	SET_WHICH_GENERAL_COMPONENTS_DISPLAY,
	SET_WHICH_GENERAL_DROPDOWNS_DISPLAY,
	SET_WHICH_LIST_COMPONENTS_DISPLAY,
	SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
	SET_WHICH_COMMENT_COMPONENTS_DISPLAY,
} from "./constants/types";

/**
 * Sets Object in general container of the redux state for how general
 * components should be displayed in the app
 *
 * @param {{
 * 	register: (boolean|undefined),
 * 	login: (boolean|undefined),
 * 	home: (boolean|undefined),
 * 	itemViewListSidebar: (boolean|undefined),
 * 	itemViewListSidebarUserSet: (boolean|undefined)
 * }} displays - Object containing info for how general components should be 
 * displyed in the app. Any general components set to undefined or excluded 
 * from this param will be set to their default value.
 *
 * @example
 * // Sets home component to true, and all other general components to their
 * // ...default values. The dispatch function is from useDispatch() imported
 * // ...from react-redux.
 * dispatch(setWhichGeneralComponentsDisplay({ home: true }));
 *
 * @example
 * // Sets all general components to their default values. The dispatch
 * // ...function is from useDispatch() imported from react-redux.
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
 * Sets Object in general container of the redux state for how general
 * dropdowns should be displayed in the app
 *
 * @param {{
 * 	navbarHamburherDropdown: (boolean|undefined),
 * 	listViewSearchFilterSearchBarFilterDropdown: (boolean|undefined),
 * 	itemViewTopBarSortDropdown: (boolean|undefined),
 * 	itemViewTopBarFilterDropdown: (boolean|undefined),
 * 	itemViewTopBarOptionsDropdown: (boolean|undefined)
 * }} displays - Object containing info for how general dropdowns should be 
 * displyed in the app. Any general dropdowns set to undefined or excluded from
 * this param will be set to their default value.
 *
 * @example
 * // Sets navbarHamburherDropdown to true, and all other general dropdowns to
 * // ...their default values. The dispatch function is from useDispatch()
 * // ...imported from react-redux.
 * dispatch(
 *		setWhichGeneralDropdownsDisplay({ navbarHamburherDropdown: true })
 *	);
 *
 * @example
 * // Sets all general dropdowns to their default values. The dispatch function
 * // ...is from useDispatch() imported from react-redux.
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
 * Sets Object in account container of the redux state for how account
 * components should be displayed in the app
 *
 * @param {{
 * 	accountSidebar: (boolean|undefined),
 * 	accountModalEditInfo: (boolean|undefined),
 * 	accountModalEditEmail: (boolean|undefined),
 * 	accountModalEditPassword: (boolean|undefined),
 * 	accountModalDeleteAccount: (boolean|undefined),
 * 	accountModalEditSettings: (boolean|undefined)
 * }} displays - Object containing info for how account components should be 
 * displyed in the app. At most one of the properties beginning with 
 * accountModal (e.g. accountModalEditInfo) should be set to true. Any account
 * components set to undefined or excluded from this param will be set to their
 * default value.
 *
 * @example
 * // Sets accountSidebar to true, and all other account components to their
 * // ...default values. The dispatch function is from useDispatch() imported
 * // ...from react-redux.
 * dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
 *
 * @example
 * // Sets all account components to their default values. The dispatch 
 * // ...function is from useDispatch() imported from react-redux.
 * dispatch(setWhichGeneralDropdownsDisplay({}));
 */
export const setWhichAccountComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		container: ACCOUNT_CONTAINER,
		type: SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY,
		displays: displays,
	});
};

/**
 * Sets Object in project container of the redux state for how project
 * components should be displayed in the app
 *
 * @param {{
 * 	listView: (boolean|undefined),
 * 	listViewDeleteModal: (boolean|undefined),
 * 	listViewCreateItemSidbar: (boolean|undefined),
 * 	itemView: (boolean|undefined),
 * 	itemView: (boolean|undefined),
 * 	itemViewEditItemInfo: (boolean|undefined),
 * 	itemViewDeleteModal: (boolean|undefined),
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
 * // Sets listView to true, and all other project components to their default
 * // ...values. The dispatch function is from useDispatch() imported from
 * // ...react-redux.
 * dispatch(setWhichProjectComponentsDisplay({ listView: true }));
 *
 * @example
 * // Sets all project components to their default values. The dispatch 
 * // ...function is from useDispatch() imported from react-redux.
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
 * Sets Object in bug container of the redux state for how bug
 * components should be displayed in the app
 *
 * @param {{
 * 	listView: (boolean|undefined),
 * 	listViewDeleteModal: (boolean|undefined),
 * 	listViewCreateItemSidbar: (boolean|undefined),
 * 	itemView: (boolean|undefined),
 * 	itemView: (boolean|undefined),
 * 	itemViewEditItemInfo: (boolean|undefined),
 * 	itemViewDeleteModal: (boolean|undefined),
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
 * // Sets listView to true, and all other bug components to their default
 * // ...values. The dispatch function is from useDispatch() imported from
 * // ...react-redux.
 * dispatch(setWhichBugComponentsDisplay({ listView: true }));
 *
 * @example
 * // Sets all bug components to their default values. The dispatch function is 
 * // ...from useDispatch() imported from react-redux.
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
 * Sets Object in comment container of the redux state for how comment
 * components should be displayed in the app
 *
 * @param {{
 * 	commentDeleteModal: (boolean|undefined),
 * 	commentToBeDeleted: ({
 * 		bug_id: number,
 * 		id: number,
 * 		description: string,
 * 		location: string,
 * 		creation_date: string,
 * 		last_edited_timestamp: string,
 * 	}|null|undefined),
 * 	commentToBeDeleted: ({
 * 		bug_id: number,
 * 		id: number,
 * 		description: string,
 * 		location: string,
 * 		creation_date: string,
 * 		last_edited_timestamp: string,
 * 	}|null|undefined)
 * }} displays - Object containing info for how comment components should be 
 * displyed in the app. Any comment components set to undefined or excluded 
 * from this param will be set to their default value.
 *
 * @example
 * // Sets listView to true, and all other comment components to their default
 * // ...values. The dispatch function is from useDispatch() imported from
 * // ...react-redux.
 * dispatch(setWhichCommentComponentsDisplay({ listView: true }));
 *
 * @example
 * // Sets all comment components to their default values. The dispatch 
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
