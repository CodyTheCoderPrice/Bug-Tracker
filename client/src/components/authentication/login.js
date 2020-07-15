import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { loginAccount } from "../../actions/authActions";

import "../../SCSS/registerLogin.scss";

export default function Login() {
	const [accountInfo, setAccountInfo] = useState({
		email: "",
		password: "",
	});

	const inputErrors = useSelector((state) => state.inputErrors);
	const dispatch = useDispatch();

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginAccount(accountInfo));
	};

	return (
		<div className="constainerDiv">
			<form className="loginForm" noValidate onSubmit={handleSubmit}>
				<label id="titleLabel">Login</label>
				<br />
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
				<button type="submit">Login</button>
				<p className="message">
					<strong>Not a Member </strong>
					<Link to="/register">Register</Link>
				</p>
			</form>
		</div>
	);
}
