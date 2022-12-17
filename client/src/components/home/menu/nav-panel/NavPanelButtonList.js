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

	// Optimizes code by storing the regularly used staticContainerElement height
	const [staticContainerHeight, setStaticContainerHeight] = useState(null);

	const shouldBugButtonsDisplay =
		reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem !==
		null;

	// Resize overflow-container height to fit the nav-panel when there is not
	// ...enough room
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight !==
				null &&
			shouldBugButtonsDisplay
		) {
			if (staticContainerHeight === null) {
				let staticContainerElement = document.getElementsByClassName(
					"js-static-container"
				)[0];

				setStaticContainerHeight(getElementSize(staticContainerElement).height);

				// Prevents crash since staticContainerHeight will still
				// ...be null for remainder of this useEfffect iteration.
				return;
			}

			let overflowContainerElement = document.getElementsByClassName(
				"js-over-flow-container"
			)[0];

			const adjustedWindowHeight =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight -
				staticContainerHeight -
				reduxState[SIZE_CONTAINER].constants
					.navPanelButtonListComponentCriticalStyles
					.overflowContainerWithScrollbarMarginTop -
				reduxState[SIZE_CONTAINER].constants
					.navPanelButtonListComponentCriticalStyles
					.overflowContainerWithScrollbarPaddingTop -
				reduxState[SIZE_CONTAINER].constants
					.navPanelButtonListComponentCriticalStyles
					.overflowContainerWithScrollbarPaddingBottom;

			overflowContainerElement.style.height = adjustedWindowHeight + "px";
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants,
		staticContainerHeight,
	]);

	useEffect(() => {
		if (shouldBugButtonsDisplay) {
			let overflowContainerElement = document.getElementsByClassName(
				"js-over-flow-container"
			)[0];

			toggleClassName(
				isVerticalScrollbarPresent(overflowContainerElement),
				overflowContainerElement,
				"over-flow-container--scrollbar-present"
			);
		}
	});

	return (
		<div className="nav-panel-button-list-component">
			<div className="static-container js-static-container">
				<div
					className={
						"item-button" +
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
				{!shouldBugButtonsDisplay ? null : (
					<div>
						<NavPanelButtonListSubItem
							item={
								reduxState[PROJECT_CONTAINER].componentsDisplay
									.itemViewCurrentItem
							}
							reduxContainerName={PROJECT_CONTAINER}
						/>
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
							<span>
								<FontAwesomeIcon
									icon={faBug}
									className="item-button__icon"
									aria-hidden="true"
								/>
								Bugs
							</span>
						</div>
					</div>
				)}
			</div>
			{!shouldBugButtonsDisplay ? null : (
				<div className="over-flow-container js-over-flow-container">
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
