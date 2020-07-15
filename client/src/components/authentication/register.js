import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { registerAccount } from "../../actions/authActions";

import "../../SCSS/registerLogin.scss";

export default function Register() {
	const [accountInfo, setAccountInfo] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		password2: "",
	});

	const inputErrors = useSelector((state) => state.inputErrors);
	const dispatch = useDispatch();

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(registerAccount(accountInfo));
	};

	return (
		<div className="constainerDiv">
			<form className="registerForm" noValidate onSubmit={handleSubmit}>
				<label id="titleLabel">Register</label>
				<br />
				<span className="redErrorText">{inputErrors.firstName}</span>
				<input
					type="text"
					name="firstName"
					onChange={(e) => onChange(e)}
					value={accountInfo.firstName}
					placeholder="First name"
					//error={inputErrors.firstName}
					id="firstNameInput"
				/>
				<span className="redErrorText">{inputErrors.lastName}</span>
				<input
					type="text"
					name="lastName"
					onChange={(e) => onChange(e)}
					value={accountInfo.lastName}
					placeholder="Last name"
					//error={inputErrors.lastName}
					id="lastNameInput"
				/>
				<span className="redErrorText">{inputErrors.email}</span>
				<input
					type="email"
					name="email"
					onChange={(e) => onChange(e)}
					value={accountInfo.email}
					placeholder="Email"
					//error={inputErrors.email}
					id="emailInput"
				/>
				<span className="redErrorText">{inputErrors.password}</span>
				<input
					type="password"
					name="password"
					onChange={(e) => onChange(e)}
					value={accountInfo.password}
					placeholder="Password"
					//error={inputErrors.password}
					id="passwordInput"
				/>
				<span className="redErrorText">{inputErrors.password2}</span>
				<input
					type="password"
					name="password2"
					onChange={(e) => onChange(e)}
					value={accountInfo.password2}
					placeholder="Confirm password"
					//error={inputErrors.password2}
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
