import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	GENERAL_CONTAINER,
} from "../../../../actions/constants/containerNames";
import {
	getElementSize,
	getNavPanelButtonListSizesAndStyles,
	toggleClassName,
	getCommonBrighterBackgroundColorClassNameForTheme,
	switchToProjectsListView,
	switchToBugsListView,
	getProjectListForNavPanelButtonList,
	getCommonElementToolTipBackgroundTextColorClassNameForLocationWithLightOrDarkMode,
	getBugListForNavPanelButtonList,
} from "../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcase, faBug } from "@fortawesome/free-solid-svg-icons";
// Components
import NavPanelButtonListSubItem from "./NavPanelButtonListSubItem";

export default function NavPanelButtonList() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Used to perserve the content of lists after a listView component is clsoed
	// ...so the NavPanelButtonListSubItem components can transition/fade out
	const [buttonSubItemLists, setButtonSubItemLists] = useState({
		projectList: getProjectListForNavPanelButtonList(reduxState),
		bugList: getBugListForNavPanelButtonList(reduxState),
	});

	// Optimizes performance by storing regularly used size/style values
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

	const buttonDisplayLogic = {
		shouldAnyProjectSubItemsDisplay:
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
			null,
		shouldAllProjectSubItemsDisplay:
			reduxState[PROJECT_CONTAINER].componentsDisplay
				.itemViewComponentShouldDisplay,
		shouldBugListButtonBeClickable:
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
			null,
		shouldAnyBugSubItemsDisplay:
			reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem !== null,
		shouldAllBugSubItemsDisplay:
			reduxState[BUG_CONTAINER].componentsDisplay
				.itemViewComponentShouldDisplay,
	};

	// Used for NavPanelButtonListSubItem components transition/fade out
	const [buttonListSubItemsDomStatus, setButtonListSubItemsDomStatus] =
		useState({
			projectItemsShouldExist:
				buttonDisplayLogic.shouldAnyProjectSubItemsDisplay,
			projectItemsShouldLingerForFadeOut: false,
			bugItemsShouldExist: buttonDisplayLogic.shouldAnyBugSubItemsDisplay,
			bugItemsShouldLingerForFadeOut: false,
		});

	// Used for NavPanelButtonListSubItem components to transition in
	const [
		buttonListSubItemsInitialHeightStatus,
		setButtonListSubItemsInitialHeightStatus,
	] = useState({
		projectAnyButtonsSetToZero: false,
		projectAllButtonsSetToZero: false,
		bugAnyButtonsSetToZero: false,
		bugAllButtonsSetToZero: false,
	});

	// Updates buttonSubItemLists
	useEffect(() => {
		// Keeps projectList/bugList the same when a 'sub-overflow-container'
		// ...element is "closing" so it can transition/faded out
		const projectListUpdatedValue =
			reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem ===
			null
				? buttonSubItemLists.projectList
				: getProjectListForNavPanelButtonList(reduxState);

		const bugListUpdatedValue =
			reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem === null
				? buttonSubItemLists.bugList
				: getBugListForNavPanelButtonList(reduxState);

		if (
			buttonSubItemLists.projectList !== projectListUpdatedValue ||
			buttonSubItemLists.bugList !== bugListUpdatedValue
		) {
			setButtonSubItemLists({
				projectList: projectListUpdatedValue,
				bugList: bugListUpdatedValue,
			});
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem,
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].list,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].list,
		// eslint-disable-next-line
		reduxState[GENERAL_CONTAINER].componentsDisplay
			.navPanelButtonListComponentShouldIncludeCompletedProjects,
		// eslint-disable-next-line
		reduxState[GENERAL_CONTAINER].componentsDisplay
			.navPanelButtonListComponentShouldIncludeClosedBugs,
	]);

	// Sets navPanelChildSizesAndStyles
	useEffect(() => {
		setNavPanelChildSizesAndStyles({
			navPanelTopContainerHeight: getElementSize(
				document.getElementsByClassName("js-nav-panel-top-container")[0]
			).height,
			...getNavPanelButtonListSizesAndStyles(),
		});
	}, []);

	// Updates buttonListSubItemsDomStatus
	useEffect(() => {
		const projectItemsLingerLogic =
			buttonListSubItemsDomStatus.projectItemsShouldExist &&
			!buttonListSubItemsDomStatus.projectItemsShouldLingerForFadeOut &&
			!buttonDisplayLogic.shouldAnyProjectSubItemsDisplay;

		const bugItemsLingerLogic =
			buttonListSubItemsDomStatus.bugItemsShouldExist &&
			!buttonListSubItemsDomStatus.bugItemsShouldLingerForFadeOut &&
			!buttonDisplayLogic.shouldAnyBugSubItemsDisplay;

		setButtonListSubItemsDomStatus({
			projectItemsShouldExist:
				buttonDisplayLogic.shouldAnyProjectSubItemsDisplay ||
				projectItemsLingerLogic,
			projectItemsShouldLingerForFadeOut: projectItemsLingerLogic,
			bugItemsShouldExist:
				buttonDisplayLogic.shouldAnyBugSubItemsDisplay || bugItemsLingerLogic,
			bugItemsShouldLingerForFadeOut: bugItemsLingerLogic,
		});
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[PROJECT_CONTAINER].componentsDisplay,
		// eslint-disable-next-line
		reduxState[BUG_CONTAINER].componentsDisplay,
	]);

	// Updates buttonListSubItemsInitialHeightStatus
	useEffect(() => {
		// Since this state takes 1 cycle to update, it gives the sub item 
		// ...buttons enought time to first set their heights to zero
		setButtonListSubItemsInitialHeightStatus({
			projectAnyButtonsSetToZero:
				buttonDisplayLogic.shouldAnyProjectSubItemsDisplay,
			projectAllButtonsSetToZero:
				buttonDisplayLogic.shouldAllProjectSubItemsDisplay,
			bugAnyButtonsSetToZero: buttonDisplayLogic.shouldAnyBugSubItemsDisplay,
			bugAllButtonsSetToZero: buttonDisplayLogic.shouldAllBugSubItemsDisplay,
		});
	}, [
		buttonDisplayLogic.shouldAnyProjectSubItemsDisplay,
		buttonDisplayLogic.shouldAllProjectSubItemsDisplay,
		buttonDisplayLogic.shouldAnyBugSubItemsDisplay,
		buttonDisplayLogic.shouldAllBugSubItemsDisplay,
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
			navPanelChildSizesAndStyles.listButtonHeight !== null &&
			buttonListSubItemsDomStatus.projectItemsShouldExist !== null &&
			buttonListSubItemsDomStatus.bugItemsShouldExist !== null
		) {
			let projectSubOverflowContainerElement = document.getElementsByClassName(
				"js-project-sub-overflow-container"
			)[0];

			if (
				buttonListSubItemsDomStatus.projectItemsShouldExist &&
				buttonDisplayLogic.shouldAllProjectSubItemsDisplay &&
				buttonListSubItemsInitialHeightStatus.projectAllButtonsSetToZero
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
					(buttonDisplayLogic.shouldAnyBugSubItemsDisplay
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
				// Sets to 0px when it shouldn't display so it will transition out
				projectSubOverflowContainerElement.style.height =
					buttonDisplayLogic.shouldAnyProjectSubItemsDisplay
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

			if (
				buttonListSubItemsDomStatus.bugItemsShouldExist &&
				buttonDisplayLogic.shouldAllBugSubItemsDisplay
			) {
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
				// Sets to 0px when it shouldn't display so it will transition out
				bugSubOverflowContainerElement.style.height =
					buttonDisplayLogic.shouldAnyBugSubItemsDisplay
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
		buttonDisplayLogic.shouldAnyProjectSubItemsDisplay,
		buttonDisplayLogic.shouldAllProjectSubItemsDisplay,
		buttonDisplayLogic.shouldAnyBugSubItemsDisplay,
		buttonDisplayLogic.shouldAllBugSubItemsDisplay,
		buttonListSubItemsDomStatus.projectItemsShouldExist,
		buttonListSubItemsDomStatus.bugItemsShouldExist,
		buttonListSubItemsInitialHeightStatus,
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
				{!buttonListSubItemsDomStatus.projectItemsShouldExist ? null : (
					<div>
						{buttonSubItemLists.projectList.map((item, idx) => {
							return (
								<NavPanelButtonListSubItem
									key={idx}
									item={item}
									idx={idx}
									reduxContainerName={PROJECT_CONTAINER}
									shouldAllSubItemsDisplay={
										buttonDisplayLogic.shouldAllProjectSubItemsDisplay
									}
									initialHeightSetToZero={
										(reduxState[PROJECT_CONTAINER].componentsDisplay
											.itemViewCurrentItem !== null &&
											reduxState[PROJECT_CONTAINER].componentsDisplay
												.itemViewCurrentItem.id === item.id &&
											buttonListSubItemsInitialHeightStatus.projectAnyButtonsSetToZero) ||
										buttonListSubItemsInitialHeightStatus.projectAllButtonsSetToZero
									}
									expandedHeight={navPanelChildSizesAndStyles.listButtonHeight}
								/>
							);
						})}
					</div>
				)}
			</div>
			<div
				className={
					"list-button" +
					(buttonDisplayLogic.shouldBugListButtonBeClickable
						? ""
						: " list-button--unclickable") +
					(buttonDisplayLogic.shouldAllBugSubItemsDisplay
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
				aria-hidden={!buttonDisplayLogic.shouldBugListButtonBeClickable}
				onClick={
					buttonDisplayLogic.shouldBugListButtonBeClickable
						? () => switchToBugsListView(reduxState, dispatch)
						: null
				}
			>
				<span
					className={
						"list-button__tooltip-container" +
						(buttonDisplayLogic.shouldBugListButtonBeClickable
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
				{!buttonListSubItemsDomStatus.bugItemsShouldExist ? null : (
					<div>
						{buttonSubItemLists.bugList.map((item, idx) => {
							return (
								<NavPanelButtonListSubItem
									key={idx}
									item={item}
									idx={idx}
									reduxContainerName={BUG_CONTAINER}
									shouldAllSubItemsDisplay={
										buttonDisplayLogic.shouldAllBugSubItemsDisplay
									}
									initialHeightSetToZero={
										(reduxState[BUG_CONTAINER].componentsDisplay
											.itemViewCurrentItem !== null &&
											reduxState[BUG_CONTAINER].componentsDisplay
												.itemViewCurrentItem.id === item.id &&
											buttonListSubItemsInitialHeightStatus.bugAnyButtonsSetToZero) ||
										buttonListSubItemsInitialHeightStatus.bugAllButtonsSetToZero
									}
									expandedHeight={navPanelChildSizesAndStyles.listButtonHeight}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
