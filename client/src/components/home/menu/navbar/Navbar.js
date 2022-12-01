import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	SIZE_CONTAINER,
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

import { getCommonStandardBackgroundColorClassNameForTheme } from "../../../../utils";

// Components
import NavbarBreadcrumb from "./NavbarBreadcrumb";
import NavbarHamburger from "./NavbarHamburger";

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

	const shouldBreadcrumbBeVisible = () => {
		return (
			reduxState[SIZE_CONTAINER].variables.navbar === null ||
			reduxState[SIZE_CONTAINER].variables
				.navbarBreadcrumbButtonTextFontSize === null ||
			reduxState[GENERAL_CONTAINER].globalConstants
				.navbarBreadcrumbMinimumFontSize === null ||
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ||
			reduxState[SIZE_CONTAINER].variables.navbarBreadcrumbButtonTextFontSize >
				reduxState[GENERAL_CONTAINER].globalConstants
					.navbarBreadcrumbMinimumFontSize
		);
	};

	return (
		<div
			className={
				"navbar-component js-navbar" +
				getCommonStandardBackgroundColorClassNameForTheme(
					reduxState[ACCOUNT_CONTAINER].settings.theme_color
				) +
				(shouldBreadcrumbBeVisible()
					? ""
					: " navbar-container--increased-z-index")
			}
		>
			<NavbarBreadcrumb visible={shouldBreadcrumbBeVisible()} />
			{shouldBreadcrumbBeVisible() ? null : <NavbarHamburger />}

			<div
				className="navbar__account-button js-navbar-account-button"
				alt="Navbar button to open account sidebar"
			>
				<div
					className="navbar__account-button__text"
					onClick={openAccountSidebar}
				>
					<i className="fa fa-fw fa-user" alt="Icon of a user" />
					Account
				</div>
			</div>
		</div>
	);
}
