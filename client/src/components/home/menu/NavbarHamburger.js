import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	SIZE_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../actions/constants/containerNames";
import { getElementSize, toggleHamburgerDropdown } from "../../../utils";
// Other components used by this component
import NavbarHamburgerDropdown from "./NavbarHamburgerDropdown";

export default function NavbarHamburger() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Resizes Hamburger title to fit inside the navbar based on the window size
	useEffect(() => {
		const hamburgerTitleElement =
			document.getElementsByClassName("js-hamburger-title")[0];

		hamburgerTitleElement.style.visibility = "hidden";

		// Resets fontSize and maxWidth
		hamburgerTitleElement.style.fontSize =
			reduxState[SIZE_CONTAINER].constants
				.navbarHamburgerComponentCriticalStyles.titleBaseFontSize + "px";
		hamburgerTitleElement.style.maxWidth = null;

		if (
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth !== null
		) {
			/* 
			Width of hambugerTitle left out since it needs it will
			change frequently and new available space needs to be calculated
			 */
			let navbarAvailableSpace =
				reduxState[SIZE_CONTAINER].variables.navbar.width -
				reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth -
				reduxState[SIZE_CONTAINER].constants
					.navbarHamburgerComponentCriticalStyles.titleLeft;

			let hamburgerTitleElementWidth = getElementSize(
				hamburgerTitleElement
			).width;

			let fontSize =
				reduxState[SIZE_CONTAINER].constants
					.navbarHamburgerComponentCriticalStyles.titleBaseFontSize;

			while (
				fontSize >
					reduxState[GENERAL_CONTAINER].globalConstants
						.navbarBreadcrumbMinimumFontSize &&
				navbarAvailableSpace - hamburgerTitleElementWidth < 0
			) {
				fontSize -= 1;
				hamburgerTitleElement.style.fontSize = fontSize + "px";

				hamburgerTitleElementWidth = getElementSize(
					hamburgerTitleElement
				).width;
			}

			if (navbarAvailableSpace - hamburgerTitleElementWidth < 0) {
				hamburgerTitleElement.style.maxWidth = navbarAvailableSpace + "px";
			}

			hamburgerTitleElement.style.visibility = "visible";
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants,
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables.navbar,
		// eslint-disable-next-line
		reduxState[GENERAL_CONTAINER].globalConstants,
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay,
	]);

	// Resize hamburger dropdown width to be full screen
	useEffect(() => {
		if (
			reduxState[GENERAL_CONTAINER].dropdownsDisplay.navbarHambugerDropdown &&
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].constants
				.navbarHamburgerComponentCriticalStyles !== null
		) {
			const hamburgerDropdownElement = document.getElementsByClassName(
				"js-hamburger-dropdown"
			)[0];

			hamburgerDropdownElement.style.width =
				reduxState[SIZE_CONTAINER].variables.window.width -
				reduxState[SIZE_CONTAINER].constants
					.navbarHamburgerComponentCriticalStyles.buttonLeft *
					2 +
				"px";
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants,
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables.window,
		// eslint-disable-next-line
		reduxState[GENERAL_CONTAINER].globalConstants,
		// eslint-disable-next-line
		reduxState[GENERAL_CONTAINER].dropdownsDisplay,
	]);

	const getTitle = () => {
		if (
			reduxState[PROJECT_CONTAINER].componentsDisplay
				.listViewComponentShouldDisplay
		) {
			return "Projects";
		} else if (
			reduxState[PROJECT_CONTAINER].componentsDisplay
				.itemViewComponentShouldDisplay
		) {
			return reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
				.name;
		} else if (
			reduxState[BUG_CONTAINER].componentsDisplay.listViewComponentShouldDisplay
		) {
			return "Bugs";
		} else if (
			reduxState[BUG_CONTAINER].componentsDisplay.itemViewComponentShouldDisplay
		) {
			return reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem
				.name;
		}
	};

	return (
		<div className="navbar-hamburger-component">
			{!reduxState[GENERAL_CONTAINER].dropdownsDisplay
				.navbarHambugerDropdown ? (
				<div
					className="hamburger-button-container"
					alt="Navbar hamburger button to open dropdown for different pages"
					onClick={(e) => toggleHamburgerDropdown(e, reduxState, dispatch)}
				>
					<i
						className="fa fa-bars hamburger-button-container__icon"
						aria-hidden="true"
					/>
				</div>
			) : (
				<NavbarHamburgerDropdown />
			)}
			<div
				className={
					"hamburger-title js-hamburger-title" +
					(reduxState[PROJECT_CONTAINER].componentsDisplay
						.itemViewComponentShouldDisplay ||
					reduxState[BUG_CONTAINER].componentsDisplay
						.itemViewComponentShouldDisplay
						? " hamburger-title--item-name"
						: "")
				}
				onClick={(e) => toggleHamburgerDropdown(e, reduxState, dispatch)}
			>
				{getTitle()}
			</div>
		</div>
	);
}
