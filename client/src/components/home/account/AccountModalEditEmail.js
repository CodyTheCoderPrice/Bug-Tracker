import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";
import {
	updateAccountEmail,
	clearBackendErrors,
} from "../../../actions";
import {
	getCommonFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode,
	getCommonFormSubmitButtonElementBackgroundColorWithHoverAndFocusClassNameForTheme,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	setTrueForOnlyAccountModalEditInfo,
} from "../../../utils";

/**
 * React functional component for updating the logged in account's email by 
 * entering a new email and the account's password. Invalid update data (e.g.
 * incorrect password) and/or server issues will display error messages to 
 * explain what went wrong. Component includes link to return back to 
 * AccountModalEditInfo component (as user would have used that component to
 * navigate to this one).
 *
 * The flag for displaying this component is 'accountModalEditEmail' property 
 * of 'componentsDisplay' property in 'ACCOUNT_CONTAINER' of the redux state. This
 * component should be the child of the AccountModal component. This component 
 * should not be displayed along side any sibling components whose name also 
 * begins with AccountModal (e.g. AccountModalEditInfo).
 *
 * @component
 */
export default function AccountModalEditEmail() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		email: reduxState[ACCOUNT_CONTAINER].accountInfo.email,
		currentPassword: "",
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
	 * Function for onSubmit handler of form element. Calls updateAccountEmail
	 * action to attempt to update account's email using accountInfo
	 *
	 * @param {Event} e - Event created by element's onSubmit handler
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountEmail(accountInfo));
	};

	return (
		<div>
			<h1 className="title">Edit Email</h1>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<label htmlFor="edit-account-email-modal--email" className="form__label">
					Email:{" "}
				</label>
				<input
					autoFocus
					type="email"
					name="email"
					onChange={onChange}
					value={accountInfo.email}
					id="edit-account-email-modal--email"
					className={
						"form__input-text" +
						getCommonFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				/>
				<span
					className={
						"backend-errors" +
						getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					{reduxState[GENERAL_CONTAINER].backendErrors.validationAccountNewEmail}
				</span>
				<label htmlFor="edit-account-email-modal--password" className="form__label">
					Current Password:{" "}
				</label>
				<input
					type="password"
					name="currentPassword"
					onChange={onChange}
					value={accountInfo.currentPassword}
					id="edit-account-email-modal--password"
					className={
						"form__input-text" +
						getCommonFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				/>
				<span
					className={
						"backend-errors" +
						getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					{reduxState[GENERAL_CONTAINER].backendErrors.currentPassword}
				</span>
				<button
					type="submit"
					className={
						"form__submit" +
						getCommonFormSubmitButtonElementBackgroundColorWithHoverAndFocusClassNameForTheme(
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					Update
				</button>
				<span
					className={
						"backend-errors" +
						getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					{reduxState[GENERAL_CONTAINER].backendErrors.validationAccount}
					{reduxState[GENERAL_CONTAINER].backendErrors.authorization}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverAccount}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
				</span>
			</form>
			<div className="modal-links-container">
				<span
					className={
						"modal-link" +
						getCommonTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
					alt="Link to return to editing account info"
					onClick={() => setTrueForOnlyAccountModalEditInfo(dispatch)}
				>
					Back
				</span>
			</div>
		</div>
	);
}
