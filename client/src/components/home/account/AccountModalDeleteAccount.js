import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	deleteAccount,
	clearBackendErrors,
} from "../../../actions";

import {
	getAccountModalDeleteAccountCapitalDeleteTextColorClassNameForLightOrDarkMode,
	getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getAccountModalDeleteAccountFormInputFocusBorderColorClassNameForLightOrDarkMode,
	getBackendErrorsTextColorClassNameForLightOrDarkMode,
	getAccountModalDeleteAccountFormSubmitButtonBackgroundColorClassNameForLightOrDarkMode,
	getTextColorClassNameForThemeWithLightOrDarkMode,
	openOnlyEditInfoModal,
} from "../../../utils";

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

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

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
							getAccountModalDeleteAccountCapitalDeleteTextColorClassNameForLightOrDarkMode(
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
						getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						getAccountModalDeleteAccountFormInputFocusBorderColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				/>
				<span
					className={
						"backend-errors" +
						getBackendErrorsTextColorClassNameForLightOrDarkMode(
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
						getBaseFormInputBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						getAccountModalDeleteAccountFormInputFocusBorderColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				/>
				<span
					className={
						"backend-errors" +
						getBackendErrorsTextColorClassNameForLightOrDarkMode(
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
						getAccountModalDeleteAccountFormSubmitButtonBackgroundColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
				>
					Delete
				</button>
				<span
					className={
						"backend-errors" +
						getBackendErrorsTextColorClassNameForLightOrDarkMode(
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
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
					alt="Link to return to editing account info"
					onClick={() => openOnlyEditInfoModal(dispatch)}
				>
					Back
				</span>
			</div>
		</div>
	);
}
