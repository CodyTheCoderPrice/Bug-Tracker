import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	loginAccount,
	clearInputErrors,
	setWhichAuthComponentsDisplay,
} from "../../actions";

import "../../SCSS/authentication/registerLogin.scss";

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

	const openRegister = () => {
		dispatch(setWhichAuthComponentsDisplay({ register: true }));
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
					<label htmlFor="login-email" className="form__label">Email</label>
					<input
						type="email"
						name="email"
						onChange={(e) => onChange(e)}
						value={accountInfo.email}
						id="login-email"
						className="form__text-input"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.email : ""}
					</span>
					<label htmlFor="login-password" className="form__label">Password</label>
					<input
						type="password"
						name="password"
						onChange={(e) => onChange(e)}
						value={accountInfo.password}
						id="login-password"
						className="form__text-input"
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
					<span>Not a Member? </span>
					<span className="footer__link" onClick={openRegister}>
						Register
					</span>
				</div>
			</div>
		</div>
	);
}
