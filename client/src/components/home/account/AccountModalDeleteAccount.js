import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";
import { deleteAccount, clearBackendErrors } from "../../../actions";
import {
	getAccountModalDeleteAccountComponentCapitalDeleteElementTextColorClassNameForLightOrDarkMode,
	getAccountModalDeleteAccountComponentFormInputElementBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getCommonBackendErrorsElementTextColorClassNameForLightOrDarkMode,
	getAccountModalDeleteAccountComponentFormSubmitElementBackgroundColorClassNameForLightOrDarkMode,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	setTrueForOnlyAccountModalEditInfo,
} from "../../../utils";

/**
 * React functional component for deleting the logged in account by entering
 * "DELETE" and account's password. Invalid deletion data (e.g. incorrect 
 * password) and/or server issues will display error messages to explain what
 * went wrong. Component includes link to return back to AccountModalEditInfo
 * component (as user would have used that component to navigate to this one).
 *
 * The flag for displaying this component is 'accountModalDeleteAccount' 
 * property of 'componentsDisplay' property in ACCOUNT_CONTAINER of the redux 
 * state. This component should be the child of the AccountModal component.
 * This component should not be displayed along side any sibling components 
 * whose name also begins with AccountModal (e.g. AccountModalEditInfo).
 *
 * @component
 */
export default function AccountModalDeleteAccount() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		capitalizedDeleteTypedOut: "",
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
	 * Function for onSubmit handler of form element. Calls deleteAccount 
	 * action to attempt account deletion using accountInfo
	 *
	 * @param {Event} e - Event created by element's onSubmit handler
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(deleteAccount(accountInfo));
	};

	return (
		<div>
			<h1 className="title">Delete Account</h1>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<label htmlFor="delete-account-type-out" className="form__label">
					Enter{" "}
					<span
						className={
							"form__label__captial-delete" +
							getAccountModalDeleteAccountComponentCapitalDeleteElementTextColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					>
						DELETE
					</span>{" "}
					below:
				</label>
				<input
					autoFocus
					type="text"
					name="capitalizedDeleteTypedOut"
					onChange={onChange}
					value={accountInfo.capitalizedDeleteTypedOut}
					id="delete-account-type-out"
					className={
						"form__input-text" +
						getAccountModalDeleteAccountComponentFormInputElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
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
					{
						reduxState[GENERAL_CONTAINER].backendErrors
							.validationAccountTypeOutCheck
					}
				</span>
				<label htmlFor="delete-account-password" className="form__label">
					Current Password:{" "}
				</label>
				<input
					type="password"
					name="currentPassword"
					onChange={onChange}
					value={accountInfo.currentPassword}
					id="delete-account-password"
					className={
						"form__input-text" +
						getAccountModalDeleteAccountComponentFormInputElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
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
						"form__submit form__submit--delete" +
						getAccountModalDeleteAccountComponentFormSubmitElementBackgroundColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					Delete
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
