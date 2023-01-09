import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	getElementStyle,
	stripNonDigits,
	getElementSize,
	getNavbarBreadcrumbComponentButtonAndDividerElementTextColorClassNameForLightOrDarkMode,
	getNavbarBreadcrumbComponentButtonElementOpenedTextColorClassNameForLightOrDarkMode,
	switchToProjectsListView,
	getProjectsText,
	switchToProjectsItemView,
	switchToBugsListView,
	getBugsText,
	switchToBugsItemView,
} from "../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function NavbarBreadcrumb() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [breadcrumbStyles, setBreadcrumbStyles] = useState({
		componentPaddingLeft: null,
		componentPaddingRight: null,
		dividerPaddingLeft: null,
		dividerPaddingRight: null,
	});

	const [breadcrumbSizes, setBreadcrumbSizes] = useState({
		shouldUpdate: true,
		projectListButtonWidth: 0,
		projectItemButtonWidth: 0,
		bugListButtonWidth: 0,
		bugItemButtonWidth: 0,
		dividerWidth: 0,
		combinedDividerWidth: 0,
	});

	const [canAllButtonsDisplay, setCanAllButtonsDisplay] = useState(true);

	// Sets breadcrumbStyles
	useEffect(() => {
		let navbarBreadcrumbElement = document.getElementsByClassName(
			"js-navbar-breadcrumb"
		)[0];

		const navbarBreadcrumbElementSyle = getElementStyle(
			navbarBreadcrumbElement
		);

		// Creating stand-in divider element since a real one may not be in JSX
		const standInBreadcrumbDividerElement = document.createElement("div");
		standInBreadcrumbDividerElement.className = "breadcrumb-divider";
		// Made hidden so user never sees stand-in element
		standInBreadcrumbDividerElement.visibility = "hidden";
		navbarBreadcrumbElement.appendChild(standInBreadcrumbDividerElement);
		const navbarBreadcrumbDividerElementSyle = getElementStyle(
			standInBreadcrumbDividerElement
		);

		setBreadcrumbStyles({
			componentPaddingLeft: stripNonDigits(
				navbarBreadcrumbElementSyle.paddingLeft
			),
			componentPaddingRight: stripNonDigits(
				navbarBreadcrumbElementSyle.paddingRight
			),
			dividerPaddingLeft: stripNonDigits(
				navbarBreadcrumbDividerElementSyle.paddingLeft
			),
			dividerPaddingRight: stripNonDigits(
				navbarBreadcrumbDividerElementSyle.paddingRight
			),
		});

		// Removed stand-in element as it served its purpose
		navbarBreadcrumbElement.removeChild(standInBreadcrumbDividerElement);

		// eslint-disable-next-line
	}, []);

	// Updates breadcrumbSizes
	useEffect(() => {
		if (breadcrumbSizes.shouldUpdate) {
			let navbarBreadcrumbElement = document.getElementsByClassName(
				"js-navbar-breadcrumb"
			)[0];

			let navbarBreadcrumbButtonElements =
				navbarBreadcrumbElement.querySelectorAll(".breadcrumb-button");

			let actualBreadcrumbButtonWidths = [];

			navbarBreadcrumbButtonElements.forEach((element, index) => {
				actualBreadcrumbButtonWidths[index] = getElementSize(element).width;
				element.style.width = "auto";
			});

			let navbarBreadcrumbDividerElements =
				navbarBreadcrumbElement.querySelectorAll(".breadcrumb-divider");

			let tempCombinedDividerWidth = 0;

			navbarBreadcrumbDividerElements.forEach((element) => {
				const actualWidth = getElementSize(element).width;
				element.style.width = "auto";
				tempCombinedDividerWidth += getElementSize(element).width;
				element.style.width = actualWidth;
			});

			setBreadcrumbSizes({
				projectListButtonWidth:
					navbarBreadcrumbButtonElements[0] === undefined
						? 0
						: breadcrumbSizes.projectListButtonWidth !== 0
						? breadcrumbSizes.projectListButtonWidth
						: getElementSize(navbarBreadcrumbButtonElements[0]).width,
				projectItemButtonWidth:
					navbarBreadcrumbButtonElements[1] === undefined
						? 0
						: getElementSize(navbarBreadcrumbButtonElements[1]).width,
				bugListButtonWidth:
					navbarBreadcrumbButtonElements[2] === undefined
						? 0
						: breadcrumbSizes.bugListButtonWidth !== 0
						? breadcrumbSizes.bugListButtonWidth
						: getElementSize(navbarBreadcrumbButtonElements[2]).width,
				bugItemButtonWidth:
					navbarBreadcrumbButtonElements[3] === undefined
						? 0
						: getElementSize(navbarBreadcrumbButtonElements[3]).width,
				dividerWidth:
					navbarBreadcrumbDividerElements[0] === undefined
						? 0
						: breadcrumbSizes.dividerWidth !== 0
						? breadcrumbSizes.projectListButtonWidth
						: getElementSize(navbarBreadcrumbDividerElements[0]).width,
				combinedDividerWidth: tempCombinedDividerWidth,
			});

			navbarBreadcrumbButtonElements.forEach((element, index) => {
				element.style.width = actualBreadcrumbButtonWidths[index];
			});

			return;
		}

		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay,
	]);

	// Checks if there is enough space for all breadcrumb buttons to display
	useEffect(() => {
		if (
			breadcrumbStyles.componentPaddingLeft !== null &&
			breadcrumbStyles.componentPaddingRight !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth !== null
		) {
			setCanAllButtonsDisplay(
				breadcrumbStyles.componentPaddingLeft +
					breadcrumbStyles.componentPaddingRight +
					breadcrumbSizes.projectListButtonWidth +
					breadcrumbSizes.projectItemButtonWidth +
					breadcrumbSizes.bugListButtonWidth +
					breadcrumbSizes.bugItemButtonWidth +
					breadcrumbSizes.combinedDividerWidth <
					reduxState[SIZE_CONTAINER].variables.navbar.width -
						reduxState[SIZE_CONTAINER].constants.navbarAccountButtonWidth
			);
		}
		// eslint-disable-next-line
	}, [
		breadcrumbStyles,
		breadcrumbSizes,
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants,
	]);

	useEffect(() => {
		let navbarBreadcrumbElement = document.getElementsByClassName(
			"js-navbar-breadcrumb"
		)[0];

		let navbarBreadcrumbButtonElements =
			navbarBreadcrumbElement.querySelectorAll(".breadcrumb-button");

		let navbarBreadcrumbDividerElements =
			navbarBreadcrumbElement.querySelectorAll(".breadcrumb-divider");

		if (canAllButtonsDisplay) {
			navbarBreadcrumbButtonElements.forEach((element, index) => {
				if (!element.className.includes("breadcrumb-button--opened")) {
					switch (index) {
						case 0:
							element.style.width =
								breadcrumbSizes.projectListButtonWidth + "px";
							break;
						case 1:
							element.style.width =
								breadcrumbSizes.projectItemButtonWidth + "px";
							break;
						case 2:
							element.style.width = breadcrumbSizes.bugListButtonWidth + "px";
							break;
						case 3:
							element.style.width = breadcrumbSizes.bugItemButtonWidth + "px";
							break;
						default:
							break;
					}
				}
			});

			navbarBreadcrumbDividerElements.forEach((element) => {
				element.style.width =
					breadcrumbSizes.dividerWidth -
					breadcrumbStyles.dividerPaddingLeft -
					breadcrumbStyles.dividerPaddingRight +
					"px";
			});
		} else {
			navbarBreadcrumbButtonElements.forEach((element) => {
				if (!element.className.includes("breadcrumb-button--opened")) {
					element.style.width = "0";
				}
			});

			navbarBreadcrumbDividerElements.forEach((element) => {
				element.style.width = "0";
			});
		}
		// eslint-disable-next-line
	}, [breadcrumbStyles, canAllButtonsDisplay]);

	const getBreadcrumbButtonClassNames = (shouldBeOpened) => {
		return (
			"breadcrumb-button" +
			getNavbarBreadcrumbComponentButtonAndDividerElementTextColorClassNameForLightOrDarkMode(
				reduxState[ACCOUNT_CONTAINER].settings.dark_mode
			) +
			(canAllButtonsDisplay ? "" : " breadcrumb-button--cursor-default") +
			(canAllButtonsDisplay || shouldBeOpened
				? " breadcrumb-button--fade-in"
				: " breadcrumb-button--fade-out") +
			(!shouldBeOpened
				? ""
				: " breadcrumb-button--opened" +
				  getNavbarBreadcrumbComponentButtonElementOpenedTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				  ))
		);
	};

	const getBreadcrumbDividerClassNames = () => {
		return (
			"breadcrumb-divider" +
			getNavbarBreadcrumbComponentButtonAndDividerElementTextColorClassNameForLightOrDarkMode(
				reduxState[ACCOUNT_CONTAINER].settings.dark_mode
			) +
			(canAllButtonsDisplay
				? " breadcrumb-divider--fade-in"
				: " breadcrumb-divider--fade-out")
		);
	};

	const getDividerIcon = () => {
		return <FontAwesomeIcon icon={faChevronRight} size="xs" />;
	};

	const shouldButtonDisplay = {
		projectList: true,
		projectItem:
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
			null,
		bugList:
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
			null,
		bugItem:
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
				null &&
			reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem !== null,
	};

	const shouldButtonBeOpen = {
		projectList:
			reduxState[PROJECT_CONTAINER].componentsDisplay
				.listViewComponentShouldDisplay,
		projectItem:
			reduxState[PROJECT_CONTAINER].componentsDisplay
				.itemViewComponentShouldDisplay,
		bugList:
			reduxState[BUG_CONTAINER].componentsDisplay
				.listViewComponentShouldDisplay,
		bugItem:
			reduxState[BUG_CONTAINER].componentsDisplay
				.itemViewComponentShouldDisplay,
	};

	return (
		<div className="navbar-breadcrumb-component js-navbar-breadcrumb">
			{!shouldButtonDisplay.projectList ? null : (
				<div
					className={getBreadcrumbButtonClassNames(
						shouldButtonBeOpen.projectList
					)}
					aria-label="Projects"
					aria-hidden={!canAllButtonsDisplay && !shouldButtonBeOpen.projectList}
					onClick={
						!canAllButtonsDisplay
							? null
							: () => switchToProjectsListView(reduxState, dispatch)
					}
				>
					{getProjectsText()}
				</div>
			)}
			{!shouldButtonDisplay.projectItem ? null : (
				<div className={getBreadcrumbDividerClassNames()} aria-hidden={true}>
					{getDividerIcon()}
				</div>
			)}
			{!shouldButtonDisplay.projectItem ? null : (
				<div
					className={getBreadcrumbButtonClassNames(
						shouldButtonBeOpen.projectItem
					)}
					aria-label={
						reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
							.name
					}
					aria-hidden={!canAllButtonsDisplay && !shouldButtonBeOpen.projectItem}
					onClick={
						!canAllButtonsDisplay
							? null
							: () => switchToProjectsItemView(reduxState, dispatch)
					}
				>
					{
						reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
							.name
					}
				</div>
			)}
			{!shouldButtonDisplay.bugList ? null : (
				<div className={getBreadcrumbDividerClassNames()} aria-hidden={true}>
					{getDividerIcon()}
				</div>
			)}
			{!shouldButtonDisplay.bugList ? null : (
				<div
					className={getBreadcrumbButtonClassNames(shouldButtonBeOpen.bugList)}
					aria-label="Bugs"
					aria-hidden={!canAllButtonsDisplay && !shouldButtonBeOpen.bugList}
					onClick={
						!canAllButtonsDisplay
							? null
							: () => switchToBugsListView(reduxState, dispatch)
					}
				>
					{getBugsText()}
				</div>
			)}
			{!shouldButtonDisplay.bugItem ? null : (
				<div className={getBreadcrumbDividerClassNames()} aria-hidden={true}>
					{getDividerIcon()}
				</div>
			)}
			{!shouldButtonDisplay.bugItem ? null : (
				<div
					className={getBreadcrumbButtonClassNames(shouldButtonBeOpen.bugItem)}
					aria-label={
						reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.name
					}
					aria-hidden={!canAllButtonsDisplay && !shouldButtonBeOpen.bugItem}
					onClick={
						!canAllButtonsDisplay
							? null
							: () => switchToBugsItemView(reduxState, dispatch)
					}
				>
					{reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.name}
				</div>
			)}
		</div>
	);
}
