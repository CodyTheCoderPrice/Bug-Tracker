import { SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY } from "../../actions/constants/types";
import { filterObject, getStringOfAllArrayValues } from "../../utils";

const initialState = {
	accountSidebarComponentShouldDisplay: false,
	accountModalEditInfoComponentShouldDisplay: false,
	accountModalEditEmailComponentShouldDisplay: false,
	accountModalEditPasswordComponentShouldDisplay: false,
	accountModalDeleteAccountComponentShouldDisplay: false,
	accountModalEditSettingsComponentShouldDisplay: false,
};

/**
 * Uses 'displays' prop to set 'componentsDisplay' Object (to guide how account
 * components should display by the app) in 'ACCOUNT_CONTAINER' of the redux
 * state. If any properties in 'displays' prop are undefined, then they will be
 * set to false in 'componentsDisplay'.
 *
 * Rules: The 'displays' prop should have at most only one of its boolean
 * properties as true. If the 'displays' prop does not follow the rules then a
 * fail safe will alter it to do so (in the reducer).
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
 * @param {({
 * 	accountSidebarComponentShouldDisplay: boolean,
 * 	accountModalEditInfoComponentShouldDisplay: boolean,
 * 	accountModalEditEmailComponentShouldDisplay: boolean,
 * 	accountModalEditPasswordComponentShouldDisplay: boolean,
 * 	accountModalDeleteAccountComponentShouldDisplay: boolean,
 * 	accountModalEditSettingsComponentShouldDisplay: boolean
 * }|undefined)} state - Current Object (in the redux state) guiding which account
 * components are being displayed by the app
 * @param {Object} action - Object with a 'container' property (determins where
 * in the redux state) and 'type' property (determins what task to do there).
 * Also may have additional properties with data needed for the task (usually
 * data to be updated in the redux state).
 * @returns {{
 * 	accountSidebarComponentShouldDisplay: boolean,
 * 	accountModalEditInfoComponentShouldDisplay: boolean,
 * 	accountModalEditEmailComponentShouldDisplay: boolean,
 * 	accountModalEditPasswordComponentShouldDisplay: boolean,
 * 	accountModalDeleteAccountComponentShouldDisplay: boolean,
 * 	accountModalEditSettingsComponentShouldDisplay: boolean
 * }} Updated Object to guide how account components should be displayed by the
 * app
 */
export default function accountComponentsDisplayReducer(
	state = initialState,
	action
) {
	switch (action.type) {
		case SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY:
			const validatedDisplays = getValidatedDisplays(action.displays);

			return {
				accountSidebarComponentShouldDisplay:
					validatedDisplays.accountSidebarComponentShouldDisplay !== undefined
						? validatedDisplays.accountSidebarComponentShouldDisplay
						: false,
				accountModalEditInfoComponentShouldDisplay:
					validatedDisplays.accountModalEditInfoComponentShouldDisplay !==
					undefined
						? validatedDisplays.accountModalEditInfoComponentShouldDisplay
						: false,
				accountModalEditEmailComponentShouldDisplay:
					validatedDisplays.accountModalEditEmailComponentShouldDisplay !==
					undefined
						? validatedDisplays.accountModalEditEmailComponentShouldDisplay
						: false,
				accountModalEditPasswordComponentShouldDisplay:
					validatedDisplays.accountModalEditPasswordComponentShouldDisplay !==
					undefined
						? validatedDisplays.accountModalEditPasswordComponentShouldDisplay
						: false,
				accountModalDeleteAccountComponentShouldDisplay:
					validatedDisplays.accountModalDeleteAccountComponentShouldDisplay !==
					undefined
						? validatedDisplays.accountModalDeleteAccountComponentShouldDisplay
						: false,
				accountModalEditSettingsComponentShouldDisplay:
					validatedDisplays.accountModalEditSettingsComponentShouldDisplay !==
					undefined
						? validatedDisplays.accountModalEditSettingsComponentShouldDisplay
						: false,
			};
		default:
			return state;
	}
}

/**
 * Checks if 'displays' prop follows the rules stated in JsDoc of
 * accountComponentsDisplayReducer. If valid, then 'displays' is returned
 * unchanged. If invalid, then a new version that's altered to follow the rules
 * is returned instead.
 *
 * @param {{
 * 	accountSidebarComponentShouldDisplay: boolean,
 * 	accountModalEditInfoComponentShouldDisplay: boolean,
 * 	accountModalEditEmailComponentShouldDisplay: boolean,
 * 	accountModalEditPasswordComponentShouldDisplay: boolean,
 * 	accountModalDeleteAccountComponentShouldDisplay: boolean,
 * 	accountModalEditSettingsComponentShouldDisplay: boolean
 * }} displays - 'action.displays' Object containing properties to guide how
 * account components should be displyed in the app.
 * @returns {{
 * 	accountSidebarComponentShouldDisplay: boolean,
 * 	accountModalEditInfoComponentShouldDisplay: boolean,
 * 	accountModalEditEmailComponentShouldDisplay: boolean,
 * 	accountModalEditPasswordComponentShouldDisplay: boolean,
 * 	accountModalDeleteAccountComponentShouldDisplay: boolean,
 * 	accountModalEditSettingsComponentShouldDisplay: boolean
 * }} Validated 'action.displays' Object containing properties to guide how
 * account components should be displyed in the app.
 */
function getValidatedDisplays(displays) {
	const keysOfAccountComponentsSetToTrue = Object.keys(
		filterObject(displays, (boolean) => boolean === true)
	);

	if (keysOfAccountComponentsSetToTrue.length < 2) {
		// Valid and therefore returned the same.
		return displays;
	}
	// Fail Safe
	else {
		// Invalid and therefore new displays is needed.
		const newDisplays = { ...initialState };
		// Keeping only one of its booleans true (Which one to keep true is
		// arbitrary, but the first key is easiest to implement)
		newDisplays[keysOfAccountComponentsSetToTrue[0]] = true;

		console.log(
			"FAIL SAFE: " +
				getStringOfAllArrayValues(keysOfAccountComponentsSetToTrue, true) +
				" were all attempted to be set to true in the redux state which goes against their intended use. So only" +
				keysOfAccountComponentsSetToTrue[0] +
				" was set to true."
		);

		return newDisplays;
	}
}
