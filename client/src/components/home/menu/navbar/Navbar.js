import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
	setWhichCommentComponentsDisplay,
} from "../../../../actions";

import {
	getNavbarComponentAccountButtonElementTextColorClassNameForLightOrDarkMode,
} from "../../../../utils";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser as faCircleUserReg } from "@fortawesome/free-regular-svg-icons";
import { faCircleUser as faCircleUserSolid } from "@fortawesome/free-solid-svg-icons";

// Components
import NavbarBreadcrumb from "./NavbarBreadcrumb";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const openAccountSidebar = (e) => {
		// Keeps onclick set on the navbar component for closing
		// ...account components from interfering
		e.stopPropagation();

		dispatch(
			setWhichAccountComponentsDisplay({
				accountSidebarComponentShouldDisplay:
					!reduxState[ACCOUNT_CONTAINER].componentsDisplay
						.accountSidebarComponentShouldDisplay,
			})
		);
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState[PROJECT_CONTAINER].componentsDisplay,
				listViewCreateItemSidbarComponentShouldDisplay: false,
				deleteModalComponentForListViewShouldDisplay: false,
				deleteModalComponentForItemViewShouldDisplay: false,
			})
		);
		dispatch(
			setWhichBugComponentsDisplay({
				...reduxState[BUG_CONTAINER].componentsDisplay,
				listViewCreateItemSidbarComponentShouldDisplay: false,
				deleteModalComponentForListViewShouldDisplay: false,
				deleteModalComponentForItemViewShouldDisplay: false,
			})
		);
		dispatch(setWhichCommentComponentsDisplay({}));
	};

	return (
		<div className="navbar-component js-navbar-component">
			<NavbarBreadcrumb />
			<div
				className="padding-container js-navbar-account-button-container"
				aria-label="Account"
			>
				<FontAwesomeIcon
					icon={
						reduxState[ACCOUNT_CONTAINER].componentsDisplay
							.accountSidebarComponentShouldDisplay
							? faCircleUserSolid
							: faCircleUserReg
					}
					className={
						"padding-container__account-button" +
						getNavbarComponentAccountButtonElementTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						)
					}
					size="2xl"
					aria-hidden="true"
					onClick={openAccountSidebar}
				/>
			</div>
		</div>
	);
}
