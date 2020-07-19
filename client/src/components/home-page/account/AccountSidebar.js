import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

import { logoutAccount } from "../../../actions/accountActions";
import { setModalComponent } from "../../../actions/modalActions.js";

// Modals components for editing account
import EditInfoModal from "./EditInfoModal";

import "../../../SCSS/accountSidebar.scss";

export default function Account() {
	const [modals, setModals] = useState({
		editInfoModal: null,
	});

	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const openEditInfoModals = () => {
		dispatch(
			setModalComponent({
				editInfoModal: <EditInfoModal />,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	};

	const handleLogoutAccount = () => {
		dispatch(logoutAccount());
	};

	const logReduxState = () => {
		console.log(reduxState);
	};

	return (
		<div>
			<div className="accountConstainerDiv">
				<label className="nameLabel">
					{reduxState.account.firstName} {reduxState.account.lastName}
				</label>
				<br />
				<label className="emailLabel">{reduxState.account.email}</label> <br />
				<label className="joinDateLabel">
					Joined: {moment(reduxState.account.joinDate).format("MM-DD-YYYY")}
				</label>
				<br />
				<button onClick={openEditInfoModals}>Edit Info</button> <br />
				<button onClick={handleLogoutAccount}>Logout</button> <br />
				<button onClick={logReduxState}>Log Redux State</button>
			</div>
			{reduxState.modals.editInfoModal}
			{reduxState.modals.editEmailModal}
			{reduxState.modals.editPasswordModal}
		</div>
	);
}
