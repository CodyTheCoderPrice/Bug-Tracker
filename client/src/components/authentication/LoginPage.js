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
		<div className="register-login-background">
			<div className="register-login-container">
				<label className="title">Login</label>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label className="form__input-label">Email</label>
					<input
						className="form__input"
						type="email"
						name="email"
						onChange={(e) => onChange(e)}
						value={accountInfo.email}
						id="emailInput"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.email : ""}
					</span>
					<label className="form__input-label">Password</label>
					<input
						className="form__input"
						type="password"
						name="password"
						onChange={(e) => onChange(e)}
						value={accountInfo.password}
						id="passwordInput"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.password : ""}
					</span>
					<button className="form__submit" type="submit">
						LOGIN
					</button>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
					</span>
				</form>
				<div className="footer">
					<label>Not a Member? </label>
					<Link className="footer__link" to="/register">
						Register
					</Link>
					<Link className="footer__link" to="/">
						Home
					</Link>
				</div>
			</div>
		</div>
	);
}
