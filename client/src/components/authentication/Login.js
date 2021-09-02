import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import {
	loginAccount,
	clearBackendErrors,
	setWhichGeneralComponentsDisplay,
} from "../../actions";

/**
 * React functional component used for logging into the app by entering an 
 * email and password to an account. Invalid login data (e.g. incorrect 
 * password) and/or server issues will display error messages to explain what
 * went wrong. Component includes a link to switch to the Register component.
 * Component also displays a background image that takes up the entire window.
 * 
 * The flag for displaying this component is 'login' property of 
 * 'componentsDisplay' property in 'GENERAL_CONTAINER' of the redux state. This 
 * component should only be used inside the App component, and is not intended
 * to be displayed while either the Register or Home components are also 
 * displayed. This component should only be displayed if an account is not 
 * logged in.
 * 
 * @component
 */
export default function Login() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		email: "",
		password: "",
	});

	// Clears current backend errors when closing the component. Otherwise the
	// ...backend errors may presist and appear when component is re-openned.
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	/**
	 * Function for onChange handler of input elements. Updates accountInfo's
	 * property (that of input element's name attribute) to have the value 
	 * that's been entered into the input element.
	 * 
	 * @param {Event} e - Event created by element's onChange handler
	 */
	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	/**
	 * Function for onSubmit handler of form element. Calls loginAccount action
	 * to attempt account login using accountInfo
	 * 
	 * @param {Event} e - Event created by element's onSubmit handler
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginAccount(accountInfo));
	};

	/**
	 * Switches to the Register component
	 */
	const openRegister = () => {
		dispatch(setWhichGeneralComponentsDisplay({ register: true }));
	};

	return (
		<div className="register-login-components">
			{/*Same background image as Register component*/}
			<div className="background" />
			<div className="border-container">
				<h1 className="title">Login</h1>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<label htmlFor="login-email" className="form__label">
						Email
					</label>
					<input
						autoFocus
						type="email"
						name="email"
						onChange={onChange}
						value={accountInfo.email}
						id="login-email"
						className="form__input-text"
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
						onChange={onChange}
						value={accountInfo.password}
						id="login-password"
						className="form__input-text"
					/>
					<span className="backend-errors">
						{
							reduxState[GENERAL_CONTAINER].backendErrors
								.validationAccountPassword
						}
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
