import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";

import {
	clearBackendErrors,
	logoutAccount,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import {
	getAccountSidebarAndModalBackgroundColorClassNameForLightOrDarkMode,
	getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode,
	formatDateMMddYYYY,
	getTextColorClassNameForThemeWithLightOrDarkMode,
	getAccountSidebarHorizontalDividingLineBorderColorClassNameForLightOrDarkMode,
	getAccountSidebarLogoutButtonBorderHoverBackgroundColorClassNameForLightOrDarkMode,
} from "../../../utils";

import { useSidebarResize } from "../../../utils/hooks";

// Components
import AccountSidebarChangeAppearance from "./AccountSidebarChangeAppearance";

export default function AccountSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	// Custom hook resizes the sidebar so that the overflow functionality works
	useSidebarResize(reduxState, "js-account-sidebar");

	const openAccountModalForEditingAccount = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalChangeInfo: true,
			})
		);
	};

	const openAccountModalForEditingSettings = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalChangeSettings: true,
			})
		);
	};

	const handleLogoutAccount = (e) => {
		// Makes sure onclick set on the home component for closing
		// ...itemViewTopBarOptionsDropdown doesn't intefere
		e.stopPropagation();
		dispatch(logoutAccount());
	};

	return (
		<div className="account-sidebar-component">
			<div
				className={
					"sidebar-container js-account-sidebar" +
					getAccountSidebarAndModalBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<div
					className="settings-button"
					onClick={openAccountModalForEditingSettings}
				>
					<i
						className={
							"fa fa-cog" +
							getBaseIconButtonTextColorWithHoverClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						aria-hidden="true"
						alt="Icon of a settings cog"
					/>
				</div>
				<div className="padded-container">
					<div className="account-info-container">
						<div className="account-info account-info--name">
							{reduxState[ACCOUNT_CONTAINER].accountInfo.first_name +
								" " +
								reduxState[ACCOUNT_CONTAINER].accountInfo.last_name}
						</div>
						<div className="account-info">
							{reduxState[ACCOUNT_CONTAINER].accountInfo.email}
						</div>
						<div className="account-info">
							Joined:{" "}
							{formatDateMMddYYYY(
								reduxState[ACCOUNT_CONTAINER].accountInfo.joinDate
							)}
						</div>
					</div>
					<div className="link-container">
						<span
							onClick={openAccountModalForEditingAccount}
							className={
								"link-container__text" +
								getTextColorClassNameForThemeWithLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
						>
							Edit Account
						</span>
					</div>
					<div
						className={
							"horizontal-dividing-line" +
							getAccountSidebarHorizontalDividingLineBorderColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					/>
					<AccountSidebarChangeAppearance />
					<div
						className={
							"horizontal-dividing-line horizontal-dividing-line--half-top-margin" +
							getAccountSidebarHorizontalDividingLineBorderColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					/>
					<div className="button-container">
						<div
							className={
								"button-container__logout-button" +
								getAccountSidebarLogoutButtonBorderHoverBackgroundColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
							onClick={(e) => handleLogoutAccount(e)}
						>
							<span
								className={
									"button-container__logout-button__text" +
									getTextColorClassNameForThemeWithLightOrDarkMode(
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
										reduxState[ACCOUNT_CONTAINER].settings.theme_color
									)
								}
							>
								Logout
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
