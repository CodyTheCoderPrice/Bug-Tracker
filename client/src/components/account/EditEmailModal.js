import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	updateAccountEmail,
	setAccountModalComponents,
	clearInputErrors,
} from "../../actions";

import EditInfoModal from "./EditInfoModal";

import "../../SCSS/accountModals.scss";

export default function EditEmailModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		email: reduxState.account.email,
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
		dispatch(updateAccountEmail(accountInfo));
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
					<label className="titleLabel">Edit Email</label>
					<br />
					<span className="redErrorText">
						{shouldShowAnyErrors ? reduxState.inputErrors.email : ""}
					</span>
					<input
						type="email"
						name="email"
						onChange={(e) => onChange(e)}
						value={accountInfo.email}
						placeholder="Email"
						id="emailInput"
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
