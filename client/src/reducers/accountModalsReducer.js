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
				editInfoModal: action.components.editInfoModal,
				editEmailModal: action.components.editEmailModal,
				editPasswordModal: action.components.editPasswordModal,
				deleteAccountModal: action.components.deleteAccountModal,
			};
		default:
			return state;
	}
}
