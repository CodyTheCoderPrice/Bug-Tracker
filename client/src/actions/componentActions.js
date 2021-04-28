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
 * Sets JSON object in general container of the redux state for how general
 * components should be displayed in the app
 *
 * @param {{
 * 	register: (Boolean|undefined),
 * 	login: (Boolean|undefined),
 * 	home: (Boolean|undefined),
 * 	itemViewListSidebar: (Boolean|undefined),
 * 	itemViewListSidebarUserSet: (Boolean|undefined)}} displays - JSON
 * containing info for how general components should be displyed in the app.
 * Any general components set to undefined or excluded from this param will be
 * set to their default value.
 *
 * @example
 * // Sets home component to true, and all other general components to their
 * // ...default values
 * dispatch(setWhichGeneralComponentsDisplay({ home: true }));
 *
 * @example
 * // Sets all general components to their default values
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
 * Sets JSON object in general container of the redux state for how general
 * dropdowns should be displayed in the app
 *
 * @param {{
 * 	navbarHamburherDropdown: (Boolean|undefined),
 * 	listViewSearchFilterSearchBarFilterDropdown: (Boolean|undefined),
 * 	itemViewTopBarSortDropdown: (Boolean|undefined),
 * 	itemViewTopBarFilterDropdown: (Boolean|undefined),
 * 	itemViewTopBarOptionsDropdown: (Boolean|undefined)}} displays - JSON
 * containing info for how general dropdowns should be displyed in the app. Any
 * general dropdowns set to undefined or excluded from this param will be set
 * to their default value.
 *
 * @example
 * // Sets navbarHamburherDropdown to true, and all other general dropdowns to
 * // ...their default values
 * dispatch(
 *		setWhichGeneralDropdownsDisplay({ navbarHamburherDropdown: true })
 *	);
 *
 * @example
 * // Sets all general dropdowns to their default values
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
 * Sets JSON object in account container of the redux state for how account
 * components should be displayed in the app
 *
 * @param {{
 * 	accountSidebar: (Boolean|undefined),
 * 	accountModalChangeInfo: (Boolean|undefined),
 * 	accountModalChangeEmail: (Boolean|undefined),
 * 	accountModalChangePassword: (Boolean|undefined),
 * 	accountModalDeleteAccount: (Boolean|undefined),
 * 	accountModalChangeSettings: (Boolean|undefined)}} displays - JSON
 * containing info for how account components should be displyed in the app.
 * Any account components set to undefined or excluded from this param will be
 * set to their default value.
 *
 * @example
 * // Sets accountSidebar to true, and all other account components to their
 * // ...default values
 * dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
 *
 * @example
 * // Sets all account components to their default values
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
 * Sets JSON object in project container of the redux state for how project
 * components should be displayed in the app
 *
 * @param {{
 * 	listView: (Boolean|undefined),
 * 	listViewDeleteModal: (Boolean|undefined),
 * 	listViewCreateItemSidbar: (Boolean|undefined),
 * 	itemView: (Boolean|undefined),
 * 	itemView: (Boolean|undefined),
 * 	itemViewEditItemInfo: (Boolean|undefined),
 * 	itemViewDeleteModal: (Boolean|undefined),
 * 	itemViewCurrentItem: ({
 * 		account_id: Number,
 * 		id: Number,
 * 		name: String,
 * 		description: String,
 * 		creation_date: String,
 * 		start_date: (String|null),
 * 		due_date: (String|null),
 * 		completion_date: (String|null),
 * 		priority_id: Number,
 * 		priority_option: String,
 * 		status_id: Number,
 * 		status_option: String,
 * 		last_edited_timestamp: Number
 * 	}|null|undefined)
 * }} displays - JSON containing info for how project components should be
 * displyed in the app. Any project components set to undefined or excluded
 * from this param will be set to their default value.
 *
 * @example
 * // Sets listView to true, and all other project components to their default
 * // ...values
 * dispatch(setWhichProjectComponentsDisplay({ listView: true }));
 *
 * @example
 * // Sets all project components to their default values
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
 * Sets JSON object in bug container of the redux state for how bug
 * components should be displayed in the app
 *
 * @param {{
 * 	listView: (Boolean|undefined),
 * 	listViewDeleteModal: (Boolean|undefined),
 * 	listViewCreateItemSidbar: (Boolean|undefined),
 * 	itemView: (Boolean|undefined),
 * 	itemView: (Boolean|undefined),
 * 	itemViewEditItemInfo: (Boolean|undefined),
 * 	itemViewDeleteModal: (Boolean|undefined),
 * 	itemViewCurrentItem: ({
 * 		account_id: Number,
 * 		id: Number,
 * 		name: String,
 * 		description: String,
 * 		location: String,
 * 		creation_date: String,
 * 		start_date: (String|null),
 * 		due_date: (String|null),
 * 		completion_date: (String|null),
 * 		priority_id: Number,
 * 		priority_option: String,
 * 		status_id: Number,
 * 		status_option: String,
 * 		last_edited_timestamp: Number
 * 	}|null|undefined)
 * }} displays - JSON containing info for how bug components should be displyed
 * in the app. Any bug components set to undefined or excluded from this param 
 * will be set to their default value.
 *
 * @example
 * // Sets listView to true, and all other bug components to their default
 * // ...values
 * dispatch(setWhichBugComponentsDisplay({ listView: true }));
 *
 * @example
 * // Sets all bug components to their default values
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
 * Sets JSON object in comment container of the redux state for how comment
 * components should be displayed in the app
 *
 * @param {{
 * 	commentDeleteModal: (Boolean|undefined),
 * 	commentToBeDeleted: ({
 * 		bug_id: Number,
 * 		id: Number,
 * 		description: String,
 * 		location: String,
 * 		creation_date: String,
 * 		last_edited_timestamp: Number,
 * 	}|null|undefined),
 * 	commentToBeDeleted: ({
 * 		bug_id: Number,
 * 		id: Number,
 * 		description: String,
 * 		location: String,
 * 		creation_date: String,
 * 		last_edited_timestamp: Number,
 * 	}|null|undefined)
 * }} displays - JSON containing info for how comment components should be 
 * displyed in the app. Any comment components set to undefined or excluded 
 * from this param will be set to their default value.
 *
 * @example
 * // Sets listView to true, and all other comment components to their default
 * // ...values
 * dispatch(setWhichCommentComponentsDisplay({ listView: true }));
 *
 * @example
 * // Sets all comment components to their default values
 * dispatch(setWhichCommentComponentsDisplay({}));
 */
export const setWhichCommentComponentsDisplay = (displays) => (dispatch) => {
	dispatch({
		container: COMMENT_CONTAINER,
		type: SET_WHICH_COMMENT_COMPONENTS_DISPLAY,
		displays: displays,
	});
};
