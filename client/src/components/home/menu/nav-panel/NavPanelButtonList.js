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
	getNavPanelButtonListSizesAndStyles,
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

	const [navPanelChildSizesAndStyles, setNavPanelChildSizesAndStyles] =
		useState({
			navPanelTopContainerHeight: null,
			subOverflowContainerForBugsMarginBottom: null,
			subOverflowContainerWithScrollbarMarginTop: null,
			subOverflowContainerWithScrollbarMarginBottom: null,
			subOverflowContainerWithScrollbarPaddingTop: null,
			subOverflowContainerWithScrollbarPaddingBottom: null,
			subOverflowContainerWithScrollbarForBugsMarginBottom: null,
			subOverflowContainerWithScrollbarForBugsPaddingBottom: null,
			listButtonHeight: null,
			listButtonWithTopSpacingMarginTop: null,
		});

	const [buttonListSubItemsStatus, setButtonListSubItemsStatus] = useState({
		projectAnyButtonsInitialHeightSetToZero: false,
		projectAllButtonsInitialHeightSetToZero: false,
		bugAnyButtonsInitialHeightSetToZero: false,
		bugAllButtonsInitialHeightSetToZero: false,
	});

	const shouldAnyProjectSubItemsDisplay =
		reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
		null;

	const shouldAllProjectSubItemsDisplay =
		reduxState[PROJECT_CONTAINER].componentsDisplay
			.itemViewComponentShouldDisplay;

	const shouldBugListButtonBeClickable =
		reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
		null;

	const shouldAnyBugSubItemsDisplay =
		reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem !== null;

	const shouldAllBugSubItemsDisplay =
		reduxState[BUG_CONTAINER].componentsDisplay.itemViewComponentShouldDisplay;

	// Sets navPanelChildSizesAndStyles
	useEffect(() => {
		setNavPanelChildSizesAndStyles({
			navPanelTopContainerHeight: getElementSize(
				document.getElementsByClassName("js-nav-panel-top-container")[0]
			).height,
			...getNavPanelButtonListSizesAndStyles(),
		});
	}, []);

	// Updates buttonListSubItemsStatus
	useEffect(() => {
		// Since it will take 1 cycle to update, the sub item buttons will have
		// ...had a chance to have their height set to zero
		setButtonListSubItemsStatus({
			projectAnyButtonsInitialHeightSetToZero: shouldAnyProjectSubItemsDisplay,
			projectAllButtonsInitialHeightSetToZero: shouldAllProjectSubItemsDisplay,
			bugAnyButtonsInitialHeightSetToZero: shouldAnyBugSubItemsDisplay,
			bugAllButtonsInitialHeightSetToZero: shouldAllBugSubItemsDisplay,
		});
	}, [
		shouldAnyProjectSubItemsDisplay,
		shouldAllProjectSubItemsDisplay,
		shouldAnyBugSubItemsDisplay,
		shouldAllBugSubItemsDisplay,
	]);

	// Resize overflow-container height to fit the nav-panel when there is not
	// ...enough room
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.navPanel !== null &&
			navPanelChildSizesAndStyles.navPanelTopContainerHeight !== null &&
			navPanelChildSizesAndStyles.listButtonWithTopSpacingMarginTop !== null &&
			navPanelChildSizesAndStyles.subOverflowContainerForBugsMarginBottom !==
				null &&
			navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarMarginTop !==
				null &&
			navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarMarginBottom !==
				null &&
			navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarPaddingTop !==
				null &&
			navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarPaddingBottom !==
				null &&
			navPanelChildSizesAndStyles.listButtonHeight !== null
		) {
			let projectSubOverflowContainerElement = document.getElementsByClassName(
				"js-project-sub-overflow-container"
			)[0];

			if (
				shouldAllProjectSubItemsDisplay &&
				buttonListSubItemsStatus.projectAllButtonsInitialHeightSetToZero
			) {
				const adjustedNavPanelHeight =
					reduxState[SIZE_CONTAINER].variables.navPanel.height -
					navPanelChildSizesAndStyles.navPanelTopContainerHeight -
					navPanelChildSizesAndStyles.listButtonWithTopSpacingMarginTop -
					navPanelChildSizesAndStyles.subOverflowContainerForBugsMarginBottom -
					navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarMarginTop -
					navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarMarginBottom -
					navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarPaddingTop -
					navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarPaddingBottom -
					navPanelChildSizesAndStyles.listButtonHeight * 2 -
					(shouldAnyBugSubItemsDisplay
						? navPanelChildSizesAndStyles.listButtonHeight
						: 0);

				const allProjectButtonListSubItemsHeight =
					navPanelChildSizesAndStyles.listButtonHeight *
					projectSubOverflowContainerElement.firstElementChild.children.length;

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
				projectSubOverflowContainerElement.style.height =
					shouldAnyProjectSubItemsDisplay
						? navPanelChildSizesAndStyles.listButtonHeight + "px"
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
					navPanelChildSizesAndStyles.navPanelTopContainerHeight -
					navPanelChildSizesAndStyles.listButtonWithTopSpacingMarginTop -
					navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarMarginTop -
					navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarForBugsMarginBottom -
					navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarPaddingTop -
					navPanelChildSizesAndStyles.subOverflowContainerWithScrollbarForBugsPaddingBottom -
					navPanelChildSizesAndStyles.listButtonHeight * 3;

				const allBugButtonListSubItemsHeight =
					navPanelChildSizesAndStyles.listButtonHeight *
					bugSubOverflowContainerElement.firstElementChild.children.length;

				if (adjustedNavPanelHeight < allBugButtonListSubItemsHeight) {
					toggleClassName(
						true,
						bugSubOverflowContainerElement,
						"sub-overflow-container--scrollbar-present sub-overflow-container--scrollbar-for-bugs"
					);
				} else {
					toggleClassName(
						false,
						bugSubOverflowContainerElement,
						"sub-overflow-container--scrollbar-present sub-overflow-container--scrollbar-for-bugs"
					);
				}

				// Either way, set to adjustNavPanelHeight as no other
				// ...element's position is affect by this element
				bugSubOverflowContainerElement.style.height =
					adjustedNavPanelHeight + "px";
			} else {
				bugSubOverflowContainerElement.style.height =
					shouldAnyBugSubItemsDisplay
						? navPanelChildSizesAndStyles.listButtonHeight + "px"
						: "0px";

				toggleClassName(
					false,
					bugSubOverflowContainerElement,
					"sub-overflow-container--scrollbar-present sub-overflow-container--scrollbar-for-bugs"
				);
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
		navPanelChildSizesAndStyles,
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].list,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].list,
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].searchFilterSort,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].searchFilterSort,
		shouldAnyProjectSubItemsDisplay,
		shouldAllProjectSubItemsDisplay,
		shouldAnyBugSubItemsDisplay,
		shouldAllBugSubItemsDisplay,
		buttonListSubItemsStatus,
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
				className={"sub-overflow-container js-project-sub-overflow-container"}
			>
				{!shouldAnyProjectSubItemsDisplay ? null : (
					<div>
						{getSearchedFilteredSortedList(reduxState, PROJECT_CONTAINER).map(
							(item, idx) => {
								return (
									<NavPanelButtonListSubItem
										key={idx}
										item={item}
										idx={idx}
										reduxContainerName={PROJECT_CONTAINER}
										shouldAllSubItemsDisplay={shouldAllProjectSubItemsDisplay}
										initialHeightSetToZero={
											(reduxState[PROJECT_CONTAINER].componentsDisplay
												.itemViewCurrentItem !== null &&
												reduxState[PROJECT_CONTAINER].componentsDisplay
													.itemViewCurrentItem.id === item.id &&
												buttonListSubItemsStatus.projectAnyButtonsInitialHeightSetToZero) ||
											buttonListSubItemsStatus.projectAllButtonsInitialHeightSetToZero
										}
										expandedHeight={
											navPanelChildSizesAndStyles.listButtonHeight
										}
									/>
								);
							}
						)}
					</div>
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
					"sub-overflow-container sub-overflow-container--for-bugs js-bug-sub-overflow-container"
				}
			>
				{!shouldAnyBugSubItemsDisplay ? null : (
					<div>
						{getSearchedFilteredSortedList(reduxState, BUG_CONTAINER).map(
							(item, idx) => {
								return (
									<NavPanelButtonListSubItem
										key={idx}
										item={item}
										idx={idx}
										reduxContainerName={BUG_CONTAINER}
										shouldAllSubItemsDisplay={shouldAllBugSubItemsDisplay}
										initialHeightSetToZero={
											(reduxState[BUG_CONTAINER].componentsDisplay
												.itemViewCurrentItem !== null &&
												reduxState[BUG_CONTAINER].componentsDisplay
													.itemViewCurrentItem.id === item.id &&
												buttonListSubItemsStatus.bugAnyButtonsInitialHeightSetToZero) ||
											buttonListSubItemsStatus.bugAllButtonsInitialHeightSetToZero
										}
										expandedHeight={
											navPanelChildSizesAndStyles.listButtonHeight
										}
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
