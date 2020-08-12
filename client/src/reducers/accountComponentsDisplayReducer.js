import { SET_WHICH_ACCOUNT_COMPONENTS_DISPLAY } from "../actions/types";

const initialState = {
	accountSidebar: false,
	editInfoModal: false,
	editEmailModal: false,
	editPasswordModal: false,
	deleteAccountModal: false,
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
				editInfoModal:
					action.displays.editInfoModal !== undefined
						? action.displays.editInfoModal
						: false,
				editEmailModal:
					action.displays.editEmailModal !== undefined
						? action.displays.editEmailModal
						: false,
				editPasswordModal:
					action.displays.editPasswordModal !== undefined
						? action.displays.editPasswordModal
						: false,
				deleteAccountModal:
					action.displays.deleteAccountModal !== undefined
						? action.displays.deleteAccountModal
						: false,
			};
		default:
			return state;
	}
}
