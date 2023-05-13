import { SET_WHICH_GENERAL_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

// Initial state for which general components should be displayed by the app
const initialState = {
	registerComponentShouldDisplay: false,
	// Default is true so the app will open on the Login component.
	loginComponentShouldDisplay: true,
	homeComponentShouldDisplay: false,
	navPanelButtonListComponentShouldIncludeCompletedProjects: false,
	navPanelButtonListComponentShouldIncludeClosedBugs: false,
};

/**
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how general
 * components should display by the app) in 'GENERAL_CONTAINER' of the redux
 * state. If any properties in 'displays' prop are undefined, then they will be
 * set to false in 'componentsDisplay'.
 *
 * Rules: The 'displays' prop should have at most only one of
 * 'registerComponentShouldDisplay', 'loginComponentShouldDisplay', or
 * 'homeComponentShouldDisplay' booleans as true, as well as
 * 'homeComponentShouldDisplay' should always be true while a user is logged
 * into the app, and either 'registerComponentShouldDisplay' or
 * 'loginComponentShouldDisplay' should be true if a user is not logged in. If
 * the 'displays' prop does not follow the rules then a fail safe will alter it
 * to do so (in the reducer).
 *
 * Note: The purpose of each booleans in 'componentsDisplay' Object with names
 * ending in '...ShouldDisplay' are to be used as flags for whether the
 * components they represent should be displayed by the app. The reason at most
 * only one of these three booleans should be true is to both prevent CSS issues,
 * as their components will break each others intended CSS design, and because
 * it makes sense to seperate their component's functionalities (e.g. registering
 * or logging-in is best done when not already logged-in and using the Home
 * component). The purpose of the 'navPanelButtonListComponentShouldIncludeCompletedProjects'
 * and the 'navPanelButtonListComponentShouldIncludeClosedBugs' properties is to
 * be used as flags for whether the NavPanelButtonList component's 'sub-overflow-container'
 * (className) elements should include projects with a completed status or bugs
 * with a closed status. They should only be set to true if the most recent
 * project/bug  openned from a listView component is completed/closed.
 * The reason undefined properties in 'displays' prop are set to false in
 * 'componentsDisplay' is to allow devs to only have to pass properties they
 * wish to set to true (making life easier).
 *
 * @param {({
 * 	registerComponentShouldDisplay: (boolean|undefined),
 * 	loginComponentShouldDisplay: (boolean|undefined),
 * 	homeComponentShouldDisplay: (boolean|undefined),
 * 	navPanelButtonListComponentShouldIncludeCompletedProjects: (boolean|undefined),
 * 	navPanelButtonListComponentShouldIncludeClosedBugs: (boolean|undefined),
 * }|undefined)} state - Current Object (in the redux state) for which general
 * components are being displayed by the app
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	registerComponentShouldDisplay: boolean,
 * 	loginComponentShouldDisplay: boolean,
 * 	homeComponentShouldDisplay: boolean,
 * 	navPanelButtonListComponentShouldIncludeCompletedProjects: boolean,
 * 	navPanelButtonListComponentShouldIncludeClosedBugs: boolean,
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
				navPanelButtonListComponentShouldIncludeCompletedProjects:
					validatedDisplays.navPanelButtonListComponentShouldIncludeCompletedProjects !==
					undefined
						? validatedDisplays.navPanelButtonListComponentShouldIncludeCompletedProjects
						: state.navPanelButtonListComponentShouldIncludeCompletedProjects,
				navPanelButtonListComponentShouldIncludeClosedBugs:
					validatedDisplays.navPanelButtonListComponentShouldIncludeClosedBugs !==
					undefined
						? validatedDisplays.navPanelButtonListComponentShouldIncludeClosedBugs
						: state.navPanelButtonListComponentShouldIncludeClosedBugs,
			};
		default:
			return state;
	}
}

/**
 * Checks if 'displays' prop follows the rules stated in JsDoc of
 * generalComponentsDisplayReducer. If valid, then 'displays' is returned
 * unchanged. If invalid, then a new version that's altered to follow the rules
 * is returned instead.
 *
 * @param {{
 * 	registerComponentShouldDisplay: boolean,
 * 	loginComponentShouldDisplay: boolean,
 * 	homeComponentShouldDisplay: boolean,
 * }} displays - 'action.displays' Object containing properties to guide how
 * general components should be displyed in the app.
 * @returns {{
 * 	registerComponentShouldDisplay: boolean,
 * 	loginComponentShouldDisplay: boolean,
 * 	homeComponentShouldDisplay: boolean,
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
