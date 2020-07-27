import { SET_ACCOUNT_MODAL_COMPONENTS } from "../actions/types";

const initialState = {
	editInfoModal: null,
	editEmailModal: null,
	editPasswordModal: null,
	deleteAccountModal: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_ACCOUNT_MODAL_COMPONENTS:
			return {
				editInfoModal: (action.components.editInfoModal !== undefined) ? action.components.editInfoModal : null,
				editEmailModal: (action.components.editEmailModal !== undefined) ? action.components.editEmailModal : null,
				editPasswordModal: (action.components.editPasswordModal !== undefined) ? action.components.editPasswordModal : null,
				deleteAccountModal: (action.components.deleteAccountModal !== undefined) ? action.components.deleteAccountModal : null,
			};
		default:
			return state;
	}
}
