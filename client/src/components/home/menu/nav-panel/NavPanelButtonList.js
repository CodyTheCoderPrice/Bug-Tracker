import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";
import {
	getElementSize,
	stripNonDigits,
	getElementStyle,
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

	// Optimizes useEffect by storing constant element sizes and styles
	const [regularlyUsedSizesAndStyles, setRegularlyUsedSizesAndStyles] =
		useState(null);

	const shouldOtherButtonsDisplay =
		reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
		null;

	const shouldAllProjectSubItemsDisplay =
		reduxState[PROJECT_CONTAINER].componentsDisplay
			.listViewComponentShouldDisplay ||
		reduxState[PROJECT_CONTAINER].componentsDisplay
			.itemViewComponentShouldDisplay;

	const shouldAllBugSubItemsDisplay =
		!shouldAllProjectSubItemsDisplay &&
		reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem !== null;

	// Resize overflow-container height to fit the nav-panel when there is not
	// ...enough room
	useEffect(() => {
		if (
			shouldOtherButtonsDisplay &&
			reduxState[SIZE_CONTAINER].variables.navPanel !== null &&
			reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight !== null
		) {
			if (regularlyUsedSizesAndStyles === null) {
				let projectItemButton = document.getElementsByClassName(
					"js-projects-item-button"
				)[0];

				setRegularlyUsedSizesAndStyles({
					itemButtonheight: getElementSize(projectItemButton).height,
					constantSubractionValueForAdjustedHeight:
						reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight +
						stripNonDigits(getElementStyle(projectItemButton).marginTop) +
						reduxState[SIZE_CONTAINER].constants
							.navPanelButtonListComponentCriticalStyles
							.subOverflowContainerWithScrollbarMarginTop +
						reduxState[SIZE_CONTAINER].constants
							.navPanelButtonListComponentCriticalStyles
							.subOverflowContainerWithScrollbarMarginBottom +
						reduxState[SIZE_CONTAINER].constants
							.navPanelButtonListComponentCriticalStyles
							.subOverflowContainerWithScrollbarPaddingTop +
						reduxState[SIZE_CONTAINER].constants
							.navPanelButtonListComponentCriticalStyles
							.subOverflowContainerWithScrollbarPaddingBottom,
				});

				// Prevents crash since regularlyUsedSizesAndStyles will still
				// ...be null for remainder of this useEfffect iteration.
				return;
			}

			if (shouldAllProjectSubItemsDisplay) {
				let projectSubOverflowContainerElement =
					document.getElementsByClassName(
						"js-project-sub-over-flow-container"
					)[0];

				const adjustedNavPanelHeight =
					reduxState[SIZE_CONTAINER].variables.navPanel.height -
					regularlyUsedSizesAndStyles.constantSubractionValueForAdjustedHeight -
					regularlyUsedSizesAndStyles.itemButtonheight * 2;

				projectSubOverflowContainerElement.style.height =
					adjustedNavPanelHeight + "px";

				toggleClassName(
					isVerticalScrollbarPresent(projectSubOverflowContainerElement),
					projectSubOverflowContainerElement,
					"sub-over-flow-container--scrollbar-present"
				);
			} else if (shouldAllBugSubItemsDisplay) {
				let bugSubOverflowContainerElement = document.getElementsByClassName(
					"js-bug-sub-over-flow-container"
				)[0];

				const adjustedNavPanelHeight =
					reduxState[SIZE_CONTAINER].variables.navPanel.height -
					regularlyUsedSizesAndStyles.constantSubractionValueForAdjustedHeight -
					regularlyUsedSizesAndStyles.itemButtonheight * 3;

				bugSubOverflowContainerElement.style.height =
					adjustedNavPanelHeight + "px";

				console.log(
					reduxState[SIZE_CONTAINER].variables.navPanel.height +
						" - " +
						regularlyUsedSizesAndStyles.constantSubractionValueForAdjustedHeight +
						" - " +
						regularlyUsedSizesAndStyles.itemButtonheight * 3
				);

				toggleClassName(
					isVerticalScrollbarPresent(bugSubOverflowContainerElement),
					bugSubOverflowContainerElement,
					"sub-over-flow-container--scrollbar-present"
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
		regularlyUsedSizesAndStyles,
		shouldAllProjectSubItemsDisplay,
		shouldAllBugSubItemsDisplay,
	]);

	return (
		<div className="nav-panel-button-list-component">
			<div
				className={
					"item-button item-button--first js-projects-item-button" +
					(reduxState[PROJECT_CONTAINER].componentsDisplay
						.listViewComponentShouldDisplay === false
						? ""
						: " item--selected" +
						  getCommonBrighterBackgroundColorClassNameForTheme(
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
						  ))
				}
				aria-label="Projects"
				onClick={() => switchToProjectsListView(reduxState, dispatch)}
			>
				<FontAwesomeIcon
					icon={faSuitcase}
					className="item-button__icon"
					aria-hidden="true"
				/>
				Projects
			</div>
			{!shouldOtherButtonsDisplay ? null : (
				<div>
					{shouldAllProjectSubItemsDisplay ? (
						<div className="sub-over-flow-container js-project-sub-over-flow-container">
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
					<div>
						<div
							className={
								"item-button" +
								(reduxState[BUG_CONTAINER].componentsDisplay
									.listViewComponentShouldDisplay === false
									? ""
									: " item--selected" +
									  getCommonBrighterBackgroundColorClassNameForTheme(
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
									  ))
							}
							aria-label="Bugs"
							onClick={() => switchToBugsListView(reduxState, dispatch)}
						>
							<FontAwesomeIcon
								icon={faBug}
								className="item-button__icon"
								aria-hidden="true"
							/>
							Bugs
						</div>
					</div>
					{!shouldAllBugSubItemsDisplay ? null : (
						<div className="sub-over-flow-container js-bug-sub-over-flow-container">
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
			)}
		</div>
	);
}
