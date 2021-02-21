import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	setWhichGeneralDropdownsDisplay,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import {
	getElementSize,
	getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode,
	getNavbarHamburgerDropdownBackgroundColorWithHoverAndSelectedClassNameForLightOrDarkMode,
	openProjectsListView,
	openProjectsItemView,
	openBugsListView,
	openBugsItemView,
	closeProjectItemView,
	closeBugItemView,
} from "../../../utils";

import bendyArrowModeLight from "../../../images/bendy-arrow-for-mode-light.svg";
import bendyArrowModeDark from "../../../images/bendy-arrow-for-mode-dark.svg";

export default function NavbarHamburger() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Resizes Hamburger title to fit inside the navbar based on the window size
	useEffect(() => {
		const hamburgerTitleElement = document.getElementsByClassName(
			"js-hamburger-title"
		)[0];

		hamburgerTitleElement.style.visibility = "hidden";

		// Resets fontSize and maxWidth
		hamburgerTitleElement.style.fontSize =
			reduxState[SIZE_CONTAINER].constants.navbarHamburgerStyles
				.titleBaseFontSize + "px";
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
				reduxState[SIZE_CONTAINER].constants.navbarHamburgerStyles.titleLeft;

			let hamburgerTitleElementWidth = getElementSize(hamburgerTitleElement)
				.width;

			let fontSize =
				reduxState[SIZE_CONTAINER].constants.navbarHamburgerStyles
					.titleBaseFontSize;

			while (
				fontSize >
					reduxState[GENERAL_CONTAINER].globalConstants
						.navbarBreadcrumbMinimumFontSize &&
				navbarAvailableSpace - hamburgerTitleElementWidth < 0
			) {
				fontSize -= 1;
				hamburgerTitleElement.style.fontSize = fontSize + "px";

				hamburgerTitleElementWidth = getElementSize(hamburgerTitleElement)
					.width;
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
			reduxState[GENERAL_CONTAINER].dropdownsDisplay.navbarHamburherDropdown &&
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].constants.navbarHamburgerStyles !== null
		) {
			const hamburgerDropdownElement = document.getElementsByClassName(
				"js-hamburger-dropdown"
			)[0];

			hamburgerDropdownElement.style.width =
				reduxState[SIZE_CONTAINER].variables.window.width -
				reduxState[SIZE_CONTAINER].constants.navbarHamburgerStyles.buttonLeft *
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

	const toggleHamburgerDropdown = (e) => {
		e.stopPropagation();

		dispatch(
			setWhichGeneralDropdownsDisplay({
				navbarHamburherDropdown: !reduxState[GENERAL_CONTAINER].dropdownsDisplay
					.navbarHamburherDropdown,
			})
		);

		dispatch(setWhichAccountComponentsDisplay({}));
	};

	const getTitle = () => {
		if (reduxState[PROJECT_CONTAINER].componentsDisplay.listView) {
			return "Projects";
		} else if (reduxState[PROJECT_CONTAINER].componentsDisplay.itemView) {
			return reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.name;
		} else if (reduxState[BUG_CONTAINER].componentsDisplay.listView) {
			return "Bugs";
		} else if (reduxState[BUG_CONTAINER].componentsDisplay.itemView) {
			return reduxState[BUG_CONTAINER].componentsDisplay.targetItem.name;
		}
	};

	return (
		<div className="hamburger-container">
			{!reduxState[GENERAL_CONTAINER].dropdownsDisplay
				.navbarHamburherDropdown ? (
				<div
					className="hamburger-button-container"
					onClick={(e) => toggleHamburgerDropdown(e)}
				>
					<i
						className="fa fa-bars hamburger-button-container__icon"
						aria-hidden="true"
					/>
				</div>
			) : (
				<div>
					<div
						className={
							"blurred-background" +
							getBlurredBackgroundBackgroundColorAndOpacityClassNameForLightOrDarkMode(
								true,
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					/>
					<div
						className={
							"hamburger-dropdown js-hamburger-dropdown" +
							getNavbarHamburgerDropdownBackgroundColorWithHoverAndSelectedClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						// Keeps onClick function set on Home component from firing
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className="hamburger-dropdown__top-space"
							onClick={toggleHamburgerDropdown}
						>
							<i
								className="fa fa-bars hamburger-dropdown__top-space__icon"
								aria-hidden="true"
							/>
						</div>
						<div
							className={
								"hamburger-dropdown__option" +
								(reduxState[PROJECT_CONTAINER].componentsDisplay.listView
									? " hamburger-dropdown__option--selected"
									: "") +
								(reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem ===
								null
									? " hamburger-dropdown__option--last-button-round-bottom-border"
									: "")
							}
							onClick={() => openProjectsListView(reduxState, dispatch)}
						>
							<i
								className="fa fa-folder hamburger-dropdown__option__icon"
								aria-hidden="true"
							/>{" "}
							Projects
						</div>

						{reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem ===
						null ? null : (
							<div
								className={
									"hamburger-dropdown__option hamburger-dropdown__option--item-name" +
									(reduxState[PROJECT_CONTAINER].componentsDisplay.itemView
										? " hamburger-dropdown__option--selected"
										: "")
								}
								onClick={() => openProjectsItemView(reduxState, dispatch)}
							>
								<img
									className="hamburger-dropdown__option__svg-arrow-option-2"
									src={
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											? bendyArrowModeDark
											: bendyArrowModeLight
									}
									alt="Arrow pointing from the button above to this button signifying this is to open a particular project"
								/>
								{
									reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem
										.name
								}
								<i
									className="fa fa-times hamburger-dropdown__option__close-button"
									aria-hidden="true"
									onClick={(e) => closeProjectItemView(e, reduxState, dispatch)}
								/>
							</div>
						)}

						{reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem ===
						null ? null : (
							<div
								className={
									"hamburger-dropdown__option" +
									(reduxState[BUG_CONTAINER].componentsDisplay.listView
										? " hamburger-dropdown__option--selected"
										: "") +
									(reduxState[BUG_CONTAINER].componentsDisplay.targetItem ===
									null
										? " hamburger-dropdown__option--last-button-round-bottom-border"
										: "")
								}
								onClick={() => openBugsListView(reduxState, dispatch)}
							>
								<img
									className="hamburger-dropdown__option__svg-arrow-option-3"
									src={
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											? bendyArrowModeDark
											: bendyArrowModeLight
									}
									alt="Arrow pointing from the button above to this button signifying this is to open a table of bugs belonging to that particular project"
								/>
								<i
									className="fa fa-bug hamburger-dropdown__option__icon"
									aria-hidden="true"
								/>{" "}
								Bugs
							</div>
						)}

						{reduxState[BUG_CONTAINER].componentsDisplay.targetItem ===
						null ? null : (
							<div
								className={
									"hamburger-dropdown__option hamburger-dropdown__option--item-name hamburger-dropdown__option--last-button-round-bottom-border" +
									(reduxState[BUG_CONTAINER].componentsDisplay.itemView
										? " hamburger-dropdown__option--selected"
										: "")
								}
								onClick={() => openBugsItemView(reduxState, dispatch)}
							>
								<img
									className="hamburger-dropdown__option__svg-arrow-option-4"
									src={
										reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											? bendyArrowModeDark
											: bendyArrowModeLight
									}
									alt="Arrow pointing from the button above to this button signifying this is to open a particular bug"
								/>
								{reduxState[BUG_CONTAINER].componentsDisplay.targetItem.name}
								<i
									className="fa fa-times hamburger-dropdown__option__close-button"
									aria-hidden="true"
									onClick={(e) => closeBugItemView(e, reduxState, dispatch)}
								/>
							</div>
						)}
					</div>
				</div>
			)}
			<div
				className={
					"hamburger-title js-hamburger-title" +
					(reduxState[PROJECT_CONTAINER].componentsDisplay.itemView ||
					reduxState[BUG_CONTAINER].componentsDisplay.itemView
						? " hamburger-title--item-name"
						: "")
				}
				onClick={toggleHamburgerDropdown}
			>
				{getTitle()}
			</div>
		</div>
	);
}
