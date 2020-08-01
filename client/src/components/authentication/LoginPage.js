import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { loginAccount, clearInputErrors } from "../../actions";

import "../../SCSS/authentication/registerLoginPages.scss";

export default function LoginPage() {
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
		dispatch(loginAccount(accountInfo));
		setShouldShowAnyErrors(true);
	};

	return (
		<div className="register-login-components">
			<div className="background" />
			<div className="border-container">
				<h1 className="title">Login</h1>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label className="form__label">Email</label>
					<input
						type="email"
						name="email"
						onChange={(e) => onChange(e)}
						value={accountInfo.email}
						id="emailInput"
						className="form_text-input"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.email : ""}
					</span>
					<label className="form__label">Password</label>
					<input
						type="password"
						name="password"
						onChange={(e) => onChange(e)}
						value={accountInfo.password}
						id="passwordInput"
						className="form_text-input"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.password : ""}
					</span>
					<button type="submit" className="form__submit">
						LOGIN
					</button>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
					</span>
				</form>
				<div className="footer">
					<label>Not a Member? </label>
					<Link to="/register" className="footer__link">
						Register
					</Link>
					<Link to="/" className="footer__link">
						Home
					</Link>
				</div>
			</div>
		</div>
	);
}
