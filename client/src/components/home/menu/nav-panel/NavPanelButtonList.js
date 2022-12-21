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
	isVerticalScrollbarPresent,
	toggleClassName,
	getCommonBrighterBackgroundColorClassNameForTheme,
	switchToProjectsListView,
	switchToBugsListView,
	getSearchedFilteredSortedList,
} from "../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faBug } from "@fortawesome/free-solid-svg-icons";
// Components
import NavPanelButtonListSubItem from "./NavPanelButtonListSubItem";

export default function NavPanelButtonList() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const shouldAllProjectSubItemsDisplay =
		reduxState[PROJECT_CONTAINER].componentsDisplay
			.listViewComponentShouldDisplay ||
		reduxState[PROJECT_CONTAINER].componentsDisplay
			.itemViewComponentShouldDisplay;

	const shouldBugListButtonDisplay =
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
			(shouldAllProjectSubItemsDisplay || shouldAllBugSubItemsDisplay) &&
			reduxState[SIZE_CONTAINER].variables.navPanel !== null &&
			reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight !== null
		) {
			if (shouldAllProjectSubItemsDisplay) {
				let projectSubOverflowContainerElement =
					document.getElementsByClassName(
						"js-project-sub-overflow-container"
					)[0];

				const adjustedNavPanelHeight =
					reduxState[SIZE_CONTAINER].variables.navPanel.height -
					reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.listButtonWithTopSpacingMaringTop -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.listButtonWithBottomSpacingMaringBottom -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarMarginTop -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarAndBottomSpacingMarginBottom -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarPaddingTop -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.subOverflowContainerWithScrollbarPaddingBottom -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles.listButtonHeight *
						2;

				// Resets height so natural height can be measured
				projectSubOverflowContainerElement.style.removeProperty("height");

				if (
					adjustedNavPanelHeight <
					getElementSize(projectSubOverflowContainerElement).height
				) {
					projectSubOverflowContainerElement.style.height =
						adjustedNavPanelHeight + "px";
				}

				toggleClassName(
					isVerticalScrollbarPresent(projectSubOverflowContainerElement),
					projectSubOverflowContainerElement,
					"sub-overflow-container--scrollbar-present sub-overflow-container--bottom-spacing"
				);
			} else if (shouldAllBugSubItemsDisplay) {
				let bugSubOverflowContainerElement = document.getElementsByClassName(
					"js-bug-sub-overflow-container"
				)[0];

				const adjustedNavPanelHeight =
					reduxState[SIZE_CONTAINER].variables.navPanel.height -
					reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight -
					reduxState[SIZE_CONTAINER].constants
						.navPanelButtonListComponentSizesAndStyles
						.listButtonWithTopSpacingMaringTop -
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
						3;

				bugSubOverflowContainerElement.style.height =
					adjustedNavPanelHeight + "px";

				toggleClassName(
					isVerticalScrollbarPresent(bugSubOverflowContainerElement),
					bugSubOverflowContainerElement,
					"sub-overflow-container--scrollbar-present"
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
			{shouldAllProjectSubItemsDisplay ? (
				<div className="sub-overflow-container js-project-sub-overflow-container">
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
						reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
					}
					reduxContainerName={PROJECT_CONTAINER}
				/>
			)}
			{!shouldBugListButtonDisplay ? null : (
				<div>
					<div
						className={
							"list-button" +
							(shouldAllBugSubItemsDisplay
								? ""
								: " list-button--bottom-spacing") +
							(reduxState[BUG_CONTAINER].componentsDisplay
								.listViewComponentShouldDisplay === false
								? ""
								: " list-button--selected" +
								  getCommonBrighterBackgroundColorClassNameForTheme(
										reduxState[ACCOUNT_CONTAINER].settings.theme_color
								  ))
						}
						aria-label="Bugs"
						onClick={() => switchToBugsListView(reduxState, dispatch)}
					>
						<FontAwesomeIcon
							icon={faBug}
							className="list-button__icon"
							aria-hidden="true"
						/>
						Bugs
					</div>
				</div>
			)}
			{!shouldAllBugSubItemsDisplay ? null : (
				<div className="sub-overflow-container js-bug-sub-overflow-container">
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
	);
}
