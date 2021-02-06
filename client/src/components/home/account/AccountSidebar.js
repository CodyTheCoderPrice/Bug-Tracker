import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	logoutAccount,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import {
	formatDateMMddYYYY,
	getTextColorClassNameForTheme,
} from "../../../utils";

import { useSidebarResize } from "../../../utils/hooks";

// Components
import AccountSidebarChangeAppearance from "./AccountSidebarChangeAppearance";

export default function AccountSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

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
			<div className="sidebar-container js-account-sidebar">
				<div
					className="settings-button"
					onClick={openAccountModalForEditingSettings}
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
								reduxState[ACCOUNT_CONTAINER].accountInfo.joinDate
							)}
						</div>
					</div>
					<div className="link-container">
						<span
							onClick={openAccountModalForEditingAccount}
							className={
								"link-container__text" +
								getTextColorClassNameForTheme(reduxState[ACCOUNT_CONTAINER].settings.theme_color)
							}
						>
							Edit Account
						</span>
					</div>
					<div className="horizontal-dividing-line" />
					<AccountSidebarChangeAppearance />
					<div className="horizontal-dividing-line" />
					<div className="button-container">
						<div
							className="button-container__logout-button"
							onClick={(e) => handleLogoutAccount(e)}
						>
							<span
								className={
									"button-container__logout-button__text" +
									getTextColorClassNameForTheme(reduxState[ACCOUNT_CONTAINER].settings.theme_color)
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
