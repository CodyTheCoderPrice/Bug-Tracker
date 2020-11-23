import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	accountContainerName,
	projectContainerName,
	bugContainerName,
} from "../../../reducers/containerNames";

import {
	logoutAccount,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import { formatDateMMddYYYY } from "../../../utils/dateUtils";

import { useSidebarResize } from "../../../utils/sidebarResizeHookUtils";

import { getProjectOrBugTextColorClassName } from "../../../utils/elementColorUtils";

import "../../../SCSS/home/account/accountSidebar.scss";

export default function AccountSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Custom hook resizes the sidebar so that the overflow functionality works
	useSidebarResize(reduxState, "js-account-sidebar");

	const openEditInfoModals = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				editAccountModalChangeInfo: true,
			})
		);
	};

	const handleLogoutAccount = (e) => {
		// Makes sure onclick set on the home component for closing
		// ... itemContainerTopBarOptionsDropdown doesn't intefere
		e.stopPropagation();
		dispatch(logoutAccount());
	};

	const logReduxState = () => {
		console.log(reduxState);
	};

	const getSLinkColor = () => {
		if (
			reduxState[bugContainerName].componentsDisplay.listContainer !== true &&
			reduxState[bugContainerName].componentsDisplay.itemContainer !== true
		) {
			return getProjectOrBugTextColorClassName(projectContainerName);
		} else {
			return getProjectOrBugTextColorClassName(bugContainerName);
		}
	};

	return (
		<div className="account-sidebar-component">
			<div className="sidebar-container js-account-sidebar">
				<div className="padded-container">
					<div className="account-info-container">
						<div className="account-info account-info--large-bold">
							{reduxState[accountContainerName].info.first_name +
								" " +
								reduxState[accountContainerName].info.last_name}
						</div>
						<div className="account-info">
							{reduxState[accountContainerName].info.email}
						</div>
						<div className="account-info">
							Joined:{" "}
							{formatDateMMddYYYY(
								reduxState[accountContainerName].info.joinDate
							)}
						</div>
					</div>
					<div className={"account-link-container" + getSLinkColor()}>
						<span onClick={openEditInfoModals} className="account-link">
							Edit Account
						</span>
						<span
							onClick={(e) => handleLogoutAccount(e)}
							className={"account-link" + getSLinkColor()}
						>
							Logout
						</span>
						<span
							onClick={logReduxState}
							className={"account-link" + getSLinkColor()}
						>
							Console Log Redux State
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
