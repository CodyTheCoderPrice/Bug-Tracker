import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	updateAccountPassword,
	setWhichAccountComponentsDisplay,
	clearBackendErrors,
} from "../../../actions";

import {
	getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode,
	getCharCountLimitReachedTextColorClassNameForLightOrDarkMode,
	getBaseFormInputBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getBackendErrorsTextColorClassNameForLightOrDarkMode,
	getformSubmitButtonColorClassNameForTheme,
	getTextColorClassNameForThemeWithLightOrDarkMode,
} from "../../../utils";

export default function AccountModalChangePassword() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		newPassword: "",
		currentPassword: "",
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

	const backToEditInfo = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalChangeInfo: true,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateAccountPassword(accountInfo));
	};

	return (
		<div>
			<div
				className={
					"back-button" +
					getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
				onClick={backToEditInfo}
			>
				<i
					className="fa fa-arrow-left"
					aria-hidden="true"
					alt="Icon of an arrow pointing to the left"
				/>
			</div>
			<h1 className="title">Edit Password</h1>
			<form className="form" noValidate onSubmit={handleSubmit}>
				<label
					htmlFor="edit-account-password-new-password"
					className="form__label"
				>
					New Password:{" "}
				</label>
				{accountInfo.newPassword.length >
				reduxState[GENERAL_CONTAINER].globalConstants.passwordCharLimit ? (
					<span
						className={
							"form__char-counter" +
							getCharCountLimitReachedTextColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					>
						{accountInfo.newPassword.length +
							"/" +
							reduxState[GENERAL_CONTAINER].globalConstants.passwordCharLimit}
					</span>
				) : null}
				<input
					type="password"
					name="newPassword"
					onChange={(e) => onChange(e)}
					value={accountInfo.newPassword}
					id="edit-account-password-new-password"
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
							.validationAccountNewPassword
					}
				</span>
				<label
					htmlFor="edit-account-password-current-password"
					className="form__label"
				>
					Current Password:{" "}
				</label>
				{accountInfo.currentPassword.length >
				reduxState[GENERAL_CONTAINER].globalConstants.passwordCharLimit ? (
					<span
						className={
							"form__char-counter" +
							getCharCountLimitReachedTextColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					>
						{accountInfo.currentPassword.length +
							"/" +
							reduxState[GENERAL_CONTAINER].globalConstants.passwordCharLimit}
					</span>
				) : null}
				<input
					type="password"
					name="currentPassword"
					onChange={(e) => onChange(e)}
					value={accountInfo.currentPassword}
					id="edit-account-password-current-password"
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
					{reduxState[GENERAL_CONTAINER].backendErrors.currentPassword}
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
					{reduxState[GENERAL_CONTAINER].backendErrors.authorization}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverAccount}
					{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
				</span>
			</form>
			<div className="modal-links-container">
				<span
					onClick={backToEditInfo}
					className={
						"modal-link" +
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					Back
				</span>
			</div>
		</div>
	);
}
