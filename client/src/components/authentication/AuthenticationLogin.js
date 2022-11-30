import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import { GENERAL_CONTAINER } from "../../actions/constants/containerNames";
import {
	loginAccount,
	clearBackendErrors,
	setWhichGeneralComponentsDisplay,
} from "../../actions";
import {
	getElementSize,
	getWindowSize,
	isEmpty,
	getBackendErrorJSX,
} from "../../utils";
import bugTrackerLogo from "../../images/bug-tracker-logo.svg";

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
export default function Login() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		email: "",
		password: "",
	});

	const [windowWidth, setWindowWidth] = useState();
	const [
		loginComponentBreakingPointWidth,
		setLoginComponentBreakingPointWidth,
	] = useState();
	useEffect(() => {
		setLoginComponentBreakingPointWidth(
			getElementSize(document.getElementsByClassName("js-login-component")[0])
				.width
		);

		// Initializes windowWidth
		windowSizeHandler();

		window.addEventListener("resize", windowSizeHandler);

		return () => {
			window.removeEventListener("resize", windowSizeHandler);

			// Clears current backend errors when closing the component. Otherwise
			// backend errors may presist and appear when component is re-openned.
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	// Declared as an object outside the eventListener so removal works on cleanup
	function windowSizeHandler() {
		setWindowWidth(getWindowSize().width);
	};


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
		<div
			className={
				"login-component js-login-component" +
				(windowWidth <= loginComponentBreakingPointWidth
					? " login-component--condensed"
					: "")
			}
		>
			<div className="login-component__intro-container">
				<img
					className="login-component__intro-container__logo"
					src={bugTrackerLogo}
					alt="LOGO: Bug Tracker created by Cody Price"
				/>
				<span className="login-component__intro-container__description">
					Free online bug tracking system <br /> for your software project needs
				</span>
			</div>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<h2 className="form__title">Member Login</h2>
				<input
					autoFocus
					type="email"
					name="email"
					placeholder="Email"
					onChange={onChange}
					value={accountInfo.email}
					id="login-email"
					className={
						"form__input-text" +
						(!isEmpty(
							reduxState[GENERAL_CONTAINER].backendErrors.validationAccountEmail
						)
							? " form__input-text--error"
							: "")
					}
				/>
				{getBackendErrorJSX(
					reduxState[GENERAL_CONTAINER].backendErrors.validationAccountEmail,
					"backend-errors"
				)}
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={onChange}
					value={accountInfo.password}
					id="login-password"
					className={
						"form__input-text" +
						(!isEmpty(
							reduxState[GENERAL_CONTAINER].backendErrors
								.validationAccountPassword
						)
							? " form__input-text--error"
							: "")
					}
				/>
				{getBackendErrorJSX(
					reduxState[GENERAL_CONTAINER].backendErrors.validationAccountPassword,
					"backend-errors"
				)}
				<button type="submit" className="form__submit">
					LOGIN
				</button>
				<span className="backend-errors">
					{reduxState[GENERAL_CONTAINER].backendErrors.validationAccount}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverAccount}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
				</span>
				<div className="form__bottom-link-container">
					<span
						className="form__bottom-link-container__link"
						onClick={openRegister}
					>
						Create account
					</span>
				</div>
			</form>
		</div>
	);
}
