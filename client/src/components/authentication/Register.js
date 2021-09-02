import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import {
	registerAccount,
	clearBackendErrors,
	setWhichGeneralComponentsDisplay,
} from "../../actions";
import { getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode } from "../../utils";

/**
 * React functional component used for regestering an account for the app by
 * entering a first name, last name, unique email, and password. Invalid 
 * register data (e.g. password too short) and/or server issues will display 
 * error messages to explain what went wrong. Component includes a link to 
 * switch to the Login component. Component also displays a background image 
 * that takes up the entire window.
 *
 * The flag for displaying this component is 'register' property of
 * 'componentsDisplay' property in 'GENERAL_CONTAINER' of the redux state. This
 * component should only be used inside the App component, and is not intended 
 * to be displayed while either the Login or Home components are also 
 * displayed. This component should only be displayed if an account is not 
 * logged in.
 * 
 * @component
 */
export default function Register() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		first_name: "",
		last_name: "",
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
	 * Function for onSubmit handler of form element. Calls registerAccount 
	 * action to attempt account register using accountInfo
	 * 
	 * @param {Event} e - Event created by element's onSubmit handler
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(registerAccount(accountInfo));
	};

	/**
	 * Switches to the Login component
	 */
	const openLogin = () => {
		dispatch(setWhichGeneralComponentsDisplay({ login: true }));
	};

	return (
		<div className="register-login-components">
			{/*Same background image as Login component*/}
			<div className="background" />
			<div className="border-container">
				<h1 className="title">Register</h1>
				<form className="form" noValidate onSubmit={handleSubmit}>
					<div className="form__pair-container">
						<div className="form__pair-container__single-container">
							<label htmlFor="register-first-name" className="form__label">
								First name
							</label>
							{accountInfo.first_name.length >
							reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit ? (
								<span
									className={
										"form__char-counter" +
										getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
											false
										)
									}
								>
									{accountInfo.first_name.length +
										"/" +
										reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit}
								</span>
							) : null}
							<input
								autoFocus
								type="text"
								name="first_name"
								onChange={onChange}
								value={accountInfo.first_name}
								id="register-first-name"
								className="form__input-text"
							/>
							<span className="backend-errors">
								{
									reduxState[GENERAL_CONTAINER].backendErrors
										.validationAccountFirstName
								}
							</span>
						</div>
						<div className="form__pair-container__single-container form__pair-container__single-container--right">
							<label htmlFor="register-last-name" className="form__label">
								Last name
							</label>
							{accountInfo.last_name.length >
							reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit ? (
								<span
									className={
										"form__char-counter" +
										getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
											false
										)
									}
								>
									{accountInfo.last_name.length +
										"/" +
										reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit}
								</span>
							) : null}
							<input
								type="text"
								name="last_name"
								onChange={onChange}
								value={accountInfo.last_name}
								id="register-last-name"
								className="form__input-text"
							/>
							<span className="backend-errors">
								{
									reduxState[GENERAL_CONTAINER].backendErrors
										.validationAccountLastName
								}
							</span>
						</div>
					</div>
					<label htmlFor="register-email" className="form__label">
						Email
					</label>
					<input
						type="email"
						name="email"
						onChange={onChange}
						value={accountInfo.email}
						id="register-email"
						className="form__input-text"
					/>
					<span className="backend-errors">
						{reduxState[GENERAL_CONTAINER].backendErrors.validationAccountEmail}
					</span>
					<label htmlFor="register-password" className="form__label">
						Password
					</label>
					{accountInfo.password.length >
					reduxState[GENERAL_CONTAINER].globalConstants.passwordCharLimit ? (
						<span
							className={
								"form__char-counter" +
								getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
									false
								)
							}
						>
							{accountInfo.password.length +
								"/" +
								reduxState[GENERAL_CONTAINER].globalConstants.passwordCharLimit}
						</span>
					) : null}
					<input
						type="password"
						name="password"
						onChange={onChange}
						value={accountInfo.password}
						id="register-password"
						className="form__input-text"
					/>
					<span className="backend-errors">
						{
							reduxState[GENERAL_CONTAINER].backendErrors
								.validationAccountPassword
						}
					</span>
					<button type="submit" className="form__submit">
						REGISTER
					</button>
					<span className="backend-errors">
						{reduxState[GENERAL_CONTAINER].backendErrors.validationAccount}
						{reduxState[GENERAL_CONTAINER].backendErrors.serverAccount}
						{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
					</span>
				</form>
				<div className="bottom-question">
					<span>Already a Member?</span>
					<span className="bottom-question__link" onClick={openLogin}>
						Login
					</span>
				</div>
			</div>
		</div>
	);
}
