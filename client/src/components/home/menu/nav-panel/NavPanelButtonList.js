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
	getElementStyle,
	stripNonDigits,
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
			let overflowContainerElement = document.getElementsByClassName(
				"js-over-flow-container"
			)[0];

			if (regularlyUsedSizesAndStyles === null) {
				let staticContainerElement = document.getElementsByClassName(
					"js-static-container"
				)[0];
				setRegularlyUsedSizesAndStyles({
					staticContainerElementHeight: getElementSize(staticContainerElement)
						.height,
					overFlowContainerElementPaddingBottom: stripNonDigits(
						getElementStyle(overflowContainerElement).paddingBottom
					),
				});

				// Prevents crash since regularlyUsedSizesAndStyles will still
				// ...be null for remainder of this useEfffect iteration.
				return;
			}

			const adjustedWindowHeight =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].constants.navPanelTopContainerHeight -
				regularlyUsedSizesAndStyles.staticContainerElementHeight -
				regularlyUsedSizesAndStyles.overFlowContainerElementPaddingBottom;

			overflowContainerElement.style.height = adjustedWindowHeight + "px";
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants,
		regularlyUsedSizesAndStyles,
	]);

	return (
		<div className="nav-panel-button-list-component">
			<div className="static-container js-static-container">
				<div
					className={
						"item" +
						(reduxState[PROJECT_CONTAINER].componentsDisplay
							.listViewComponentShouldDisplay === false
							? ""
							: " item--selected" +
							  getCommonBrighterBackgroundColorClassNameForTheme(
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
							  ))
					}
					onClick={() => switchToProjectsListView(reduxState, dispatch)}
				>
					<FontAwesomeIcon
						icon={faSuitcase}
						className="item__icon"
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
								"item" +
								(reduxState[BUG_CONTAINER].componentsDisplay
									.listViewComponentShouldDisplay === false
									? ""
									: " item--selected" +
									  getCommonBrighterBackgroundColorClassNameForTheme(
											reduxState[ACCOUNT_CONTAINER].settings.theme_color
									  ))
							}
							onClick={() => switchToBugsListView(reduxState, dispatch)}
						>
							<span>
								<FontAwesomeIcon
									icon={faBug}
									className="item__icon"
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
