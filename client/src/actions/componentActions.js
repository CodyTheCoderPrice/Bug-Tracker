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
 * @param {JSON} displays - JSON containing info for how general components
 * should be displyed in the app. Any general components excluded from this
 * param will be set to their default value.
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
 * @param {JSON} displays - JSON containing info for how general dropdowns
 * should be displyed in the app. Any general dropdowns excluded from this
 * param will be set to their default value.
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
 * @param {JSON} displays - JSON containing info for how account components
 * should be displyed in the app. Any account components excluded from this
 * param will be set to their default value.
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
 * @param {JSON} displays - JSON containing info for how project components
 * should be displyed in the app. Any project components excluded from this
 * param will be set to their default value.
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
 * @param {JSON} displays - JSON containing info for how bug components
 * should be displyed in the app. Any bug components excluded from this
 * param will be set to their default value.
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
 * @param {JSON} displays - JSON containing info for how comment components
 * should be displyed in the app. Any comment components excluded from this
 * param will be set to their default value.
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
