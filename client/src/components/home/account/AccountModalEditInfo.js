import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";
import {
	updateAccountInfo,
	setWhichAccountComponentsDisplay,
	clearAllErrorMessages,
} from "../../../actions";
import {
	getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode,
	getCommonFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonErrorMessagesElementTextColorClassNameForLightOrDarkMode,
	getErrorMessagesJSX,
	getCommonFormSubmitButtonElementBackgroundColorWithHoverAndFocusClassNameForTheme,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
} from "../../../utils";

/**
 * React functional component for updating the logged in account's personal
 * info (currently only first/last name) by entering a new first and last name.
 * Invalid name data (e.g. first name too long) and/or server issues will
 * display error messages to explain what went wrong. Component includes links
 * to navigate to the AccountModalEditEmail, AccountModalEditPassword, and
 * AccountModalDeleteAccount components.
 *
 * The flag for displaying this component is 'accountModalEditInfoComponentShouldDisplay'
 * boolean in 'componentsDisplay' Object in 'ACCOUNT_CONTAINER' of the redux
 * state. This component should be the child of the AccountModal component.
 * This component should not be displayed along side any sibling components
 * whose name also begins with AccountModal (e.g. AccountModalEditPassword).
 *
 * @component
 */
export default function AccountModalEditInfo() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		first_name: reduxState[ACCOUNT_CONTAINER].accountInfo.first_name,
		last_name: reduxState[ACCOUNT_CONTAINER].accountInfo.last_name,
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
	 * Opens AccountModalEditEmail component while closing all other account
	 * components (other than AccountModal as AccountModalEditEmail depends on
	 * it)
	 */
	const openOnlyEditEmailModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalEditEmailComponentShouldDisplay: true,
			})
		);
	};

	/**
	 * Opens AccountModalEditPassword component while closing all other account
	 * components (other than AccountModal as AccountModalEditPassword depends
	 * on it)
	 */
	const openOnlyEditPasswordModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalEditPasswordComponentShouldDisplay: true,
			})
		);
	};

	/**
	 * Opens AccountModalDeleteAccount component while closing all other
	 * account components (other than AccountModal as AccountModalDeleteAccount
	 * depends on it)
	 */
	const openOnlyDeleteAccountModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalDeleteAccountComponentShouldDisplay: true,
			})
		);
	};

	/**
	 * Function for onSubmit handler of form element. Calls updateAccountInfo
	 * action to attempt to update account's personal info (currently only
	 * first/last name) using accountInfo
	 *
	 * @param {Event} e - Event created by element's onSubmit handler
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountInfo(accountInfo));
	};

	return (
		<div>
			<h1 className="title">Edit Personal Info</h1>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<label
					htmlFor="edit-account-info-modal--first-name"
					className="form__label"
				>
					First Name:{" "}
				</label>
				{accountInfo.first_name.length >
				reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit ? (
					<span
						className={
							"form__char-counter" +
							getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
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
					id="edit-account-info-modal--first-name"
					className={
						"form__input-text" +
						getCommonFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				/>
				{getErrorMessagesJSX(
					reduxState[GENERAL_CONTAINER].errorMessages
						.validationAccountNewFirstName,
					"error-messages" +
						getCommonErrorMessagesElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
				)}
				<label
					htmlFor="edit-account-info-modal--last-name"
					className="form__label"
				>
					Last Name:{" "}
				</label>
				{accountInfo.last_name.length >
				reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit ? (
					<span
						className={
							"form__char-counter" +
							getCommonCharCountElementLimitReachedTextColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
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
					id="edit-account-info-modal--last-name"
					className={
						"form__input-text" +
						getCommonFormInputElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				/>
				{getErrorMessagesJSX(
					reduxState[GENERAL_CONTAINER].errorMessages
						.validationAccountNewLastName,
					"error-messages" +
						getCommonErrorMessagesElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
				)}
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
				{getErrorMessagesJSX(
					[
						reduxState[GENERAL_CONTAINER].errorMessages.validationAccount,
						reduxState[GENERAL_CONTAINER].errorMessages.serverAccount,
						reduxState[GENERAL_CONTAINER].errorMessages.serverConnection,
					],
					"error-messages" +
						getCommonErrorMessagesElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
				)}
			</form>
			<div className="modal-links-container">
				<span
					className={
						"modal-link modal-link--no-left-margin" +
						getCommonTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
					alt="Link to switch to editing account email"
					onClick={openOnlyEditEmailModal}
				>
					Edit Email
				</span>
				<span className="link-spacer">|</span>
				<span
					className={
						"modal-link" +
						getCommonTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
					alt="Link to switch to editing account password"
					onClick={openOnlyEditPasswordModal}
				>
					Edit Password
				</span>
				<span className="link-spacer">|</span>
				<span
					className={
						"modal-link modal-link--no-right-margin" +
						getCommonTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
					alt="Link to switch to begin process to delete account"
					onClick={openOnlyDeleteAccountModal}
				>
					Delete Account
				</span>
			</div>
		</div>
	);
}
