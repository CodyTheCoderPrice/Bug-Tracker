import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";
import {
	getElementSize,
	toggleClassName,
	getCommonBrighterBackgroundColorClassNameForTheme,
	switchToProjectsListView,
	switchToBugsListView,
	getSearchedFilteredSortedList,
	getCommonElementToolTipBackgroundTextColorClassNameForLocationWithLightOrDarkMode,
} from "../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faBug } from "@fortawesome/free-solid-svg-icons";
// Components
import NavPanelButtonListSubItem from "./NavPanelButtonListSubItem";

export default function NavPanelButtonList() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const shouldAnyProjectSubItemsDisplay =
		reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
		null;

	const shouldAllProjectSubItemsDisplay =
		shouldAnyProjectSubItemsDisplay &&
		(reduxState[PROJECT_CONTAINER].componentsDisplay
			.listViewComponentShouldDisplay ||
			reduxState[PROJECT_CONTAINER].componentsDisplay
				.itemViewComponentShouldDisplay);

	const shouldBugListButtonBeClickable =
		reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
		null;

	const shouldAllBugSubItemsDisplay =
		reduxState[BUG_CONTAINER].componentsDisplay
			.listViewComponentShouldDisplay ||
		reduxState[BUG_CONTAINER].componentsDisplay.itemViewComponentShouldDisplay;

	// Resize overflow-container height to fit the nav-panel when there is not
	// ...enough room
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.navPanel !== null &&
			reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight !== null
		) {
			let projectSubOverflowContainerElement = document.getElementsByClassName(
				"js-project-sub-overflow-container"
			)[0];

			if (shouldAllProjectSubItemsDisplay) {
				const adjustedNavPanelHeight =
					reduxState[SIZE_CONTAINER].variables.navPanel.height -
					reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.listButtonWithTopSpacingMarginTop -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.listButtonWithBottomSpacingMarginBottom -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarMarginTop -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarMarginBottom -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarPaddingTop -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarPaddingBottom -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles.listButtonHeight *
						2;

				// Using different element as height will be "auto" and natural
				// ...size can be measured
				let allProjectButtonListSubItems = document.getElementsByClassName(
					"js-all-project-button-list-sub-items"
				)[0];

				const allProjectButtonListSubItemsHeight = getElementSize(
					allProjectButtonListSubItems
				).height;

				if (adjustedNavPanelHeight < allProjectButtonListSubItemsHeight) {
					projectSubOverflowContainerElement.style.height =
						adjustedNavPanelHeight + "px";

					toggleClassName(
						true,
						projectSubOverflowContainerElement,
						"sub-overflow-container--scrollbar-present"
					);
				} else {
					projectSubOverflowContainerElement.style.height =
						allProjectButtonListSubItemsHeight + "px";

					toggleClassName(
						false,
						projectSubOverflowContainerElement,
						"sub-overflow-container--scrollbar-present"
					);
				}
			} else {
				// Causes element to transition out
				projectSubOverflowContainerElement.style.height =
					shouldAnyProjectSubItemsDisplay
						? reduxState[SIZE_CONTAINER].constants
								.navPanelButtonListComponentSizesAndStyles.listButtonHeight +
						  "px"
						: "0px";

				toggleClassName(
					false,
					projectSubOverflowContainerElement,
					"sub-overflow-container--scrollbar-present"
				);
			}

			let bugSubOverflowContainerElement = document.getElementsByClassName(
				"js-bug-sub-overflow-container"
			)[0];

			if (shouldAllBugSubItemsDisplay) {
				const adjustedNavPanelHeight =
					reduxState[SIZE_CONTAINER].variables.navPanel.height -
					reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.listButtonWithTopSpacingMarginTop -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarMarginTop -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarAndForBugsMarginBottom -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarPaddingTop -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarAndForBugsPaddingBottom -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles.listButtonHeight *
						3;

				// Using different element as height will be "auto" and natural
				// ...size can be measured
				let allBugButtonListSubItems = document.getElementsByClassName(
					"js-all-bug-button-list-sub-items"
				)[0];

				const allBugButtonListSubItemsHeight = getElementSize(
					allBugButtonListSubItems
				).height;

				if (adjustedNavPanelHeight < allBugButtonListSubItemsHeight) {
					toggleClassName(
						true,
						bugSubOverflowContainerElement,
						"sub-overflow-container--scrollbar-present sub-overflow-container--for-bugs"
					);
				} else {
					toggleClassName(
						false,
						bugSubOverflowContainerElement,
						"sub-overflow-container--scrollbar-present sub-overflow-container--for-bugs"
					);
				}

				// Either way, set to adjustNavPanelHeight as no other
				// ...element's position is affect by this element
				bugSubOverflowContainerElement.style.height =
					adjustedNavPanelHeight + "px";
			} else {
				// Causes element to transition out
				bugSubOverflowContainerElement.style.height = "0px";

				toggleClassName(
					false,
					bugSubOverflowContainerElement,
					"sub-overflow-container--scrollbar-present sub-overflow-container--for-bugs"
				);
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants,
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].list,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].list,
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].searchFilterSort,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].searchFilterSort,
		shouldAllProjectSubItemsDisplay,
		shouldAllBugSubItemsDisplay,
	]);

	return (
		<div className="nav-panel-button-list-component js-nav-panel-button-list-component">
			<div
				className={
					"list-button list-button--top-spacing js-projects-list-button" +
					(reduxState[PROJECT_CONTAINER].componentsDisplay
						.listViewComponentShouldDisplay === false
						? ""
						: " list-button--selected" +
						  getCommonBrighterBackgroundColorClassNameForTheme(
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
						  ))
				}
				aria-label="Projects"
				onClick={() => switchToProjectsListView(reduxState, dispatch)}
			>
				<FontAwesomeIcon
					icon={faSuitcase}
					className="list-button__icon"
					aria-hidden="true"
				/>
				Projects
			</div>
			<div
				className={
					"sub-overflow-container js-project-sub-overflow-container" +
					(shouldAnyProjectSubItemsDisplay
						? " sub-overflow-container--fade-in"
						: " sub-overflow-container--fade-out")
				}
			>
				{!shouldAnyProjectSubItemsDisplay ? null : shouldAllProjectSubItemsDisplay ? (
					<div className="js-all-project-button-list-sub-items">
						{getSearchedFilteredSortedList(reduxState, PROJECT_CONTAINER).map(
							(item, idx) => {
								return (
									<NavPanelButtonListSubItem
										key={idx}
										item={item}
										reduxContainerName={PROJECT_CONTAINER}
									/>
								);
							}
						)}
					</div>
				) : (
					<NavPanelButtonListSubItem
						item={
							reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem
						}
						reduxContainerName={PROJECT_CONTAINER}
					/>
				)}
			</div>
			<div
				className={
					"list-button" +
					(shouldBugListButtonBeClickable ? "" : " list-button--unclickable") +
					(shouldAllBugSubItemsDisplay ? "" : " list-button--bottom-spacing") +
					(reduxState[BUG_CONTAINER].componentsDisplay
						.listViewComponentShouldDisplay === false
						? ""
						: " list-button--selected" +
						  getCommonBrighterBackgroundColorClassNameForTheme(
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
						  ))
				}
				aria-label="Bugs"
				onClick={
					shouldBugListButtonBeClickable
						? () => switchToBugsListView(reduxState, dispatch)
						: null
				}
			>
				<span
					className={
						"list-button__tooltip-container" +
						(shouldBugListButtonBeClickable
							? ""
							: " list-button--unclickable" +
							  getCommonElementToolTipBackgroundTextColorClassNameForLocationWithLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
									"right"
							  ))
					}
					data-tooltip={"No project selected"}
				>
					<FontAwesomeIcon
						icon={faBug}
						className="list-button__icon"
						aria-hidden="true"
					/>
					Bugs
				</span>
			</div>
			<div
				className={
					"sub-overflow-container js-bug-sub-overflow-container" +
					(shouldAllBugSubItemsDisplay
						? " sub-overflow-container--fade-in"
						: " sub-overflow-container--fade-out")
				}
			>
				{reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
				null ? null : (
					<div className="js-all-bug-button-list-sub-items">
						{getSearchedFilteredSortedList(reduxState, BUG_CONTAINER).map(
							(item, idx) => {
								return (
									<NavPanelButtonListSubItem
										key={idx}
										item={item}
										reduxContainerName={BUG_CONTAINER}
									/>
								);
							}
						)}
					</div>
				)}
			</div>
		</div>
	);
}
