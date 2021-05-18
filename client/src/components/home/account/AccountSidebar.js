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
import AccountSidebarEditAppearance from "./AccountSidebarEditAppearance";

export default function AccountSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Clears current backend errors when closing the component. Otherwise the
	// ...backend errors may presist and appear when component is re-openned.
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	// Custom hook resizes the sidebar so that the overflow functionality works
	useSidebarResize(reduxState, "js-account-sidebar-container");

	const openAccountModalForEditingAccount = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalEditInfo: true,
			})
		);
	};

	const openAccountModalForEditingSettings = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalEditSettings: true,
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
					"sidebar-container js-account-sidebar-container" +
					getAccountSidebarAndModalBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<div
					className="settings-button"
					alt="Button to open account settings"
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
							className={
								"link-container__text" +
								getTextColorClassNameForThemeWithLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
							alt="Link to begin editing account"
							onClick={openAccountModalForEditingAccount}
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
					<AccountSidebarEditAppearance />
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
							alt="Button to logout"
							onClick={handleLogoutAccount}
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
