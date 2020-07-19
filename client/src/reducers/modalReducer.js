import { SET_MODAL_COMPONENT } from "../actions/types";

const initialState = {
	editInfoModal: null,
	editEmailModal: null,
	editPasswordModal: null,
	deleteAccountModal: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_MODAL_COMPONENT:
			return {
				editInfoModal: action.component.editInfoModal,
				editEmailModal: action.component.editEmailModal,
				editPasswordModal: action.component.editPasswordModal,
				deleteAccountModal: action.component.deleteAccountModal,
			};
		default:
			return state;
	}
}
