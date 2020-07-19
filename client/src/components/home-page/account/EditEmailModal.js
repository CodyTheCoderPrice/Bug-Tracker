import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateAccountEmail } from "../../../actions/accountActions";
import { setModalComponent } from "../../../actions/modalActions.js";

// Modals components for editing account
import EditInfoModal from "./EditInfoModal";
import EditPasswordModal from "./EditPasswordModal";

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

	const closeModals = () => {
		dispatch(
			setModalComponent({
				editInfoModal: null,
				editEmailModal: null,
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

	const openEditPasswordModal = () => {
		dispatch(
			setModalComponent({
				editInfoModal: null,
				editEmailModal: null,
				editPasswordModal: <EditPasswordModal />,
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
			<div className="editInfoContainerDiv">
				<button className="exitButton" onClick={closeModals}>
					X
				</button>
				<form className="editAccountForm" noValidate onSubmit={handleSubmit}>
					<label className="titleLabel">Edit Email</label>
					<br />
					<span className="redErrorText">
						{reduxState.inputErrors.email}
					</span>
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
					<button type="submit" className="submitButton">Update</button>
					<div className="otherModalsDiv">
						<label className="openModalLabel" onClick={openEditInfoModal}>
							Edit Personal
						</label>
						<label className="orLabel">|</label>
						<label className="openModalLabel" onClick={openEditPasswordModal}>
							Edit Password
						</label>
					</div>
				</form>
			</div>
		</div>
	);
}
