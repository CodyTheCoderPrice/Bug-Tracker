import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";

import {
	loginAccount,
	clearBackendErrors,
	setWhichGeneralComponentsDisplay,
} from "../../actions";

export default function Login() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		email: "",
		password: "",
	});

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginAccount(accountInfo));
	};

	const openRegister = () => {
		dispatch(setWhichGeneralComponentsDisplay({ register: true }));
	};

	return (
		<div className="register-login-components">
			<div className="background" />
			<div className="border-container">
				<h1 className="title">Login</h1>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label htmlFor="login-email" className="form__label">
						Email
					</label>
					<input
						type="email"
						name="email"
						onChange={(e) => onChange(e)}
						value={accountInfo.email}
						id="login-email"
						className="form__text-input"
					/>
					<span className="backend-errors">
						{reduxState[GENERAL_CONTAINER].backendErrors.validationAccountEmail}
					</span>
					<label htmlFor="login-password" className="form__label">
						Password
					</label>
					<input
						type="password"
						name="password"
						onChange={(e) => onChange(e)}
						value={accountInfo.password}
						id="login-password"
						className="form__text-input"
					/>
					<span className="backend-errors">
						{reduxState[GENERAL_CONTAINER].backendErrors.validationAccountPassword}
					</span>
					<button type="submit" className="form__submit">
						LOGIN
					</button>
					<span className="backend-errors">
						{reduxState[GENERAL_CONTAINER].backendErrors.validationAccount}
						{reduxState[GENERAL_CONTAINER].backendErrors.serverAccount}
						{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
					</span>
				</form>
				<div className="bottom-question">
					<span>Not a Member? </span>
					<span className="bottom-question__link" onClick={openRegister}>
						Register
					</span>
				</div>
			</div>
		</div>
	);
}
