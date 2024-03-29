import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import {
	registerAccount,
	clearAllErrorMessages,
	setWhichGeneralComponentsDisplay,
} from "../../actions";
import {
	isEmpty,
	getErrorMessagesJSX,
} from "../../utils";

/**
 * React functional component used for regestering an account for the app by
 * entering a first name, last name, unique email, and password. Invalid
 * register data (e.g. password too short) and/or server issues will display
 * error messages to explain what went wrong. Component includes a link to
 * switch to the Login component. Component also displays a background image
 * that takes up the entire window.
 *
 * The flag for displaying this component is 'registerComponentShouldDisplay'
 * boolean in 'componentsDisplay' property in 'GENERAL_CONTAINER' of the redux
 * state. This component should only be used inside the App component, and is
 * not intended to be displayed while either the Login or Home components are
 * also displayed. Also this component should only be displayed if an account
 * is not logged into the app.
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

	// Clears current error messages when closing the component. Otherwise the
	// ...error messages may presist and appear when component is re-openned.
	useEffect(() => {
		return () => {
			dispatch(clearAllErrorMessages());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		dispatch(
			setWhichGeneralComponentsDisplay({ loginComponentShouldDisplay: true })
		);
	};

	return (
		<div className="register-component">
			<form className="modal__form" noValidate onSubmit={handleSubmit}>
				<h2 className="modal__form__title">Register</h2>
				<div className="modal__form__pair-container">
					<div className="modal__form__pair-container__single-container">
						<input
							autoFocus
							type="text"
							name="first_name"
							placeholder="First Name"
							onChange={onChange}
							value={accountInfo.first_name}
							id="register-first-name"
							className={
								"modal__form__input-text" +
								(!isEmpty(
									reduxState[GENERAL_CONTAINER].errorMessages
										.validationAccountFirstName
								)
									? " modal__form__input-text--error-border"
									: "")
							}
						/>
						{getErrorMessagesJSX(
							reduxState[GENERAL_CONTAINER].errorMessages
								.validationAccountFirstName,
							"error-messages"
						)}
					</div>
					<div className="modal__form__pair-container__single-container modal__form__pair-container__single-container--right">
						<input
							type="text"
							name="last_name"
							placeholder="Last Name"
							onChange={onChange}
							value={accountInfo.last_name}
							id="register-last-name"
							className={
								"modal__form__input-text" +
								(!isEmpty(
									reduxState[GENERAL_CONTAINER].errorMessages
										.validationAccountLastName
								)
									? " modal__form__input-text--error-border"
									: "")
							}
						/>
						{getErrorMessagesJSX(
							reduxState[GENERAL_CONTAINER].errorMessages
								.validationAccountLastName,
							"error-messages"
						)}
					</div>
				</div>
				<input
					type="email"
					name="email"
					placeholder="Email"
					onChange={onChange}
					value={accountInfo.email}
					id="register-email"
					className={
						"modal__form__input-text" +
						(!isEmpty(
							reduxState[GENERAL_CONTAINER].errorMessages.validationAccountEmail
						)
							? " modal__form__input-text--error-border"
							: "")
					}
				/>
				{getErrorMessagesJSX(
					reduxState[GENERAL_CONTAINER].errorMessages.validationAccountEmail,
					"error-messages"
				)}
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={onChange}
					value={accountInfo.password}
					id="register-password"
					className={
						"modal__form__input-text" +
						(!isEmpty(
							reduxState[GENERAL_CONTAINER].errorMessages
								.validationAccountPassword
						)
							? " modal__form__input-text--error-border"
							: "")
					}
				/>
				{getErrorMessagesJSX(
					reduxState[GENERAL_CONTAINER].errorMessages.validationAccountPassword,
					"error-messages"
				)}
				<button type="submit" className="modal__form__submit">
					REGISTER
				</button>
				{getErrorMessagesJSX(
					[
						reduxState[GENERAL_CONTAINER].errorMessages.validationAccount,
						reduxState[GENERAL_CONTAINER].errorMessages.serverAccount,
						reduxState[GENERAL_CONTAINER].errorMessages.serverConnection,
					],
					"error-messages"
				)}
				<div className="modal__form__bottom-link-container">
					<span>Already a Member?</span>
					<span
						className="modal__form__bottom-link-container__link"
						onClick={openLogin}
					>
						Login
					</span>
				</div>
			</form>
		</div>
	);
}
