import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { loginThenRetrieveAccount, clearInputErrors } from "../../actions";

import "../../SCSS/registerLogin.scss";

export default function Login() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		email: "",
		password: "",
	});

	const [shouldShowAnyErrors, setShouldShowAnyErrors] = useState(false);

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// clears any prior input errors
		dispatch(clearInputErrors());
		dispatch(loginThenRetrieveAccount(accountInfo));
		setShouldShowAnyErrors(true);
	};

	return (
		<div className="registerLoginContainerDiv">
			<form className="registerLoginForm" noValidate onSubmit={handleSubmit}>
				<label className="titleLabel">Login</label>
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
					{shouldShowAnyErrors ? reduxState.inputErrors.password : ""}
				</span>
				<input
					type="password"
					name="password"
					onChange={(e) => onChange(e)}
					value={accountInfo.password}
					placeholder="Password"
					id="passwordInput"
					className="formInput"
				/>
				<span className="redErrorText">
					{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
					{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
				</span>
				<button type="submit" className="submitButton">
					Login
				</button>
				<div className="linksDiv">
					<strong>Not a Member </strong>
					<Link to="/register">Register</Link>
					<Link to="/">Home</Link>
				</div>
			</form>
		</div>
	);
}
