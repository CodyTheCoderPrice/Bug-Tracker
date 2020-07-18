import { SET_MODAL_COMPONENT } from "../actions/types";

const initialState = {
	editInfoModal: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_MODAL_COMPONENT:
			return { editInfoModal: action.component.editInfoModal }
		default:
			return state;
	}
}
