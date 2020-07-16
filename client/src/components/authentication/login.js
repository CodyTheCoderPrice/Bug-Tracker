import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { loginAccount, retrieveAccount } from "../../actions/accountActions";

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
		dispatch(loginAccount(accountInfo));
	};

	return (
		<div className="constainerDiv">
			<form className="loginForm" noValidate onSubmit={handleSubmit}>
				<label id="titleLabel">Login</label>
				<br />
				<span className="redErrorText">{reduxState.inputErrorsemail}</span>
				<input
					type="email"
					name="email"
					onChange={(e) => onChange(e)}
					value={accountInfo.email}
					placeholder="Email"
					//error={reduxState.inputErrorsemail}
					id="emailInput"
				/>
				<span className="redErrorText">{reduxState.inputErrorspassword}</span>
				<input
					type="password"
					name="password"
					onChange={(e) => onChange(e)}
					value={accountInfo.password}
					placeholder="Password"
					//error={reduxState.inputErrorspassword}
					id="passwordInput"
				/>
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
