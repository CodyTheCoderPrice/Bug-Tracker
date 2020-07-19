import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateAccountEmail } from "../../../actions/accountActions";
import { setModalComponent } from "../../../actions/modalActions.js";

import EditInfoModal from "./EditInfoModal";

import "../../../SCSS/accountModals.scss";

export default function EditEmailModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		email: reduxState.account.email,
		currentPassword: "",
	});

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const backToEditInfo = () => {
		dispatch(
			setModalComponent({
				editInfoModal: <EditInfoModal />,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	};

	const closeModals = () => {
		dispatch(
			setModalComponent({
				editInfoModal: null,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountEmail(accountInfo));
	};

	return (
		<div>
			<div className="blurredBackground"></div>
			<div className="editAccountContainerDiv">
				<button className="backButton" onClick={backToEditInfo}>
					➔
				</button>
				<button className="exitButton" onClick={closeModals}>
					X
				</button>
				<form className="editAccountForm" noValidate onSubmit={handleSubmit}>
					<label className="titleLabel">Edit Email</label>
					<br />
					<span className="redErrorText">{reduxState.inputErrors.email}</span>
					<input
						type="email"
						name="email"
						onChange={(e) => onChange(e)}
						value={accountInfo.email}
						placeholder="Email"
						//error={reduxState.inputErrors.email}
						id="emailInput"
					/>
					<span className="redErrorText">
						{reduxState.inputErrors.currentPassword}
					</span>
					<input
						type="password"
						name="currentPassword"
						onChange={(e) => onChange(e)}
						value={accountInfo.currentPassword}
						placeholder="Current Password"
						//error={reduxState.inputErrors.currentPassword}
						id="currentPasswordInput"
					/>
					<span className="redErrorText">
						{reduxState.inputErrors.validation}
						{reduxState.inputErrors.account}
						{reduxState.inputErrors.server}
					</span>
					<button type="submit" className="submitButton">
						Update
					</button>
				</form>
			</div>
		</div>
	);
}
