import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { registerAccount, clearInputErrors  } from "../../actions";

import "../../SCSS/registerLogin.scss";

export default function Register() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		password2: "",
	});

	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// clears any prior input errors
		dispatch(clearInputErrors());
		dispatch(registerAccount(accountInfo));
		setShouldShowAnyErrors(true);
	};

	return (
		<div className="registerLoginContainerDiv">
			<form className="registerLoginForm" noValidate onSubmit={handleSubmit}>
				<label className="titleLabel">Register</label>
				<br />
				<span className="redErrorText">{shouldShowAnyErrors ? reduxState.inputErrors.firstName : ""}</span>
				<input
					type="text"
					name="firstName"
					onChange={(e) => onChange(e)}
					value={accountInfo.firstName}
					placeholder="First name"
					id="firstNameInput"
					className="formInput"
				/>
				<span className="redErrorText">{shouldShowAnyErrors ? reduxState.inputErrors.lastName : ""}</span>
				<input
					type="text"
					name="lastName"
					onChange={(e) => onChange(e)}
					value={accountInfo.lastName}
					placeholder="Last name"
					id="lastNameInput"
					className="formInput"
				/>
				<span className="redErrorText">{shouldShowAnyErrors ? reduxState.inputErrors.email : ""}</span>
				<input
					type="email"
					name="email"
					onChange={(e) => onChange(e)}
					value={accountInfo.email}
					placeholder="Email"
					id="emailInput"
					className="formInput"
				/>
				<span className="redErrorText">{shouldShowAnyErrors ? reduxState.inputErrors.password : ""}</span>
				<input
					type="password"
					name="password"
					onChange={(e) => onChange(e)}
					value={accountInfo.password}
					placeholder="Password"
					id="passwordInput"
					className="formInput"
				/>
				<span className="redErrorText">{shouldShowAnyErrors ? reduxState.inputErrors.password2 : ""}</span>
				<input
					type="password"
					name="password2"
					onChange={(e) => onChange(e)}
					value={accountInfo.password2}
					placeholder="Confirm password"
					id="password2Input"
					className="formInput"
				/>
				<span className="redErrorText">
					{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
					{shouldShowAnyErrors ? reduxState.inputErrors.account : ""}
					{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
				</span>
				<button type="submit" className="submitButton">Register Account</button>
				<div className="linksDiv">
					<strong>Already a Member?</strong>
					<Link to="/login">Login</Link>
				</div>
			</form>
		</div>
	);
}
