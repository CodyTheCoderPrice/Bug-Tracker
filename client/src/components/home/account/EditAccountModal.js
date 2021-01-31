import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";

import {
	setWhichAccountComponentsDisplay,
} from "../../../actions";

// Components
import EditAccountModalChangeInfo from "./EditAccountModalChangeInfo";
import EditAccountModalChangeEmail from "./EditAccountModalChangeEmail";
import EditAccountModalChangePassword from "./EditAccountModalChangePassword";
import EditAccountModalDeleteAccount from "./EditAccountModalDeleteAccount";

export default function EditAccountModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const closeAccountComponents = () => {
		dispatch(setWhichAccountComponentsDisplay({accountSidebar: true}));
	};

	return (
		<div className="edit-account-modal-component">
			<div className="edit-account-modal">
				<div className="exit-button" onClick={closeAccountComponents}>
					<i className="fa fa-times" aria-hidden="true" alt="icon of an X"></i>
				</div>
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay.editAccountModalChangeInfo ? (
					<EditAccountModalChangeInfo />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay.editAccountModalChangeEmail ? (
					<EditAccountModalChangeEmail />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay.editAccountModalChangePassword ? (
					<EditAccountModalChangePassword />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay.editAccountModalDeleteAccount ? (
					<EditAccountModalDeleteAccount />
				) : null}
			</div>
		</div>
	);
}
