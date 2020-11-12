import { SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY } from "../../actions/constants/types";

const initialState = {
	accountSidebar: false,
	editAccountModalChangeInfo: false,
	editAccountModalChangeEmail: false,
	editAccountModalChangePassword: false,
	editAccountModalDeleteAccount: false,
};

// Ternary operator is used to set undefined components to false since
// ...usually if one component is being set true, most others are being set false
// ...this allows passing only the components you want to display
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY:
			return {
				accountSidebar:
					action.displays.accountSidebar !== undefined
						? action.displays.accountSidebar
						: false,
				editAccountModalChangeInfo:
					action.displays.editAccountModalChangeInfo !== undefined
						? action.displays.editAccountModalChangeInfo
						: false,
				editAccountModalChangeEmail:
					action.displays.editAccountModalChangeEmail !== undefined
						? action.displays.editAccountModalChangeEmail
						: false,
				editAccountModalChangePassword:
					action.displays.editAccountModalChangePassword !== undefined
						? action.displays.editAccountModalChangePassword
						: false,
				editAccountModalDeleteAccount:
					action.displays.editAccountModalDeleteAccount !== undefined
						? action.displays.editAccountModalDeleteAccount
						: false,
			};
		default:
			return state;
	}
}
