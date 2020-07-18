import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateAccountInfo, retrieveAccount } from "../../../actions/accountActions";
import { setModalComponent } from "../../../actions/modalActions.js";

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

	const closEditInfoPopup = () => {
		dispatch(setModalComponent({ editInfoComponent: null }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountInfo(accountInfo));
		dispatch(retrieveAccount());
	};

	return (
		<div className="containerDiv">
			<button className="exitButton" onClick={closEditInfoPopup}>
				X
			</button>
			<form className="editInfoForm" noValidate onSubmit={handleSubmit}>
				<label className="titleLabel">Edit Account</label>
				<br />
				<span className="redErrorText">{reduxState.inputErrors.firstName}</span>
				<input
					type="text"
					name="firstName"
					onChange={(e) => onChange(e)}
					value={accountInfo.firstName}
					placeholder="First name"
					//error={reduxState.inputErrors.firstName}
					id="firstNameInput"
				/>
				<span className="redErrorText">{reduxState.inputErrors.lastName}</span>
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
				<button type="submit">Update Account</button>
			</form>
		</div>
	);
}
