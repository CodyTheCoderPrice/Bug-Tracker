import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Component uses container names to work with the redux state
import { ACCOUNT_CONTAINER } from "../../../actions/constants/containerNames";
import {
	clearBackendErrors,
	logoutAccount,
	setWhichAccountComponentsDisplay,
} from "../../../actions";
import {
	getAccountSidebarComponentSidebarContainerElementBackgroundColorClassNameForLightOrDarkMode,
	getCommonIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode,
	formatDateMMddYYYY,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	setTrueForOnlyAccountModalEditInfo,
	getAccountSidebarComponentHorizontalDividingLineElementBorderColorClassNameForLightOrDarkMode,
	getAccountSidebarComponentLogoutButtonElementBorderHoverBackgroundColorClassNameForLightOrDarkMode,
} from "../../../utils";
import { useSidebarResize } from "../../../utils/hooks";
// Other components used by this component
import AccountSidebarEditAppearance from "./AccountSidebarEditAppearance";

/**
 * React functional component for displaying the logged in account's personal
 * info, email, and join date. Also has buttons/links for openning the modals
 * for editing account's personal info and settings, and a button to logout.
 * Also displays the AccountSidebarEditAppearance component.
 *
 * The flag for displaying this component is 'accountSidebar' property of
 * 'componentsDisplay' property in ACCOUNT_CONTAINER of the redux state.
 *
 * @component
 */
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

	useSidebarResize(reduxState, "js-account-sidebar-container");

	/**
	 * Opens AccountModalEditSettings component while closing all other account
	 * components (other than AccountModal as AccountModalEditSettings depends
	 * on it)
	 */
	const openOnlyEditSettingsModal = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountModalEditSettings: true,
			})
		);
	};

	/**
	 * Call logoutAccount action to logout the account
	 *
	 * @param {Event} e - Event created by element's onClick handler
	 */
	const handleLogoutAccount = (e) => {
		// Likely unneeded, but stopPropagation just to be safe
		e.stopPropagation();
		dispatch(logoutAccount());
	};

	return (
		<div className="account-sidebar-component">
			<div
				className={
					"sidebar-container js-account-sidebar-container" +
					getAccountSidebarComponentSidebarContainerElementBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<div
					className={
						"settings-icon-button" +
						getCommonIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
					alt="Button to open account settings"
					onClick={openOnlyEditSettingsModal}
				>
					<i
						className="fa fa-cog"
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
								reduxState[ACCOUNT_CONTAINER].accountInfo.join_date
							)}
						</div>
					</div>
					<div className="link-container">
						<span
							className={
								"link-container__text" +
								getCommonTextColorClassNameForThemeWithLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
								)
							}
							alt="Link to begin editing account"
							onClick={() => setTrueForOnlyAccountModalEditInfo(dispatch)}
						>
							Edit Account
						</span>
					</div>
					<div
						className={
							"horizontal-dividing-line" +
							getAccountSidebarComponentHorizontalDividingLineElementBorderColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					/>
					<AccountSidebarEditAppearance />
					<div
						className={
							"horizontal-dividing-line horizontal-dividing-line--half-top-margin" +
							getAccountSidebarComponentHorizontalDividingLineElementBorderColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					/>
					<div className="button-container">
						<div
							className={
								"button-container__logout-button" +
								getAccountSidebarComponentLogoutButtonElementBorderHoverBackgroundColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
							alt="Button to logout"
							onClick={handleLogoutAccount}
						>
							<span
								className={
									"button-container__logout-button__text" +
									getCommonTextColorClassNameForThemeWithLightOrDarkMode(
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
