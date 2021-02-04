import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	logoutAccount,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import {
	formatDateMMddYYYY,
	getProjectOrBugTextColorClassName,
} from "../../../utils";

import { useSidebarResize } from "../../../utils/hooks";

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
		// ... itemViewTopBarOptionsDropdown doesn't intefere
		e.stopPropagation();
		dispatch(logoutAccount());
	};

	const getSLinkColor = () => {
		if (
			reduxState[BUG_CONTAINER].componentsDisplay.listView !== true &&
			reduxState[BUG_CONTAINER].componentsDisplay.itemView !== true
		) {
			return getProjectOrBugTextColorClassName(PROJECT_CONTAINER);
		} else {
			return getProjectOrBugTextColorClassName(BUG_CONTAINER);
		}
	};

	return (
		<div className="account-sidebar-component">
			<div className="sidebar-container js-account-sidebar">
				<div className="padded-container">
					<div className="account-info-container">
						<div className="account-info account-info--large-bold">
							{reduxState[ACCOUNT_CONTAINER].accountInfo.first_name +
								" " +
								reduxState[ACCOUNT_CONTAINER].accountInfo.last_name}
						</div>
						<div className="account-info">
							{reduxState[ACCOUNT_CONTAINER].accountInfo.email}
						</div>
						<div className="account-info">
							Joined:{" "}
							{formatDateMMddYYYY(reduxState[ACCOUNT_CONTAINER].accountInfo.joinDate)}
						</div>
					</div>
					<div className="dividing-line" />
					<div className={"account-link-container" + getSLinkColor()}>
						<span onClick={openAccountModalForEditingAccount} className="account-link">
							Edit Account
						</span>
						<span onClick={openAccountModalForEditingSettings} className="account-link">
							Settings
						</span>
						<span
							onClick={(e) => handleLogoutAccount(e)}
							className={"account-link" + getSLinkColor()}
						>
							Logout
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
