import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";

import { setWhichAccountComponentsDisplay } from "../../../actions";

import {
	getAccountSidebarAndModalBackgroundColorClassNameForLightOrDarkMode,
	getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode,
} from "../../../utils";

// Components
import AccountModalChangeInfo from "./AccountModalChangeInfo";
import AccountModalChangeEmail from "./AccountModalChangeEmail";
import AccountModalChangePassword from "./AccountModalChangePassword";
import AccountModalDeleteAccount from "./AccountModalDeleteAccount";
import AccountModalChangeSettings from "./AccountModalChangeSettings";

export default function AccountModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const backToEditInfo = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalChangeInfo: true,
			})
		);
	};

	const backToAccountSidebar = () => {
		dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
	};

	return (
		<div className="edit-account-modal-component">
			<div
				className={
					"edit-account-modal" +
					getAccountSidebarAndModalBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangeEmail === true ||
				reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangePassword === true ||
				reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalDeleteAccount === true ? (
					<div
						className={
							"back-button" +
							getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						alt="Button to return to editing account info"
						onClick={backToEditInfo}
					>
						<i
							className="fa fa-arrow-left"
							aria-hidden="true"
							alt="Icon of an arrow pointing to the left"
						/>
					</div>
				) : null}
				<div
					className={
						"exit-button" +
						getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
					alt="Button to close the account modal"
					onClick={backToAccountSidebar}
				>
					<i className="fa fa-times" aria-hidden="true" alt="icon of an X"></i>
				</div>
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangeInfo ? (
					<AccountModalChangeInfo />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangeEmail ? (
					<AccountModalChangeEmail />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangePassword ? (
					<AccountModalChangePassword />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalDeleteAccount ? (
					<AccountModalDeleteAccount />
				) : null}
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountModalChangeSettings ? (
					<AccountModalChangeSettings />
				) : null}
			</div>
		</div>
	);
}
