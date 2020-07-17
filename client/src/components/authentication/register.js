import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { registerAccount } from "../../actions/accountActions";

import "../../SCSS/registerLogin.scss";

export default function Register() {
	const [accountInfo, setAccountInfo] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		password2: "",
	});

	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(registerAccount(accountInfo));
	};

	return (
		<div>
			<form className="registerLoginForm" noValidate onSubmit={handleSubmit}>
				<label className="titleLabel">Register</label>
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
				<span className="redErrorText">{reduxState.inputErrors.email}</span>
				<input
					type="email"
					name="email"
					onChange={(e) => onChange(e)}
					value={accountInfo.email}
					placeholder="Email"
					//error={reduxState.inputErrors.email}
					id="emailInput"
				/>
				<span className="redErrorText">{reduxState.inputErrors.password}</span>
				<input
					type="password"
					name="password"
					onChange={(e) => onChange(e)}
					value={accountInfo.password}
					placeholder="Password"
					//error={reduxState.inputErrors.password}
					id="passwordInput"
				/>
				<span className="redErrorText">{reduxState.inputErrors.password2}</span>
				<input
					type="password"
					name="password2"
					onChange={(e) => onChange(e)}
					value={accountInfo.password2}
					placeholder="Confirm password"
					//error={reduxState.inputErrors.password2}
					id="password2Input"
				/>
				<button type="submit">Register Account</button>
				<p className="message">
					<strong>Already a Member?</strong>
					<Link to="/login">Login</Link>
				</p>
			</form>
		</div>
	);
}
