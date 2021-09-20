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
	toggleHamburgerDropdown,
	getCommonBlurredBackdropElementBackgroundColorAndOpacityClassNameForLightOrDarkMode,
	getNavbarHamburgerComponentDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode,
	switchToProjectsListView,
	switchToProjectsItemView,
	SwitchToBugsListView,
	switchToBugsItemView,
	setTrueForOnlyProjectListViewAndCreateItemSidebar,
	closeBugItemView,
} from "../../../utils";

import bendyArrowModeLight from "../../../images/bendy-arrow-for-mode-light.svg";
import bendyArrowModeDark from "../../../images/bendy-arrow-for-mode-dark.svg";

export default function NavbarHamburgerDropdown() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Resize hamburger dropdown width to be full screen
	useEffect(() => {
		if (
			reduxState[GENERAL_CONTAINER].dropdownsDisplay
				.navbarHamburgerDropdownComponentShouldDisplay &&
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

	return (
		<div>
			<div
				className={
					"blurred-backdrop" +
					getCommonBlurredBackdropElementBackgroundColorAndOpacityClassNameForLightOrDarkMode(
						true,
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			/>
			<div
				className={
					"hamburger-dropdown js-hamburger-dropdown" +
					getNavbarHamburgerComponentDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
				alt="Navbar hamburger dropdown option to close dropdown"
				onClick={(e) => toggleHamburgerDropdown(e, reduxState, dispatch)}
			>
				<div className="hamburger-dropdown__top-space">
					<i
						className="fa fa-bars hamburger-dropdown__top-space__icon"
						aria-hidden="true"
					/>
				</div>
				<div
					className={
						"hamburger-dropdown__row-button" +
						(reduxState[PROJECT_CONTAINER].componentsDisplay
							.listViewComponentShouldDisplay
							? " hamburger-dropdown__row-button--selected"
							: "") +
						(reduxState[PROJECT_CONTAINER].componentsDisplay
							.itemViewCurrentItem === null
							? " hamburger-dropdown__row-button--last-option-round-bottom-border"
							: "")
					}
					alt="Navbar hamburger dropdown option to open the list of projects"
					onClick={() => switchToProjectsListView(reduxState, dispatch)}
				>
					<i
						className="fa fa-folder hamburger-dropdown__row-button__icon"
						aria-hidden="true"
					/>{" "}
					Projects
				</div>
				{reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ? null : (
					<div
						className={
							"hamburger-dropdown__row-button hamburger-dropdown__row-button--item-name" +
							(reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewComponentShouldDisplay
								? " hamburger-dropdown__row-button--selected"
								: "")
						}
						alt={
							"Navbar hamburger dropdown option to open the " +
							reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem.name +
							" project"
						}
						onClick={() => switchToProjectsItemView(reduxState, dispatch)}
					>
						<img
							className="hamburger-dropdown__row-button__svg-arrow-option-2"
							src={
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									? bendyArrowModeDark
									: bendyArrowModeLight
							}
							alt="Arrow pointing from the button above to this button signifying this is to open a particular project"
						/>
						{
							reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem.name
						}
						<i
							className="fa fa-times hamburger-dropdown__row-button__close-icon-button"
							aria-hidden="true"
							alt={
								"Icon of an X. If clicked, will close the " +
								reduxState[PROJECT_CONTAINER].componentsDisplay
									.itemViewCurrentItem.name +
								" project"
							}
							onClick={(e) =>
								setTrueForOnlyProjectListViewAndCreateItemSidebar(
									e,
									reduxState,
									dispatch
								)
							}
						/>
					</div>
				)}
				{reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ? null : (
					<div
						className={
							"hamburger-dropdown__row-button" +
							(reduxState[BUG_CONTAINER].componentsDisplay
								.listViewComponentShouldDisplay
								? " hamburger-dropdown__row-button--selected"
								: "") +
							(reduxState[BUG_CONTAINER].componentsDisplay
								.itemViewCurrentItem === null
								? " hamburger-dropdown__row-button--last-option-round-bottom-border"
								: "")
						}
						alt="Navbar hamburger dropdown option to open the list of bugs"
						onClick={() => SwitchToBugsListView(reduxState, dispatch)}
					>
						<img
							className="hamburger-dropdown__row-button__svg-arrow-option-3"
							src={
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									? bendyArrowModeDark
									: bendyArrowModeLight
							}
							alt="Arrow pointing from the button above to this button signifying this is to open a table of bugs belonging to that particular project"
						/>
						<i
							className="fa fa-bug hamburger-dropdown__row-button__icon"
							aria-hidden="true"
						/>{" "}
						Bugs
					</div>
				)}
				{reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ? null : (
					<div
						className={
							"hamburger-dropdown__row-button hamburger-dropdown__row-button--item-name hamburger-dropdown__row-button--last-option-round-bottom-border" +
							(reduxState[BUG_CONTAINER].componentsDisplay
								.itemViewComponentShouldDisplay
								? " hamburger-dropdown__row-button--selected"
								: "")
						}
						alt={
							"Navbar hamburger dropdown option to open the " +
							reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem
								.name +
							" bug"
						}
						onClick={() => switchToBugsItemView(reduxState, dispatch)}
					>
						<img
							className="hamburger-dropdown__row-button__svg-arrow-option-4"
							src={
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
									? bendyArrowModeDark
									: bendyArrowModeLight
							}
							alt="Arrow pointing from the button above to this button signifying this is to open a particular bug"
						/>
						{
							reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem
								.name
						}
						<i
							className="fa fa-times hamburger-dropdown__row-button__close-icon-button"
							aria-hidden="true"
							alt={
								"Icon of an X. If clicked, will close the " +
								reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem
									.name +
								" bug"
							}
							onClick={(e) => closeBugItemView(e, reduxState, dispatch)}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
