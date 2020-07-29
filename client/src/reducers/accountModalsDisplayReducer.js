import { SET_WHICH_ACCOUNT_MODALS_DISPLAY } from "../actions/types";

const initialState = {
	editInfoModal: false,
	editEmailModal: false,
	editPasswordModal: false,
	deleteAccountModal: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_ACCOUNT_MODALS_DISPLAY:
			return {
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
