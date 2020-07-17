import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateAccountInfo } from "../../../actions/accountActions";

//import "../../../SCSS/account.scss";

export default function EditAccountInfo() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		firstName: reduxState.account.firstName,
		lastName: reduxState.account.lastName,
	});

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountInfo(accountInfo));
	};

	return (
		<div>
			<form className="registerLoginForm" noValidate onSubmit={handleSubmit}>
				<button className="exitButton">X</button>
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
				<button type="submit">Update Account</button>
			</form>
		</div>
	);
}
