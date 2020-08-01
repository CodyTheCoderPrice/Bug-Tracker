import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { registerAccount, clearInputErrors } from "../../actions";

import "../../SCSS/authentication/registerLoginPages.scss";

export default function RegisterPage() {
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
		<div className="register-login-background">
			<div className="register-login-container">
				<label className="title">Register</label>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label className="form__input-label">First Name</label>
					<input
						className="form__input"
						type="text"
						name="firstName"
						onChange={(e) => onChange(e)}
						value={accountInfo.firstName}
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.firstName : ""}
					</span>
					<label className="form__input-label">Last Name</label>
					<input
						className="form__input"
						type="text"
						name="lastName"
						onChange={(e) => onChange(e)}
						value={accountInfo.lastName}
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.lastName : ""}
					</span>
					<label className="form__input-label">Email</label>
					<input
						className="form__input"
						type="email"
						name="email"
						onChange={(e) => onChange(e)}
						value={accountInfo.email}
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
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.password : ""}
					</span>
					<label className="form__input-label">Confirm Password</label>
					<input
						className="form__input"
						type="password"
						name="password2"
						onChange={(e) => onChange(e)}
						value={accountInfo.password2}
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.password2 : ""}
					</span>
					<button className="form__submit" type="submit">
						REGISTER ACCOUNT
					</button>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
					</span>
				</form>
				<div className="footer">
					<label>Already a Member?</label>
					<Link className="footer__link" to="/login">Login</Link>
				</div>
			</div>
		</div>
	);
}
