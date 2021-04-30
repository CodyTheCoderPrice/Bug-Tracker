import { SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY } from "../../actions/constants/types";

// Default state for which account components should be displayed by the app
const initialState = {
	// All the following relate to components and if they should be displayed
	accountSidebar: false,
	accountModalChangeInfo: false,
	accountModalChangeEmail: false,
	accountModalChangePassword: false,
	accountModalDeleteAccount: false,
	accountModalChangeSettings: false,
};

/**
 * Used to set Object in the account container of the redux state for which
 * account components should display by the app
 *
 * @param {Object} state - Object for which account components are currently being
 * displayed by the app
 * @param {Object} action - Object containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {Object} Object for which account components should display by the
 * app, to be stored in the account container of the redux state
 */
export default function accountComponentsDisplayReducer(state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY:
			return {
				// Ternary operator is used to set undefined components to
				// ...false, so you only have to pass the components you want
				// ...to set to true, to make using this redux action easier
				accountSidebar:
					action.displays.accountSidebar !== undefined
						? action.displays.accountSidebar
						: false,
				accountModalChangeInfo:
					action.displays.accountModalChangeInfo !== undefined
						? action.displays.accountModalChangeInfo
						: false,
				accountModalChangeEmail:
					action.displays.accountModalChangeEmail !== undefined
						? action.displays.accountModalChangeEmail
						: false,
				accountModalChangePassword:
					action.displays.accountModalChangePassword !== undefined
						? action.displays.accountModalChangePassword
						: false,
				accountModalDeleteAccount:
					action.displays.accountModalDeleteAccount !== undefined
						? action.displays.accountModalDeleteAccount
						: false,
				accountModalChangeSettings:
					action.displays.accountModalChangeSettings !== undefined
						? action.displays.accountModalChangeSettings
						: false,
			};
		default:
			return state;
	}
}
