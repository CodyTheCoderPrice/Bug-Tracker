import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateAccountInfo,
	setWhichAccountModalsDisplay,
	clearInputErrors,
} from "../../../actions";

import "../../../SCSS/accountModals.scss";

export default function EditInfoModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		firstName: reduxState.account.firstName,
		lastName: reduxState.account.lastName,
	});

	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const closeModals = () => {
		dispatch(setWhichAccountModalsDisplay({}));
	};

	const openEditEmailModal = () => {
		dispatch(
			setWhichAccountModalsDisplay({
				editEmailModal: true,
			})
		);
	};

	const openEditPasswordModal = () => {
		dispatch(
			setWhichAccountModalsDisplay({
				editPasswordModal: true,
			})
		);
	};

	const openDeleteAccountModal = () => {
		dispatch(
			setWhichAccountModalsDisplay({
				deleteAccountModal: true,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// clears any prior input errors
		dispatch(clearInputErrors());
		dispatch(updateAccountInfo(accountInfo));
		setShouldShowAnyErrors(true);
	};

	return (
		<div>
			<div className="accountModalsBlurredBackgroundDiv" />
			<div className="editAccountContainerDiv">
				<button className="exitButton" onClick={closeModals}>
					X
				</button>
				<form className="editAccountForm" noValidate onSubmit={handleSubmit}>
					<label className="titleLabel">Edit Personal Info</label>
					<br />
					<span className="redErrorText">
						{shouldShowAnyErrors ? reduxState.inputErrors.firstName : ""}
					</span>
					<input
						type="text"
						name="firstName"
						onChange={(e) => onChange(e)}
						value={accountInfo.firstName}
						placeholder="First name"
						id="firstNameInput"
						className="formInput"
					/>
					<span className="redErrorText">
						{shouldShowAnyErrors ? reduxState.inputErrors.lastName : ""}
					</span>
					<input
						type="text"
						name="lastName"
						onChange={(e) => onChange(e)}
						value={accountInfo.lastName}
						placeholder="Last name"
						id="lastNameInput"
						className="formInput"
					/>
					<span className="redErrorText">
						{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.account : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
					</span>
					<button type="submit" className="submitButton">
						Update
					</button>
				</form>
				<div className="openOtherModalsDiv">
					<label className="openModalLabel" onClick={openEditEmailModal}>
						Edit Email
					</label>
					<label className="orLabel">|</label>
					<label className="openModalLabel" onClick={openEditPasswordModal}>
						Edit Password
					</label>
					<label className="orLabel">|</label>
					<label
						className="openModalLabel"
						id="deleteLabel"
						onClick={openDeleteAccountModal}
					>
						Delete Account
					</label>
				</div>
			</div>
		</div>
	);
}
