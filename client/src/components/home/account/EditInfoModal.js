import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateAccountInfo,
	setWhichAccountComponentsDisplay,
	clearInputErrors,
} from "../../../actions";

import "../../../SCSS/account/accountModals.scss";

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
		dispatch(
			setWhichAccountComponentsDisplay({
				accountDropdown: true,
			})
		);
	};

	const openEditEmailModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountDropdown: true,
				editEmailModal: true,
			})
		);
	};

	const openEditPasswordModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountDropdown: true,
				editPasswordModal: true,
			})
		);
	};

	const openDeleteAccountModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountDropdown: true,
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
		<div className="edit-account-modal-components">
			<div className="edit-account-modal">
				<div className="exit-button" onClick={closeModals}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<h1 className="title">Edit Personal Info</h1>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label htmlFor="edit-account-info-first-name" className="form__label">
						First Name:{" "}
					</label>
					<input
						type="text"
						name="firstName"
						onChange={(e) => onChange(e)}
						value={accountInfo.firstName}
						id="edit-account-info-first-name"
						className="form__text-input"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.firstName : ""}
					</span>
					<label htmlFor="edit-account-info-last-name" className="form__label">
						Last Name:{" "}
					</label>
					<input
						type="text"
						name="lastName"
						onChange={(e) => onChange(e)}
						value={accountInfo.lastName}
						id="edit-account-info-last-name"
						className="form__text-input"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.lastName : ""}
					</span>
					<button type="submit" className="form__submit">
						Update
					</button>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
					</span>
				</form>
				<div className="modal-links-container">
					<span onClick={openEditEmailModal} className="modal-link">
						Edit Email
					</span>
					<span className="link-spacer">|</span>
					<span onClick={openEditPasswordModal} className="modal-link">
						Edit Password
					</span>
					<span className="link-spacer">|</span>
					<span onClick={openDeleteAccountModal} className="modal-link">
						Delete Account
					</span>
				</div>
			</div>
		</div>
	);
}
