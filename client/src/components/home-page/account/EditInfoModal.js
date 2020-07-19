import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateAccountInfo } from "../../../actions/accountActions";
import { setModalComponent } from "../../../actions/modalActions.js";

// Modals components for editing account
import EditEmailModal from "./EditEmailModal";
import EditPasswordModal from "./EditPasswordModal";
import DeleteAccountModal from "./DeleteAccountModal";

import "../../../SCSS/accountModals.scss";

export default function EditInfoModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		firstName: reduxState.account.firstName,
		lastName: reduxState.account.lastName,
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
				deleteAccountModal: null,
			})
		);
	};

	const openEditEmailModal = () => {
		dispatch(
			setModalComponent({
				editInfoModal: null,
				editEmailModal: <EditEmailModal />,
				editPasswordModal: null,
				deleteAccountModal: null,
			})
		);
	};

	const openEditPasswordModal = () => {
		dispatch(
			setModalComponent({
				editInfoModal: null,
				editEmailModal: null,
				editPasswordModal: <EditPasswordModal />,
				deleteAccountModal: null,
			})
		);
	};

	const openDeleteAccountModal = () => {
		dispatch(
			setModalComponent({
				editInfoModal: null,
				editEmailModal: null,
				editPasswordModal: null,
				deleteAccountModal: <DeleteAccountModal />,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountInfo(accountInfo));
	};

	return (
		<div>
			<div className="blurredBackground"></div>
			<div className="editAccountContainerDiv">
				<button className="exitButton" onClick={closeModals}>
					X
				</button>
				<form className="editAccountForm" noValidate onSubmit={handleSubmit}>
					<label className="titleLabel">Edit Personal Info</label>
					<br />
					<span className="redErrorText">
						{reduxState.inputErrors.firstName}
					</span>
					<input
						type="text"
						name="firstName"
						onChange={(e) => onChange(e)}
						value={accountInfo.firstName}
						placeholder="First name"
						//error={reduxState.inputErrors.firstName}
						id="firstNameInput"
					/>
					<span className="redErrorText">
						{reduxState.inputErrors.lastName}
					</span>
					<input
						type="text"
						name="lastName"
						onChange={(e) => onChange(e)}
						value={accountInfo.lastName}
						placeholder="Last name"
						//error={reduxState.inputErrors.lastName}
						id="lastNameInput"
					/>
					<span className="redErrorText">
						{reduxState.inputErrors.validation}
						{reduxState.inputErrors.account}
						{reduxState.inputErrors.server}
					</span>
					<button type="submit" className="submitButton">
						Update
					</button>
					<div className="otherEditModalsDiv">
						<label className="openModalLabel" onClick={openEditEmailModal}>
							Edit Email
						</label>
						<label className="orLabel">|</label>
						<label className="openModalLabel" onClick={openEditPasswordModal}>
							Edit Password
						</label>
						<label className="orLabel">|</label>
						<label className="openModalLabel" id="deleteLabel" onClick={openDeleteAccountModal}>
							Delete Account
						</label>
					</div>
				</form>
			</div>
		</div>
	);
}
