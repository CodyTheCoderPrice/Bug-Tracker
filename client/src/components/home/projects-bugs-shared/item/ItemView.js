import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "../../../../actions/constants/containerNames";

import { setWhichGeneralComponentsDisplay } from "../../../../actions";

import {
	manageSizeOfItemBoxsInPairContainer,
	getWindowSize,
	getProjectOrBugTextColorClassName,
} from "../../../../utils";

// Components
import ItemViewTopBar from "./ItemViewTopBar";
import ItemViewListSidebar from "./ItemViewListSidebar";
import ItemViewDisplayItemInfo from "./ItemViewDisplayItemInfo";
import ItemViewEditItemInfo from "./ItemViewEditItemInfo";
import ItemViewDeleteModal from "./ItemViewDeleteModal";
import ItemViewBugList from "./ItemViewBugList";
import ItemViewBugPieChart from "./ItemViewBugPieChart";
import ItemViewCommentsBox from "./ItemViewCommentsBox";
import ItemViewCommentsBoxIndividualCommentDeleteModal from "./ItemViewCommentsBoxIndividualCommentDeleteModal";

export default function ItemView(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Adjusts the height and width of the modal to fit the screen
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.itemViewTopBar !== null &&
			reduxState[SIZE_CONTAINER].constants.itemViewListSidebar !== null
		) {
			const itemViewElement = document.getElementsByClassName(
				"js-item-container"
			)[0];

			itemViewElement.style.height =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].variables.navbar.height -
				reduxState[SIZE_CONTAINER].constants.itemViewTopBar.height +
				"px";

			if (reduxState[GENERAL_CONTAINER].componentsDisplay.itemViewListSidebar) {
				itemViewElement.style.width =
					reduxState[SIZE_CONTAINER].variables.window.width -
					reduxState[SIZE_CONTAINER].constants.itemViewListSidebar.width +
					"px";
			} else {
				itemViewElement.style.width =
					reduxState[SIZE_CONTAINER].variables.window.width + "px";
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER],
		// eslint-disable-next-line
		reduxState[GENERAL_CONTAINER].componentsDisplay.itemViewListSidebar,
	]);

	// If user has not set itemViewListSidebar, then whether it is
	// ...open or closed will be decided based on the current window size
	useEffect(() => {
		if (
			reduxState[GENERAL_CONTAINER].componentsDisplay
				.itemViewListSidebarUserSet === false &&
			reduxState[SIZE_CONTAINER].constants.itemViewListSidebar !== null &&
			reduxState[SIZE_CONTAINER].constants
				.itemViewOuterDividingContainerMinWidth !== null &&
			reduxState[SIZE_CONTAINER].constants.itemViewPaddingContainerPadding !==
				null
		) {
			// Instead of putting inn the optimization to re-run once no longer
			// ...null since it would also re-run every window resize
			const windowSize =
				reduxState[SIZE_CONTAINER].variables.window === null
					? getWindowSize()
					: reduxState[SIZE_CONTAINER].variables.window;

			const minWidthNeededForNoItemBoxOverflow =
				reduxState[SIZE_CONTAINER].constants
					.itemViewOuterDividingContainerMinWidth +
				reduxState[SIZE_CONTAINER].constants.itemViewPaddingContainerPadding *
					2;

			dispatch(
				setWhichGeneralComponentsDisplay({
					...reduxState[GENERAL_CONTAINER].componentsDisplay,
					itemViewListSidebar:
						windowSize.width -
							reduxState[SIZE_CONTAINER].constants.itemViewListSidebar.width >=
						minWidthNeededForNoItemBoxOverflow,
				})
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants,
	]);

	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].constants
				.itemViewOuterDividingContainerMinWidth !== null
		) {
			manageSizeOfItemBoxsInPairContainer(
				document.getElementsByClassName("js-description-info-pair")[0],
				"outer-dividing-container--half-width",
				reduxState[SIZE_CONTAINER].constants
					.itemViewOuterDividingContainerMinWidth
			);
			if (props.reduxContainerName === PROJECT_CONTAINER) {
				manageSizeOfItemBoxsInPairContainer(
					document.getElementsByClassName("js-project-bugs-info-pair")[0],
					"outer-dividing-container--half-width",
					reduxState[SIZE_CONTAINER].constants
						.itemViewOuterDividingContainerMinWidth
				);
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants.itemViewOuterDividingContainerMinWidth,
	]);

	return (
		<div>
			<ItemViewTopBar reduxContainerName={props.reduxContainerName} />
			<ItemViewListSidebar reduxContainerName={props.reduxContainerName} />
			{/* Located outside item-container-component so topBar doesn't cover it */}
			{reduxState[props.reduxContainerName].componentsDisplay
				.itemViewDeleteModal ? (
				<ItemViewDeleteModal reduxContainerName={props.reduxContainerName} />
			) : null}
			{reduxState[BUG_CONTAINER].componentsDisplay.itemView === true &&
			reduxState[COMMENT_CONTAINER].componentsDisplay.commentDeleteModal ===
				true ? (
				<ItemViewCommentsBoxIndividualCommentDeleteModal />
			) : null}
			<div className="item-container-component">
				<div
					className={
						"item-container js-item-container" +
						(reduxState[GENERAL_CONTAINER].componentsDisplay.itemViewListSidebar
							? " item-container--shifted-right"
							: "")
					}
				>
					<div className="item-content-container js-item-content-container">
						<div className="padding-container">
							{!reduxState[props.reduxContainerName].componentsDisplay
								.itemViewEditItemInfo ? (
								<div>
									<ItemViewDisplayItemInfo
										reduxContainerName={props.reduxContainerName}
									/>
								</div>
							) : (
								<div>
									<ItemViewEditItemInfo
										reduxContainerName={props.reduxContainerName}
									/>
								</div>
							)}
							{props.reduxContainerName !== PROJECT_CONTAINER ? null : (
								<div className="pair-container js-project-bugs-info-pair">
									<div className="outer-dividing-container outer-dividing-container--half-width">
										<div className="item-box item-box--project-bugs-stats-height item-box--no-left-right-padding">
											<h2
												className={
													"item-box__title" +
													getProjectOrBugTextColorClassName(
														props.reduxContainerName
													)
												}
											>
												Status of Bugs
											</h2>
											{[...reduxState[BUG_CONTAINER].list].filter(
												(item) =>
													item.project_id ===
													reduxState[PROJECT_CONTAINER].componentsDisplay
														.targetItem.id
											).length > 0 ? (
												<ItemViewBugPieChart />
											) : (
												<div className="item-box__no-bugs-message">
													This project has no bugs tracked
												</div>
											)}
										</div>
									</div>
									<div className="outer-dividing-container outer-dividing-container--half-width">
										<div className="item-box item-box--project-bugs-stats-height">
											<h2
												className={
													"item-box__title" +
													getProjectOrBugTextColorClassName(
														props.reduxContainerName
													)
												}
											>
												Most Recent Bugs Worked On
											</h2>
											{[...reduxState[BUG_CONTAINER].list].filter(
												(item) =>
													item.project_id ===
													reduxState[PROJECT_CONTAINER].componentsDisplay
														.targetItem.id
											).length > 0 ? (
												<ItemViewBugList />
											) : (
												<div className="item-box__no-bugs-message">
													This project has no bugs tracked
												</div>
											)}
										</div>
									</div>
								</div>
							)}
							{props.reduxContainerName === PROJECT_CONTAINER ? null : (
								<ItemViewCommentsBox />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
