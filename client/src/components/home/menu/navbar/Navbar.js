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
		<div className="navbar-component js-navbar">
			<NavbarBreadcrumb />

			<div
				className="navbar__account-button js-navbar-account-button"
				aria-label="Account"
				onClick={openAccountSidebar}
			>
				{reduxState[ACCOUNT_CONTAINER].componentsDisplay
					.accountSidebarComponentShouldDisplay ? (
					<FontAwesomeIcon
						icon={faCircleUserSolid}
						size="xl"
						aria-hidden="true"
					/>
				) : (
					<FontAwesomeIcon
						icon={faCircleUserReg}
						size="xl"
						aria-hidden="true"
					/>
				)}
			</div>
		</div>
	);
}
