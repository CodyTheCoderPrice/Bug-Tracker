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

	const [buttonStatus, setButtonStatus] = useState({
		projectListShouldExistInDom: buttonDisplayLogic.projectList,
		projectListShouldLingerForFadeOut: false,
		projectListShouldBeOpen: buttonOpenLogic.projectList,
		projectItemShouldExistInDom: buttonDisplayLogic.projectItem,
		projectItemShouldLingerForFadeOut: false,
		projectItemShouldBeOpen: buttonOpenLogic.projectItem,
		bugListShouldExistInDom: buttonDisplayLogic.bugList,
		bugListShouldLingerForFadeOut: false,
		bugListShouldBeOpen: buttonOpenLogic.bugList,
		bugItemShouldExistInDom: buttonDisplayLogic.bugItem,
		bugItemShouldLingerForFadeOut: false,
		bugItemShouldBeOpen: buttonOpenLogic.bugItem,
	});

	const [navbarChildSizes, setNavbarChildSizes] = useState({
		projectListButtonWidth: null,
		projectItemButtonWidth: null,
		bugListButtonWidth: null,
		bugItemButtonWidth: null,
		dividerWidth: null,
		accountButtonWidth: null,
	});

	const [navbarChildStyles, setNavbarChildStyles] = useState({
		breadcrumbPaddingLeft: null,
		breadcrumbPaddingRight: null,
		dividerPaddingLeft: null,
		dividerPaddingRight: null,
	});

	const [canAllButtonsDisplay, setCanAllButtonsDisplay] = useState(true);

	// Updates buttonText
	useEffect(() => {
		// Keeps projectItem/bugItem the same when button is closed so it can
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
			const causeFadeIn = (element) => {
				const storedClassName = element.className;

				// Removing classNames so fade-in re-trigger is possible
				removeAllInstancesOfClassName(element, "breadcrumb-button--fade-in");
				removeAllInstancesOfClassName(element, "breadcrumb-button--fade-out");

				// Trigger DOM reflow so fade-in re-trigger is possible
				void element.offsetHeight;

				element.className = storedClassName.includes(
					"breadcrumb-button--fade-in"
				)
					? storedClassName
					: storedClassName + " breadcrumb-button--fade-in";
			};

			if (
				buttonStatus.projectItemShouldExistInDom &&
				buttonText.projectItem !== projectItemUpdatedValue
			) {
				causeFadeIn(
					document.getElementsByClassName(
						"js-navbar-breadcrumb-button-project-item"
					)[0]
				);
			}
			if (
				buttonStatus.bugItemShouldExistInDom &&
				buttonText.bugItem !== bugItemUpdatedValue
			) {
				causeFadeIn(
					document.getElementsByClassName(
						"js-navbar-breadcrumb-button-bug-item"
					)[0]
				);
			}

			setButtonText({
				...buttonText,
				projectItem: projectItemUpdatedValue,
				bugItem: bugItemUpdatedValue,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
	]);

	// Updates buttonStatus
	useEffect(() => {
		const projectListLingerLogic =
			buttonStatus.projectListShouldExistInDom &&
			!buttonStatus.projectListShouldLingerForFadeOut &&
			!buttonDisplayLogic.projectList;

		const projectItemLingerLogic =
			buttonStatus.projectItemShouldExistInDom &&
			!buttonStatus.projectItemShouldLingerForFadeOut &&
			!buttonDisplayLogic.projectItem;

		const bugListLingerLogic =
			buttonStatus.bugListShouldExistInDom &&
			!buttonStatus.bugListShouldLingerForFadeOut &&
			!buttonDisplayLogic.bugList;

		const bugItemLingerLogic =
			buttonStatus.bugItemShouldExistInDom &&
			!buttonStatus.bugItemShouldLingerForFadeOut &&
			!buttonDisplayLogic.bugItem;

		setButtonStatus({
			projectListShouldExistInDom:
				buttonDisplayLogic.projectList || projectListLingerLogic,
			projectListShouldLingerForFadeOut: projectListLingerLogic,
			projectListShouldBeOpen: buttonOpenLogic.projectList,
			projectItemShouldExistInDom:
				buttonDisplayLogic.projectItem || projectItemLingerLogic,
			projectItemShouldLingerForFadeOut: projectItemLingerLogic,
			projectItemShouldBeOpen: buttonOpenLogic.projectItem,
			bugListShouldExistInDom: buttonDisplayLogic.bugList || bugListLingerLogic,
			bugListShouldLingerForFadeOut: bugListLingerLogic,
			bugListShouldBeOpen: buttonOpenLogic.bugList,
			bugItemShouldExistInDom: buttonDisplayLogic.bugItem || bugItemLingerLogic,
			bugItemShouldLingerForFadeOut: bugItemLingerLogic,
			bugItemShouldBeOpen: buttonOpenLogic.bugItem,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[PROJECT_CONTAINER].componentsDisplay,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[BUG_CONTAINER].componentsDisplay,
	]);

	// Updates navbarChildSizes
	useEffect(() => {
		let navbarBreadcrumbElement = document.getElementsByClassName(
			"js-navbar-breadcrumb"
		)[0];

		let navbarBreadcrumbButtonElements =
			navbarBreadcrumbElement.querySelectorAll(".breadcrumb-button");

		let storedBreadcrumbButtonWidths = [];

		navbarBreadcrumbButtonElements.forEach((element, index) => {
			storedBreadcrumbButtonWidths[index] = getElementSize(element).width;
			element.style.width = "auto";
		});

		let navbarBreadcrumbDividerElement = navbarBreadcrumbElement.querySelector(
			".breadcrumb-divider"
		);

		let newDividerWidth = 0;

		if (
			navbarBreadcrumbDividerElement !== null &&
			(navbarChildSizes.dividerWidth === null ||
				navbarChildSizes.dividerWidth === 0)
		) {
			const storedDividerClassName = navbarBreadcrumbDividerElement.className;
			// Temporarily ensures divider has default padding before measuring size
			removeAllInstancesOfClassName(
				navbarBreadcrumbDividerElement,
				"breadcrumb-divider--zero-padding"
			);
			newDividerWidth = getElementSize(navbarBreadcrumbDividerElement).width;
			navbarBreadcrumbDividerElement.className = storedDividerClassName;
		}

		setNavbarChildSizes({
			projectListButtonWidth:
				navbarBreadcrumbButtonElements[0] === undefined
					? 0
					: navbarChildSizes.projectListButtonWidth !== null &&
					  navbarChildSizes.projectListButtonWidth !== 0
					? navbarChildSizes.projectListButtonWidth
					: getElementSize(navbarBreadcrumbButtonElements[0]).width,
			projectItemButtonWidth:
				navbarBreadcrumbButtonElements[1] === undefined
					? 0
					: getElementSize(navbarBreadcrumbButtonElements[1]).width,
			bugListButtonWidth:
				navbarBreadcrumbButtonElements[2] === undefined
					? 0
					: navbarChildSizes.bugListButtonWidth !== null &&
					  navbarChildSizes.bugListButtonWidth !== 0
					? navbarChildSizes.bugListButtonWidth
					: getElementSize(navbarBreadcrumbButtonElements[2]).width,
			bugItemButtonWidth:
				navbarBreadcrumbButtonElements[3] === undefined
					? 0
					: getElementSize(navbarBreadcrumbButtonElements[3]).width,
			dividerWidth:
				navbarBreadcrumbDividerElement === undefined
					? 0
					: navbarChildSizes.dividerWidth !== null &&
					  navbarChildSizes.dividerWidth !== 0
					? navbarChildSizes.dividerWidth
					: newDividerWidth,
			accountButtonWidth:
				navbarChildSizes.accountButtonWidth !== null
					? navbarChildSizes.accountButtonWidth
					: getElementSize(
							document.getElementsByClassName(
								"js-navbar-account-button-container"
							)[0]
					  ).width,
		});

		navbarBreadcrumbButtonElements.forEach((element, index) => {
			element.style.width = storedBreadcrumbButtonWidths[index];
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buttonText, buttonStatus]);

	// Sets navbarChildStyles
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

		setNavbarChildStyles({
			breadcrumbPaddingLeft: stripNonDigits(
				navbarBreadcrumbElementSyle.paddingLeft
			),
			breadcrumbPaddingRight: stripNonDigits(
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Updates canAllButtonsDisplay
	useEffect(() => {
		if (
			navbarChildStyles.breadcrumbPaddingLeft !== null &&
			navbarChildStyles.breadcrumbPaddingRight !== null &&
			navbarChildSizes.accountButtonWidth !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null
		) {
			setCanAllButtonsDisplay(
				navbarChildStyles.breadcrumbPaddingLeft +
					navbarChildStyles.breadcrumbPaddingRight +
					(buttonDisplayLogic.projectList
						? navbarChildSizes.projectListButtonWidth
						: 0) +
					(buttonDisplayLogic.projectItem
						? navbarChildSizes.projectItemButtonWidth
						: 0) +
					(buttonDisplayLogic.bugList
						? navbarChildSizes.bugListButtonWidth
						: 0) +
					(buttonDisplayLogic.bugItem
						? navbarChildSizes.bugItemButtonWidth
						: 0) +
					navbarChildSizes.dividerWidth *
						(buttonDisplayLogic.projectItem +
							buttonDisplayLogic.bugList +
							buttonDisplayLogic.bugItem) <
					reduxState[SIZE_CONTAINER].variables.navbar.width -
						navbarChildSizes.accountButtonWidth
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		navbarChildStyles,
		navbarChildSizes,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[SIZE_CONTAINER].variables,
	]);

	// Creates collapsing/expanding visual effect by setting breadcrumb button/divider widths
	useEffect(() => {
		if (
			navbarChildStyles.dividerPaddingLeft !== null &&
			navbarChildStyles.dividerPaddingRight !== null &&
			navbarChildSizes.projectListButtonWidth !== null &&
			navbarChildSizes.projectItemButtonWidth !== null &&
			navbarChildSizes.bugListButtonWidth !== null &&
			navbarChildSizes.bugItemButtonWidth !== null
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
								navbarChildSizes.projectListButtonWidth + "px";
							break;
						case 1:
							element.style.width =
								navbarChildSizes.projectItemButtonWidth + "px";
							break;
						case 2:
							element.style.width = navbarChildSizes.bugListButtonWidth + "px";
							break;
						case 3:
							element.style.width = navbarChildSizes.bugItemButtonWidth + "px";
							break;
						default:
							break;
					}
				});

				navbarBreadcrumbDividerElements.forEach((element) => {
					element.style.width =
						navbarChildSizes.dividerWidth -
						navbarChildStyles.dividerPaddingLeft -
						navbarChildStyles.dividerPaddingRight +
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navbarChildStyles, navbarChildSizes, canAllButtonsDisplay]);

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
			{!buttonStatus.projectListShouldExistInDom ? null : (
				<div
					className={getBreadcrumbButtonClassNames(
						buttonStatus.projectListShouldLingerForFadeOut,
						buttonStatus.projectListShouldBeOpen
					)}
					aria-label={buttonText.projectList}
					aria-hidden={
						buttonStatus.projectListShouldLingerForFadeOut ||
						(!canAllButtonsDisplay && !buttonStatus.projectListShouldBeOpen)
					}
					onClick={
						!canAllButtonsDisplay ||
						buttonStatus.projectListShouldLingerForFadeOut
							? null
							: () => switchToProjectsListView(reduxState, dispatch)
					}
				>
					{buttonText.projectList}
				</div>
			)}
			{!buttonStatus.projectItemShouldExistInDom ? null : (
				<div
					className={getBreadcrumbDividerClassNames(
						buttonStatus.projectItemShouldLingerForFadeOut
					)}
					aria-hidden={true}
				>
					{getDividerIcon()}
				</div>
			)}
			{!buttonStatus.projectItemShouldExistInDom ? null : (
				<div
					className={
						getBreadcrumbButtonClassNames(
							buttonStatus.projectItemShouldLingerForFadeOut,
							buttonStatus.projectItemShouldBeOpen
						) + " js-navbar-breadcrumb-button-project-item"
					}
					aria-label={buttonText.projectItem}
					aria-hidden={
						buttonStatus.projectItemShouldLingerForFadeOut ||
						(!canAllButtonsDisplay && !buttonStatus.projectItemShouldBeOpen)
					}
					onClick={
						!canAllButtonsDisplay ||
						buttonStatus.projectItemShouldLingerForFadeOut
							? null
							: () => switchToProjectsItemView(reduxState, dispatch)
					}
				>
					{buttonText.projectItem}
				</div>
			)}
			{!buttonStatus.bugListShouldExistInDom ? null : (
				<div
					className={getBreadcrumbDividerClassNames(
						buttonStatus.bugListShouldLingerForFadeOut
					)}
					aria-hidden={true}
				>
					{getDividerIcon()}
				</div>
			)}
			{!buttonStatus.bugListShouldExistInDom ? null : (
				<div
					className={getBreadcrumbButtonClassNames(
						buttonStatus.bugListShouldLingerForFadeOut,
						buttonStatus.bugListShouldBeOpen
					)}
					aria-label={buttonText.bugList}
					aria-hidden={
						buttonStatus.bugListShouldLingerForFadeOut ||
						(!canAllButtonsDisplay && !buttonStatus.bugListShouldBeOpen)
					}
					onClick={
						!canAllButtonsDisplay || buttonStatus.bugListShouldLingerForFadeOut
							? null
							: () => switchToBugsListView(reduxState, dispatch)
					}
				>
					{buttonText.bugList}
				</div>
			)}
			{!buttonStatus.bugItemShouldExistInDom ? null : (
				<div
					className={getBreadcrumbDividerClassNames(
						buttonStatus.bugItemShouldLingerForFadeOut
					)}
					aria-hidden={true}
				>
					{getDividerIcon()}
				</div>
			)}
			{!buttonStatus.bugItemShouldExistInDom ? null : (
				<div
					className={
						getBreadcrumbButtonClassNames(
							buttonStatus.bugItemShouldLingerForFadeOut,
							buttonStatus.bugItemShouldBeOpen
						) + " js-navbar-breadcrumb-button-bug-item"
					}
					aria-label={buttonText.bugItem}
					aria-hidden={
						buttonStatus.bugItemShouldLingerForFadeOut ||
						(!canAllButtonsDisplay && !buttonStatus.bugItemShouldBeOpen)
					}
					onClick={
						!canAllButtonsDisplay || buttonStatus.bugItemShouldLingerForFadeOut
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
