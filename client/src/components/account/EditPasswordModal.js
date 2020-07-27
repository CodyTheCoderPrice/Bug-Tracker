import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateAccountPassword,
	setAccountModalComponents,
	clearInputErrors,
} from "../../actions";

import EditInfoModal from "./EditInfoModal";

import "../../SCSS/accountModals.scss";

export default function EditPasswordModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		newPassword: "",
		newPassword2: "",
		currentPassword: "",
	});

	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const backToEditInfo = () => {
		dispatch(
			setAccountModalComponents({
				editInfoModal: <EditInfoModal />,
			})
		);
	};

	const closeModals = () => {
		dispatch(setAccountModalComponents({}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// clears any prior input errors
		dispatch(clearInputErrors());
		dispatch(updateAccountPassword(accountInfo));
		setShouldShowAnyErrors(true);
	};

	return (
		<div>
			<div className="blurredBackgroundDiv" />
			<div className="editAccountContainerDiv">
				<button className="backButton" onClick={backToEditInfo}>
					➔
				</button>
				<button className="exitButton" onClick={closeModals}>
					X
				</button>
				<form className="editAccountForm" noValidate onSubmit={handleSubmit}>
					<label className="titleLabel">Edit Password</label>
					<br />
					<span className="redErrorText">
						{shouldShowAnyErrors ? reduxState.inputErrors.newPassword : ""}
					</span>
					<input
						type="password"
						name="newPassword"
						onChange={(e) => onChange(e)}
						value={accountInfo.newPassword}
						placeholder="New Password"
						id="newPasswordInput"
						className="formInput"
					/>
					<span className="redErrorText">
						{shouldShowAnyErrors ? reduxState.inputErrors.newPassword2 : ""}
					</span>
					<input
						type="password"
						name="newPassword2"
						onChange={(e) => onChange(e)}
						value={accountInfo.newPassword2}
						placeholder="Confirm New Password"
						id="newPassword2Input"
						className="formInput"
					/>
					<span className="redErrorText">
						{shouldShowAnyErrors ? reduxState.inputErrors.currentPassword : ""}
					</span>
					<input
						type="password"
						name="currentPassword"
						onChange={(e) => onChange(e)}
						value={accountInfo.currentPassword}
						placeholder="Current Password"
						id="currentPasswordInput"
						className="formInput"
					/>
					<span className="redErrorText">
						{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.authorization : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.account : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
					</span>
					<button type="submit" className="submitButton">
						Update
					</button>
				</form>
				<div className="openOtherModalsDiv">
					<label className="openModalLabel" onClick={backToEditInfo}>
						Back
					</label>
				</div>
			</div>
		</div>
	);
}
