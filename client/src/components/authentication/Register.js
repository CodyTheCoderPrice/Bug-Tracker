import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	registerAccount,
	clearInputErrors,
	setWhichAuthComponentsDisplay,
} from "../../actions";

import "../../SCSS/authentication/registerLogin.scss";

export default function Register() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password2: "",
	});

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(registerAccount(accountInfo));
	};

	const openLogin = () => {
		dispatch(setWhichAuthComponentsDisplay({ login: true }));
	};

	return (
		<div className="register-login-components">
			<div className="background" />
			<div className="border-container">
				<h1 className="title">Register</h1>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label htmlFor="register-first-name" className="form__label">First Name</label>
					<input
						type="text"
						name="first_name"
						onChange={(e) => onChange(e)}
						value={accountInfo.first_name}
						id="register-first-name"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.first_name}
					</span>
					<label htmlFor="register-last-name" className="form__label">Last Name</label>
					<input
						type="text"
						name="last_name"
						onChange={(e) => onChange(e)}
						value={accountInfo.last_name}
						id="register-last-name"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.last_name}
					</span>
					<label htmlFor="register-email" className="form__label">Email</label>
					<input
						type="email"
						name="email"
						onChange={(e) => onChange(e)}
						value={accountInfo.email}
						id="register-email"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.email}
					</span>
					<label htmlFor="register-password" className="form__label">Password</label>
					<input
						type="password"
						name="password"
						onChange={(e) => onChange(e)}
						value={accountInfo.password}
						id="register-password"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.password}
					</span>
					<label htmlFor="register-password2" className="form__label">Confirm Password</label>
					<input
						type="password"
						name="password2"
						onChange={(e) => onChange(e)}
						value={accountInfo.password2}
						id="register-password2"
						className="form__text-input"
					/>
					<span className="form__errors">
						{reduxState.inputErrors.password2}
					</span>
					<button type="submit" className="form__submit">
						REGISTER
					</button>
					<span className="form__errors">
						{reduxState.inputErrors.validation}
						{reduxState.inputErrors.server}
					</span>
				</form>
				<div className="footer">
					<span>Already a Member?</span>
					<span className="footer__link" onClick={openLogin} >
						Login
					</span>
				</div>
			</div>
		</div>
	);
}
