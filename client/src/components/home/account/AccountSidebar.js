import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

import { logoutAccount, setWhichAccountComponentsDisplay } from "../../../actions";

import "../../../SCSS/account/accountSidebar.scss";

export default function AccountSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const openEditInfoModals = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountSidebar: true,
				editInfoModal: true,
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
	);
}
