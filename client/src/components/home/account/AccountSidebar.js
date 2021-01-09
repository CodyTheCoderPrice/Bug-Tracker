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

	const openEditInfoModals = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				editAccountModalChangeInfo: true,
			})
		);
	};

	const handleLogoutAccount = (e) => {
		// Makes sure onclick set on the home component for closing
		// ... itemViewTopBarOptionsDropdown doesn't intefere
		e.stopPropagation();
		dispatch(logoutAccount());
	};

	/* const logReduxState = () => {
		console.log(reduxState);
	}; */

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
							{reduxState[ACCOUNT_CONTAINER].info.first_name +
								" " +
								reduxState[ACCOUNT_CONTAINER].info.last_name}
						</div>
						<div className="account-info">
							{reduxState[ACCOUNT_CONTAINER].info.email}
						</div>
						<div className="account-info">
							Joined:{" "}
							{formatDateMMddYYYY(reduxState[ACCOUNT_CONTAINER].info.joinDate)}
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
						{/* <span
							onClick={logReduxState}
							className={"account-link" + getSLinkColor()}
						>
							Console Log Redux State
						</span> */}
					</div>
				</div>
			</div>
		</div>
	);
}
