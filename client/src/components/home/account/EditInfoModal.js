import React, { useState, useEffect } from "react";
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
		first_name: reduxState.account.first_name,
		last_name: reduxState.account.last_name,
	});

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const closeAccountComponents = () => {
		dispatch(setWhichAccountComponentsDisplay({}));
	};

	const openEditEmailModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				editEmailModal: true,
			})
		);
	};

	const openEditPasswordModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				editPasswordModal: true,
			})
		);
	};

	const openDeleteAccountModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				deleteAccountModal: true,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountInfo(accountInfo));
	};

	return (
		<div className="edit-account-modal-components">
			<div className="edit-account-modal">
				<div className="exit-button" onClick={closeAccountComponents}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<h1 className="title">Edit Personal Info</h1>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label htmlFor="edit-account-info-first-name" className="form__label">
						First Name:{" "}
					</label>
					<input
						type="text"
						name="first_name"
						onChange={(e) => onChange(e)}
						value={accountInfo.first_name}
						id="edit-account-info-first-name"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.first_name}
					</span>
					<label htmlFor="edit-account-info-last-name" className="form__label">
						Last Name:{" "}
					</label>
					<input
						type="text"
						name="last_name"
						onChange={(e) => onChange(e)}
						value={accountInfo.last_name}
						id="edit-account-info-last-name"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.last_name}
					</span>
					<button type="submit" className="form__submit">
						Update
					</button>
					<span className="form__errors">
						{reduxState.inputErrors.validation}
						{reduxState.inputErrors.server}
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
