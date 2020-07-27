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
				editInfoModal: (action.modals.editInfoModal !== undefined) ? action.modals.editInfoModal : false,
				editEmailModal: (action.modals.editEmailModal !== undefined) ? action.modals.editEmailModal : false,
				editPasswordModal: (action.modals.editPasswordModal !== undefined) ? action.modals.editPasswordModal : false,
				deleteAccountModal: (action.modals.deleteAccountModal !== undefined) ? action.modals.deleteAccountModal : false,
			};
		default:
			return state;
	}
}
