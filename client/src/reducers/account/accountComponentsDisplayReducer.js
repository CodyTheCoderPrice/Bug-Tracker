import { SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

// Initial state for which account components should be displayed by the app
const initialState = {
	// All the following relate to components and if they should be displayed
	// ...also this property shouldn't be true while any of the follow also are
	accountSidebar: false,
	// At most one of the following should be true at any given point in time
	// ...or they will cause CSS issues
	accountModalEditInfo: false,
	accountModalEditEmail: false,
	accountModalEditPassword: false,
	accountModalDeleteAccount: false,
	accountModalEditSettings: false,
};

/**
 * Used to set 'componentsDisplay' Object in ACCOUNT_CONTAINER of the redux
 * state for which account components should display by the app. At most, 
 * actions.displays should only have one property as true, and if this is not 
 * the case, then only one of its properties will be arbitrarily selected to 
 * become true in the redux state. Also if any of actions.displays expected 
 * properties (e.g. accountSidebar, accountModalEditInfo, ect.) are undefined,
 * then they will be set to false in the redux state.
 *
 * @param {{
 * 	accountSidebar: boolean,
 * 	accountModalEditInfo: boolean,
 * 	accountModalEditEmail: boolean,
 * 	accountModalEditPassword: boolean,
 * 	accountModalDeleteAccount: boolean,
 * 	accountModalEditSettings: boolean
 * }} state - Current Object (in the redux state) for which account components
 * are being displayed by the app
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	accountSidebar: boolean,
 * 	accountModalEditInfo: boolean,
 * 	accountModalEditEmail: boolean,
 * 	accountModalEditPassword: boolean,
 * 	accountModalDeleteAccount: boolean,
 * 	accountModalEditSettings: boolean
 * }} Object for which account components should be displayed by the app
 */
export default function accountComponentsDisplayReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY:
			let accountComponentsSetToTrue = filterObject(
				action.displays,
				(boolean) => boolean === true
			);

			const keysOfAccountComponentsSetToTrue = Object.keys(accountComponentsSetToTrue);

			// Makes sure multiple AccountModal child components never display.
			if (keysOfAccountComponentsSetToTrue.length > 1) {
				// Which key to choose is arbitrary, but first key is easiest
				const newDisplays = {...initialState};
				newDisplays[keysOfAccountComponentsSetToTrue[0]] = true;

				console.log(
					"Error: " +
						getStringOfAllArrayValues(keysOfAccountComponentsSetToTrue) +
						" were all attempted to be set to true in accountComponentsDisplayReducer, which goes against their intended use, so only" +
						keysOfAccountComponentsSetToTrue[0] +
						" was set to true."
				);

				return newDisplays;
			}

			return {
				// Ternary operator is used to set undefined components to
				// ...false, so you only have to pass the components you want
				// ...to set to true, which makes using this redux action easier
				accountSidebar:
					action.displays.accountSidebar !== undefined
						? action.displays.accountSidebar
						: false,
				accountModalEditInfo:
					action.displays.accountModalEditInfo !== undefined
						? action.displays.accountModalEditInfo
						: false,
				accountModalEditEmail:
					action.displays.accountModalEditEmail !== undefined
						? action.displays.accountModalEditEmail
						: false,
				accountModalEditPassword:
					action.displays.accountModalEditPassword !== undefined
						? action.displays.accountModalEditPassword
						: false,
				accountModalDeleteAccount:
					action.displays.accountModalDeleteAccount !== undefined
						? action.displays.accountModalDeleteAccount
						: false,
				accountModalEditSettings:
					action.displays.accountModalEditSettings !== undefined
						? action.displays.accountModalEditSettings
						: false,
			};
		default:
			return state;
	}
}
