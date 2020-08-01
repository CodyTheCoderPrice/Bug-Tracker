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
		<div className="register-login-components">
			<div className="background" />
			<div className="border-container">
				<h1 className="title">Register</h1>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label className="form__label">First Name</label>
					<input
						type="text"
						name="firstName"
						onChange={(e) => onChange(e)}
						value={accountInfo.firstName}
						className="form_text-input"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.firstName : ""}
					</span>
					<label className="form__label">Last Name</label>
					<input
						type="text"
						name="lastName"
						onChange={(e) => onChange(e)}
						value={accountInfo.lastName}
						className="form_text-input"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.lastName : ""}
					</span>
					<label className="form__label">Email</label>
					<input
						type="email"
						name="email"
						onChange={(e) => onChange(e)}
						value={accountInfo.email}
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
						className="form_text-input"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.password : ""}
					</span>
					<label className="form__label">Confirm Password</label>
					<input
						type="password"
						name="password2"
						onChange={(e) => onChange(e)}
						value={accountInfo.password2}
						className="form_text-input"
					/>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.password2 : ""}
					</span>
					<button type="submit" className="form__submit">
						REGISTER
					</button>
					<span className="form__errors">
						{shouldShowAnyErrors ? reduxState.inputErrors.validation : ""}
						{shouldShowAnyErrors ? reduxState.inputErrors.server : ""}
					</span>
				</form>
				<div className="footer">
					<label>Already a Member?</label>
					<Link to="/login" className="footer__link">Login</Link>
				</div>
			</div>
		</div>
	);
}
