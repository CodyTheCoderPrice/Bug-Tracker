import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateAccountPassword,
	setWhichAccountComponentsDisplay,
	clearInputErrors,
} from "../../../actions";

import "../../../SCSS/account/accountModals.scss";

export default function EditPasswordModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		newPassword: "",
		newPassword2: "",
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
				editInfoModal: true,
			})
		);
	};

	const closeAccountComponents = () => {
		dispatch(setWhichAccountComponentsDisplay({}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountPassword(accountInfo));
	};

	return (
		<div className="edit-account-modal-components">
			<div className="edit-account-modal">
				<div className="back-button" onClick={backToEditInfo}>
					<i className="fa fa-arrow-left" aria-hidden="true"></i>
				</div>
				<div className="exit-button" onClick={closeAccountComponents}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<h1 className="title">Edit Password</h1>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label
						htmlFor="edit-account-password-new-password"
						className="form__label"
					>
						New Password:{" "}
					</label>
					<input
						type="password"
						name="newPassword"
						onChange={(e) => onChange(e)}
						value={accountInfo.newPassword}
						id="edit-account-password-new-password"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.newPassword}
					</span>
					<label
						htmlFor="edit-account-password-new-password2"
						className="form__label"
					>
						Confirm New Password:{" "}
					</label>
					<input
						type="password"
						name="newPassword2"
						onChange={(e) => onChange(e)}
						value={accountInfo.newPassword2}
						id="edit-account-password-new-password2"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.newPassword2}
					</span>
					<label
						htmlFor="edit-account-password-current-password"
						className="form__label"
					>
						Current Password:{" "}
					</label>
					<input
						type="password"
						name="currentPassword"
						onChange={(e) => onChange(e)}
						value={accountInfo.currentPassword}
						id="edit-account-password-current-password"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.currentPassword}
					</span>
					<button type="submit" className="form__submit">
						Update
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
