import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	deleteAccount,
	setWhichAccountComponentsDisplay,
	clearInputErrors,
} from "../../../actions";

import "../../../SCSS/account/accountModals.scss";

export default function DeleteAccountModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		deleteTypedOut: "",
		currentPassword: "",
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

	const backToEditInfo = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountDropdown: true,
				editInfoModal: true,
			})
		);
	};

	const closeModals = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountDropdown: true,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(deleteAccount(accountInfo));
	};

	return (
		<div className="edit-account-modal-components">
			<div className="edit-account-modal">
				<div className="back-button" onClick={backToEditInfo}>
					<i className="fa fa-arrow-left" aria-hidden="true"></i>
				</div>
				<div className="exit-button" onClick={closeModals}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<h1 className="title">Delete Account</h1>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label htmlFor="delete-account-type-out" className="form__label">
						Enter <span className="form__label__captial-delete">DELETE</span>{" "}
						below.
					</label>
					<input
						type="text"
						name="deleteTypedOut"
						onChange={(e) => onChange(e)}
						value={accountInfo.deleteTypedOut}
						id="delete-account-type-out"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.deleteTypedOut}
					</span>
					<label htmlFor="delete-account-password" className="form__label">Current Password: </label>
					<input
						type="password"
						name="currentPassword"
						onChange={(e) => onChange(e)}
						value={accountInfo.currentPassword}
						id="delete-account-password"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.currentPassword}
					</span>
					<button type="submit" className="form__submit">
						Delete
					</button>
					<span className="form__errors">
						{reduxState.inputErrors.validation}
						{reduxState.inputErrors.authorization}
						{reduxState.inputErrors.server}
					</span>
				</form>
				<div className="modal-links-container">
					<span onClick={backToEditInfo} className="modal-link">
						Back
					</span>
				</div>
			</div>
		</div>
	);
}
