import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	updateAccountInfo,
	setWhichAccountComponentsDisplay,
	clearBackendErrors,
} from "../../../actions";

import {
	getCharCountLimitReachedTextColorClassNameForLightOrDarkMode,
	getBaseFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getBackendErrorsTextColorClassNameForLightOrDarkMode,
	getformSubmitButtonColorClassNameForTheme,
	getTextColorClassNameForThemeWithLightOrDarkMode,
} from "../../../utils";

export default function AccountModalChangeInfo() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		first_name: reduxState[ACCOUNT_CONTAINER].accountInfo.first_name,
		last_name: reduxState[ACCOUNT_CONTAINER].accountInfo.last_name,
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

	const openEditEmailModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalChangeEmail: true,
			})
		);
	};

	const openEditPasswordModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalChangePassword: true,
			})
		);
	};

	const openDeleteAccountModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalDeleteAccount: true,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountInfo(accountInfo));
	};

	return (
		<div>
			<h1 className="title">Edit Personal Info</h1>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<label htmlFor="edit-account-info-first-name" className="form__label">
					First Name:{" "}
				</label>
				{accountInfo.first_name.length >
				reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit ? (
					<span
						className={
							"form__char-counter" +
							getCharCountLimitReachedTextColorClassNameForLightOrDarkMode(
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
					type="text"
					name="first_name"
					onChange={(e) => onChange(e)}
					value={accountInfo.first_name}
					id="edit-account-info-first-name"
					className={
						"form__input-text" +
						getBaseFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
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
							.validationAccountFirstName
					}
				</span>
				<label htmlFor="edit-account-info-last-name" className="form__label">
					Last Name:{" "}
				</label>
				{accountInfo.last_name.length >
				reduxState[GENERAL_CONTAINER].globalConstants.nameCharLimit ? (
					<span
						className={
							"form__char-counter" +
							getCharCountLimitReachedTextColorClassNameForLightOrDarkMode(
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
					onChange={(e) => onChange(e)}
					value={accountInfo.last_name}
					id="edit-account-info-last-name"
					className={
						"form__input-text" +
						getBaseFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
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
							.validationAccountLastName
					}
				</span>
				<button
					type="submit"
					className={
						"form__submit" +
						getformSubmitButtonColorClassNameForTheme(
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					Update
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
					{reduxState[GENERAL_CONTAINER].backendErrors.serverAccount}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
				</span>
			</form>
			<div className="modal-links-container">
				<span
					className={
						"modal-link modal-link--no-left-margin" +
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
					alt="Account modal link to switch to editing account email"
					onClick={openEditEmailModal}
				>
					Edit Email
				</span>
				<span className="link-spacer">|</span>
				<span
					className={
						"modal-link" +
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
					alt="Account modal link to switch to editing account password"
					onClick={openEditPasswordModal}
				>
					Edit Password
				</span>
				<span className="link-spacer">|</span>
				<span
					className={
						"modal-link modal-link--no-right-margin" +
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
					alt="Account modal link to switch to begin process to delete account"
					onClick={openDeleteAccountModal}
				>
					Delete Account
				</span>
			</div>
		</div>
	);
}
