import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateAccountPassword } from "../../../actions/accountActions";
import { setModalComponent } from "../../../actions/modalActions.js";

// Modals components for editing account
import EditInfoModal from "./EditInfoModal";
import EditEmailModal from "./EditEmailModal";

import "../../../SCSS/accountModals.scss";

export default function EditPasswordModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		newPassword: "",
		newPassword2: "",
		currentPassword: "",
	});

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
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

	const openEditEmailModal = () => {
		dispatch(
			setModalComponent({
				editInfoModal: null,
				editEmailModal: <EditEmailModal />,
				editPasswordModal: null,
			})
		);
	};

	const openEditInfoModal = () => {
		dispatch(
			setModalComponent({
				editInfoModal: <EditInfoModal />,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountPassword(accountInfo));
	};

	return (
		<div>
			<div className="blurredBackground"></div>
			<div className="editInfoContainerDiv">
				<button className="exitButton" onClick={closeModals}>
					X
				</button>
				<form className="editAccountForm" noValidate onSubmit={handleSubmit}>
					<label className="titleLabel">Edit Password</label>
					<br />
					<span className="redErrorText">
						{reduxState.inputErrors.newPassword}
					</span>
					<input
						type="password"
						name="newPassword"
						onChange={(e) => onChange(e)}
						value={accountInfo.newPassword}
						placeholder="New Password"
						//error={reduxState.inputErrors.newPassword}
						id="newPasswordInput"
					/>
					<span className="redErrorText">
						{reduxState.inputErrors.newPassword2}
					</span>
					<input
						type="password"
						name="newPassword2"
						onChange={(e) => onChange(e)}
						value={accountInfo.newPassword2}
						placeholder="Confirm New Password"
						//error={reduxState.inputErrors.newPassword2}
						id="newPassword2Input"
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
					<button type="submit" className="submitButton">Update</button>
					<div className="otherModalsDiv">
						<label className="openModalLabel" onClick={openEditEmailModal}>
							Edit Email
						</label>
						<label className="orLabel">|</label>
						<label className="openModalLabel" onClick={openEditInfoModal}>
							Edit Personal
						</label>
					</div>
				</form>
			</div>
		</div>
	);
}
