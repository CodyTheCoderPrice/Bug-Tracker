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
				<div
					className={
						"exit-button" +
						getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
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
