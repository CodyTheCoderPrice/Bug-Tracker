import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { loginThenRetrieveAccount } from "../../actions/accountActions";

import "../../SCSS/registerLogin.scss";

export default function Login() {
	const [accountInfo, setAccountInfo] = useState({
		email: "",
		password: "",
	});

	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginThenRetrieveAccount(accountInfo));
	};

	return (
		<div>
			<form className="registerLoginForm" noValidate onSubmit={handleSubmit}>
				<label className="titleLabel">Login</label>
				<br />
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
				<span className="redErrorText">
					{reduxState.inputErrors.validation}
					{reduxState.inputErrors.server}
				</span>
				<button type="submit">Login</button>
				<p className="message">
					<strong>Not a Member </strong>
					<Link to="/register">Register</Link>
					<Link to="/">Home</Link>
				</p>
			</form>
		</div>
	);
}
