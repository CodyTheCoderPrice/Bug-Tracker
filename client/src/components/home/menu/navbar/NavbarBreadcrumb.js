import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	getProjectsText,
	getBugsText,
	removeAllInstancesOfClassName,
	getElementStyle,
	stripNonDigits,
	getElementSize,
	getNavbarBreadcrumbComponentButtonAndDividerElementTextColorClassNameForLightOrDarkMode,
	getNavbarBreadcrumbComponentButtonElementOpenedTextColorClassNameForLightOrDarkMode,
	switchToProjectsListView,
	switchToProjectsItemView,
	switchToBugsListView,
	switchToBugsItemView,
} from "../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function NavbarBreadcrumb() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [buttonText, setButtonText] = useState({
		projectList: getProjectsText(),
		projectItem:
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
			null
				? null
				: reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
						.name,
		bugList: getBugsText(),
		bugItem:
			reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem === null
				? null
				: reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.name,
	});

	const buttonDisplayLogic = {
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

	const buttonOpenLogic = {
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

	const [buttonState, setbuttonState] = useState({
		projectListShouldDisplay: buttonDisplayLogic.projectList,
		projectListShouldLingerForFadeOut: false,
		projectListShouldBeOpen: buttonOpenLogic.projectList,
		projectItemShouldDisplay: buttonDisplayLogic.projectItem,
		projectItemShouldLingerForFadeOut: false,
		projectItemShouldBeOpen: buttonOpenLogic.projectItem,
		bugListShouldDisplay: buttonDisplayLogic.bugList,
		bugListShouldLingerForFadeOut: false,
		bugListShouldBeOpen: buttonOpenLogic.bugList,
		bugItemShouldDisplay: buttonDisplayLogic.bugItem,
		bugItemShouldLingerForFadeOut: false,
		bugItemShouldBeOpen: buttonOpenLogic.bugItem,
	});

	const [breadcrumbSizes, setBreadcrumbSizes] = useState({
		projectListButtonWidth: null,
		projectItemButtonWidth: null,
		bugListButtonWidth: null,
		bugItemButtonWidth: null,
		dividerWidth: null,
	});

	const [breadcrumbStyles, setBreadcrumbStyles] = useState({
		componentPaddingLeft: null,
		componentPaddingRight: null,
		dividerPaddingLeft: null,
		dividerPaddingRight: null,
	});

	const [canAllButtonsDisplay, setCanAllButtonsDisplay] = useState(true);

	// Updates buttonText
	useEffect(() => {
		// Keeps projectItem/bugItem the same when button is "removed" so it can
		// ...have its faded-out animation play
		const projectItemUpdatedValue =
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
			null
				? buttonText.projectItem
				: reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
						.name;

		const bugItemUpdatedValue =
			reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem === null
				? buttonText.bugItem
				: reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.name;

		if (
			buttonText.projectItem !== projectItemUpdatedValue ||
			buttonText.bugItem !== bugItemUpdatedValue
		) {
			setButtonText({
				...buttonText,
				projectItem: projectItemUpdatedValue,
				bugItem: bugItemUpdatedValue,
			});
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
	]);

	// Updates buttonState
	useEffect(() => {
		const newButtonLingerValues = {
			projectList:
				!buttonState.projectListShouldLingerForFadeOut &&
				!buttonDisplayLogic.projectList &&
				buttonState.projectListShouldDisplay,
			projectItem:
				!buttonState.projectItemShouldLingerForFadeOut &&
				!buttonDisplayLogic.projectItem &&
				buttonState.projectItemShouldDisplay,
			bugList:
				!buttonState.bugListShouldLingerForFadeOut &&
				!buttonDisplayLogic.bugList &&
				buttonState.bugListShouldDisplay,
			bugItem:
				!buttonState.bugItemShouldLingerForFadeOut &&
				!buttonDisplayLogic.bugItem &&
				buttonState.bugItemShouldDisplay,
		};

		setbuttonState({
			projectListShouldDisplay:
				buttonDisplayLogic.projectList || newButtonLingerValues.projectList,
			projectListShouldLingerForFadeOut: newButtonLingerValues.projectList,
			projectListShouldBeOpen: buttonOpenLogic.projectList,
			projectItemShouldDisplay:
				buttonDisplayLogic.projectItem || newButtonLingerValues.projectItem,
			projectItemShouldLingerForFadeOut: newButtonLingerValues.projectItem,
			projectItemShouldBeOpen: buttonOpenLogic.projectItem,
			bugListShouldDisplay:
				buttonDisplayLogic.bugList || newButtonLingerValues.bugList,
			bugListShouldLingerForFadeOut: newButtonLingerValues.bugList,
			bugListShouldBeOpen: buttonOpenLogic.bugList,
			bugItemShouldDisplay:
				buttonDisplayLogic.bugItem || newButtonLingerValues.bugItem,
			bugItemShouldLingerForFadeOut: newButtonLingerValues.bugItem,
			bugItemShouldBeOpen: buttonOpenLogic.bugItem,
		});
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay,
	]);

	// Updates breadcrumbSizes
	useEffect(() => {
		let navbarBreadcrumbElement = document.getElementsByClassName(
			"js-navbar-breadcrumb"
		)[0];

		let navbarBreadcrumbButtonElements =
			navbarBreadcrumbElement.querySelectorAll(".breadcrumb-button");

		let realBreadcrumbButtonWidths = [];

		navbarBreadcrumbButtonElements.forEach((element, index) => {
			realBreadcrumbButtonWidths[index] = getElementSize(element).width;
			element.style.width = "auto";
		});

		let navbarBreadcrumbDividerElement = navbarBreadcrumbElement.querySelector(
			".breadcrumb-divider"
		);

		let newDividerWidth = 0;

		if (
			navbarBreadcrumbDividerElement !== null &&
			(breadcrumbSizes.dividerWidth === null ||
				breadcrumbSizes.dividerWidth === 0)
		) {
			const realDividerClassName = navbarBreadcrumbDividerElement.className;
			// Temporarily ensures divider has default padding before measuring size
			removeAllInstancesOfClassName(
				navbarBreadcrumbDividerElement,
				"breadcrumb-divider--zero-padding"
			);
			newDividerWidth = getElementSize(navbarBreadcrumbDividerElement).width;
			navbarBreadcrumbDividerElement.className = realDividerClassName;
		}

		setBreadcrumbSizes({
			projectListButtonWidth:
				navbarBreadcrumbButtonElements[0] === undefined
					? 0
					: breadcrumbSizes.projectListButtonWidth !== null &&
					  breadcrumbSizes.projectListButtonWidth !== 0
					? breadcrumbSizes.projectListButtonWidth
					: getElementSize(navbarBreadcrumbButtonElements[0]).width,
			projectItemButtonWidth:
				navbarBreadcrumbButtonElements[1] === undefined
					? 0
					: getElementSize(navbarBreadcrumbButtonElements[1]).width,
			bugListButtonWidth:
				navbarBreadcrumbButtonElements[2] === undefined
					? 0
					: breadcrumbSizes.bugListButtonWidth !== null &&
					  breadcrumbSizes.bugListButtonWidth !== 0
					? breadcrumbSizes.bugListButtonWidth
					: getElementSize(navbarBreadcrumbButtonElements[2]).width,
			bugItemButtonWidth:
				navbarBreadcrumbButtonElements[3] === undefined
					? 0
					: getElementSize(navbarBreadcrumbButtonElements[3]).width,
			dividerWidth:
				navbarBreadcrumbDividerElement === undefined
					? 0
					: breadcrumbSizes.dividerWidth !== null &&
					  breadcrumbSizes.dividerWidth !== 0
					? breadcrumbSizes.dividerWidth
					: newDividerWidth,
		});

		navbarBreadcrumbButtonElements.forEach((element, index) => {
			element.style.width = realBreadcrumbButtonWidths[index];
		});
		// eslint-disable-next-line
	}, [
		buttonText,
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
	]);

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
					(buttonDisplayLogic.projectList
						? breadcrumbSizes.projectListButtonWidth
						: 0) +
					(buttonDisplayLogic.projectItem
						? breadcrumbSizes.projectItemButtonWidth
						: 0) +
					(buttonDisplayLogic.bugList
						? breadcrumbSizes.bugListButtonWidth
						: 0) +
					(buttonDisplayLogic.bugItem
						? breadcrumbSizes.bugItemButtonWidth
						: 0) +
					breadcrumbSizes.dividerWidth *
						(buttonDisplayLogic.projectItem +
							buttonDisplayLogic.bugList +
							buttonDisplayLogic.bugItem) <
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

	// Creates collapsing/expanding visual effect by setting breadcrumb button/divider widths
	useEffect(() => {
		if (
			breadcrumbStyles.dividerPaddingLeft !== null &&
			breadcrumbStyles.dividerPaddingRight !== null &&
			breadcrumbSizes.projectListButtonWidth !== null &&
			breadcrumbSizes.projectItemButtonWidth !== null &&
			breadcrumbSizes.bugListButtonWidth !== null &&
			breadcrumbSizes.bugItemButtonWidth !== null
		) {
			let navbarBreadcrumbElement = document.getElementsByClassName(
				"js-navbar-breadcrumb"
			)[0];

			let navbarBreadcrumbButtonElements =
				navbarBreadcrumbElement.querySelectorAll(".breadcrumb-button");

			let navbarBreadcrumbDividerElements =
				navbarBreadcrumbElement.querySelectorAll(".breadcrumb-divider");

			if (canAllButtonsDisplay) {
				navbarBreadcrumbButtonElements.forEach((element, index) => {
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
		}
		// eslint-disable-next-line
	}, [breadcrumbStyles, breadcrumbSizes, canAllButtonsDisplay]);

	const getDividerIcon = () => {
		return <FontAwesomeIcon icon={faChevronRight} size="xs" />;
	};

	const getBreadcrumbButtonClassNames = (
		isShouldLingerForFadeOut,
		shouldBeOpened
	) => {
		return (
			"breadcrumb-button" +
			getNavbarBreadcrumbComponentButtonAndDividerElementTextColorClassNameForLightOrDarkMode(
				reduxState[ACCOUNT_CONTAINER].settings.dark_mode
			) +
			(canAllButtonsDisplay ? "" : " breadcrumb-button--cursor-default") +
			(!isShouldLingerForFadeOut && (canAllButtonsDisplay || shouldBeOpened)
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

	const getBreadcrumbDividerClassNames = (isShouldLingerForFadeOut) => {
		return (
			"breadcrumb-divider" +
			getNavbarBreadcrumbComponentButtonAndDividerElementTextColorClassNameForLightOrDarkMode(
				reduxState[ACCOUNT_CONTAINER].settings.dark_mode
			) +
			(!isShouldLingerForFadeOut && canAllButtonsDisplay
				? " breadcrumb-divider--fade-in"
				: " breadcrumb-divider--fade-out") +
			(canAllButtonsDisplay ? "" : " breadcrumb-divider--zero-padding")
		);
	};

	return (
		<div className="navbar-breadcrumb-component js-navbar-breadcrumb">
			{!buttonState.projectListShouldDisplay ? null : (
				<div
					className={getBreadcrumbButtonClassNames(
						buttonState.projectListShouldLingerForFadeOut,
						buttonState.projectListShouldBeOpen
					)}
					aria-label={buttonText.projectList}
					aria-hidden={
						buttonState.projectListShouldLingerForFadeOut ||
						(!canAllButtonsDisplay && !buttonState.projectListShouldBeOpen)
					}
					onClick={
						!canAllButtonsDisplay ||
						buttonState.projectListShouldLingerForFadeOut
							? null
							: () => switchToProjectsListView(reduxState, dispatch)
					}
				>
					{buttonText.projectList}
				</div>
			)}
			{!buttonState.projectItemShouldDisplay ? null : (
				<div
					className={getBreadcrumbDividerClassNames(
						buttonState.projectItemShouldLingerForFadeOut
					)}
					aria-hidden={true}
				>
					{getDividerIcon()}
				</div>
			)}
			{!buttonState.projectItemShouldDisplay ? null : (
				<div
					className={getBreadcrumbButtonClassNames(
						buttonState.projectItemShouldLingerForFadeOut,
						buttonState.projectItemShouldBeOpen
					)}
					aria-label={buttonText.projectItem}
					aria-hidden={
						buttonState.projectItemShouldLingerForFadeOut ||
						(!canAllButtonsDisplay && !buttonState.projectItemShouldBeOpen)
					}
					onClick={
						!canAllButtonsDisplay ||
						buttonState.projectItemShouldLingerForFadeOut
							? null
							: () => switchToProjectsItemView(reduxState, dispatch)
					}
				>
					{buttonText.projectItem}
				</div>
			)}
			{!buttonState.bugListShouldDisplay ? null : (
				<div
					className={getBreadcrumbDividerClassNames(
						buttonState.bugListShouldLingerForFadeOut
					)}
					aria-hidden={true}
				>
					{getDividerIcon()}
				</div>
			)}
			{!buttonState.bugListShouldDisplay ? null : (
				<div
					className={getBreadcrumbButtonClassNames(
						buttonState.bugListShouldLingerForFadeOut,
						buttonState.bugListShouldBeOpen
					)}
					aria-label={buttonText.bugList}
					aria-hidden={
						buttonState.bugListShouldLingerForFadeOut ||
						(!canAllButtonsDisplay && !buttonState.bugListShouldBeOpen)
					}
					onClick={
						!canAllButtonsDisplay || buttonState.bugListShouldLingerForFadeOut
							? null
							: () => switchToBugsListView(reduxState, dispatch)
					}
				>
					{buttonText.bugList}
				</div>
			)}
			{!buttonState.bugItemShouldDisplay ? null : (
				<div
					className={getBreadcrumbDividerClassNames(
						buttonState.bugItemShouldLingerForFadeOut
					)}
					aria-hidden={true}
				>
					{getDividerIcon()}
				</div>
			)}
			{!buttonState.bugItemShouldDisplay ? null : (
				<div
					className={getBreadcrumbButtonClassNames(
						buttonState.bugItemShouldLingerForFadeOut,
						buttonState.bugItemShouldBeOpen
					)}
					aria-label={buttonText.bugItem}
					aria-hidden={
						buttonState.bugItemShouldLingerForFadeOut ||
						(!canAllButtonsDisplay && !buttonState.bugItemShouldBeOpen)
					}
					onClick={
						!canAllButtonsDisplay || buttonState.bugItemShouldLingerForFadeOut
							? null
							: () => switchToBugsItemView(reduxState, dispatch)
					}
				>
					{buttonText.bugItem}
				</div>
			)}
		</div>
	);
}
