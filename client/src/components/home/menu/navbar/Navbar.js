import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
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

import {
	getElementSize,
	getNavbarComponentAccountButtonElementTextColorClassNameForLightOrDarkMode,
} from "../../../../utils";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser as faCircleUserReg } from "@fortawesome/free-regular-svg-icons";
import { faCircleUser as faCircleUserSolid } from "@fortawesome/free-solid-svg-icons";

// Components
import NavbarBreadcrumb from "./NavbarBreadcrumb";
import NavbarSoloTitle from "./NavbarSoloTitle";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const initialState = { breadcrumb: true, soloTitle: false };
	const [shouldComponentsBeVisible, setShouldComponentsBeVisible] = useState({
		initialState,
	});

	// Decides whether NavbarSoloTitle and NavbarBreadcrumb components should
	// ...display based on if there is enough space for them
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth !== null
		) {
			const navbarBreadcrumbElement = document.getElementsByClassName(
				"js-navbar-breadcrumb"
			)[0];

			const navbarBreadcrumbWidth = getElementSize(
				navbarBreadcrumbElement
			).width;

			const shouldBreadcrumbBeVisible =
				reduxState[SIZE_CONTAINER].variables.navbar.width -
					reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth -
					navbarBreadcrumbWidth >=
				0;

			const navbarSoloTitleElement = document.getElementsByClassName(
				"js-navbar-solo-title"
			)[0];

			const navbarSoloTitleWidth = getElementSize(navbarSoloTitleElement).width;

			const shouldSoloTitleBeVisible =
				!shouldBreadcrumbBeVisible &&
				reduxState[SIZE_CONTAINER].variables.navbar.width -
					reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth -
					navbarSoloTitleWidth >=
					0;

			setShouldComponentsBeVisible({
				breadcrumb: shouldBreadcrumbBeVisible,
				soloTitle: shouldSoloTitleBeVisible,
			});
			return;
		}

		setShouldComponentsBeVisible(initialState);

		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants,
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay,
	]);

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
			<NavbarBreadcrumb visible={shouldComponentsBeVisible.breadcrumb} />
			<NavbarSoloTitle visible={shouldComponentsBeVisible.soloTitle} />
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
