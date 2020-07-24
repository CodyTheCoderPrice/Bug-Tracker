import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	deleteAccount,
	setModalComponent,
	clearInputErrors,
} from "../../../actions";

import EditInfoModal from "./EditInfoModal";

import "../../../SCSS/accountModals.scss";

export default function DeleteAccountModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		deleteTypedOut: "",
		currentPassword: "",
	});

	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const backToEditInfo = () => {
		dispatch(
			setModalComponent({
				editInfoModal: <EditInfoModal />,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
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

	const handleSubmit = (e) => {
		e.preventDefault();
		// clears any prior input errors
		dispatch(clearInputErrors());
		dispatch(deleteAccount(accountInfo));
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
					<label className="titleLabel">Delete Account</label>
					<br />
					<label className="warningMessage">
						If you are sure, type{" "}
						<label className="capitalDelete">DELETE</label> below.
					</label>{" "}
					<br />
					<span className="redErrorText">
						{shouldShowAnyErrors ? reduxState.inputErrors.deleteTypedOut : ""}
					</span>
					<input
						type="text"
						name="deleteTypedOut"
						onChange={(e) => onChange(e)}
						value={accountInfo.deleteTypedOut}
						placeholder="Type here..."
						id="deleteTypedOutInput"
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
						Delete
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
