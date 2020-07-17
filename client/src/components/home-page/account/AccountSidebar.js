import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";
// components for editing account
import EditAccountInfo from "./EditAccountInfo";
import "../../../SCSS/account.scss";

export default function Account() {
	const [componentVisibility, setComponentVisibility] = useState({
		editAccountInfo: false,
	});
	const [component, setComponent] = useState({
		editAccountInfo: null,
	});

	useEffect(() => {
		if (componentVisibility.editAccountInfo) {
			setComponent({ editAccountInfo: <EditAccountInfo /> });
		}
	});

	const reduxState = useSelector((state) => state);
	//const dispatch = useDispatch();

	const openEditAccountInfo = () => {
		setComponentVisibility({
			editAccountInfo: !componentVisibility.editAccountInfo,
		});
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
				<button onClick={openEditAccountInfo}>Edit Info</button> <br />
				<button onClick={logReduxState}>Log Redux State</button>
			</div>
			{component.editAccountInfo}
		</div>
	);
}
