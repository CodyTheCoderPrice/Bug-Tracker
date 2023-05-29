import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import {
	loginAccount,
	clearAllErrorMessages,
	setWhichGeneralComponentsDisplay,
} from "../../actions";
import { isEmpty, getErrorMessagesJSX } from "../../utils";

/**
 * React functional component used for logging into the app by entering an
 * email and password to an account. Invalid login data (e.g. incorrect
 * password) and/or server issues will display error messages to explain what
 * went wrong. Component includes a link to switch to the Register component.
 * Component also displays a background image that takes up the entire window.
 *
 * The flag for displaying this component is 'loginComponentShouldDisplay'
 * boolean in 'componentsDisplay' property in 'GENERAL_CONTAINER' of the redux
 * state. This component should only be used inside the App component, and is
 * not intended to be displayed while either the Register or Home components
 * are also displayed. Also this component should only be displayed if an
 * account is not logged into the app.
 *
 * @component
 */
export default function Login(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		return () => {
			// Clears current error messages when closing the component. Otherwise
			// error messages may presist and appear when component is re-openned.
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
		dispatch(
			setWhichGeneralComponentsDisplay({ registerComponentShouldDisplay: true })
		);
	};

	return (
		<div className="login-component js-login-component">
			<form className="modal__form" noValidate onSubmit={handleSubmit}>
				<h2 className="modal__form__title">Member Login</h2>
				<input
					autoFocus
					type="email"
					name="email"
					placeholder="Email"
					onChange={onChange}
					value={accountInfo.email}
					id="login-email"
					className={
						"modal__form__input-text" +
						(!isEmpty(
							reduxState[GENERAL_CONTAINER].errorMessages.validationAccountEmail
						) || !isEmpty(reduxState[GENERAL_CONTAINER].errorMessages.account)
							? " modal__form__input-text--error"
							: "")
					}
				/>
				{getErrorMessagesJSX(
					[
						reduxState[GENERAL_CONTAINER].errorMessages.validationAccountEmail,
						reduxState[GENERAL_CONTAINER].errorMessages.account,
					],
					"error-messages"
				)}
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={onChange}
					value={accountInfo.password}
					id="login-password"
					className={
						"modal__form__input-text" +
						(!isEmpty(
							reduxState[GENERAL_CONTAINER].errorMessages
								.validationAccountPassword
						)
							? " modal__form__input-text--error"
							: "")
					}
				/>
				{getErrorMessagesJSX(
					reduxState[GENERAL_CONTAINER].errorMessages.validationAccountPassword,
					"error-messages"
				)}
				<button type="submit" className="modal__form__submit">
					LOGIN
				</button>
				{getErrorMessagesJSX(
					[
						reduxState[GENERAL_CONTAINER].errorMessages.validationAccount,
						reduxState[GENERAL_CONTAINER].errorMessages.serverAccount,
						reduxState[GENERAL_CONTAINER].errorMessages.serverConnection,
						reduxState[GENERAL_CONTAINER].errorMessages.loginServerData,
					],
					"error-messages"
				)}
				<div className="modal__form__bottom-link-container">
					<span
						className="modal__form__bottom-link-container__link"
						onClick={openRegister}
					>
						Create account
					</span>
				</div>
			</form>
		</div>
	);
}
