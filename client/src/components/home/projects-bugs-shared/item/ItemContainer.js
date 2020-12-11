import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "../../../../reducers/containerNames";

import { setWhichGeneralComponentsDisplay } from "../../../../actions";

import {
	manageSizeOfItemBoxsInPairContainer,
	getWindowSize,
} from "../../../../utils";

// Components
import ItemContainerTopBar from "./ItemContainerTopBar";
import ItemContainerListSidebar from "./ItemContainerListSidebar";
import ItemContainerDisplayItemInfo from "./ItemContainerDisplayItemInfo";
import ItemContainerEditItemInfo from "./ItemContainerEditItemInfo";
import ItemContainerDeleteModal from "./ItemContainerDeleteModal";
import ItemContainerBugList from "./ItemContainerBugList";
import ItemContainerBugPieChart from "./ItemContainerBugPieChart";
import ItemContainerCommentsBox from "./ItemContainerCommentsBox";
import ItemContainerCommentsBoxIndividualCommentDeleteModal from "./ItemContainerCommentsBoxIndividualCommentDeleteModal";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainer.scss";

export default function ItemContainer(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Adjusts the height and width of the modal to fit the screen
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.itemContainerTopBar !== null &&
			reduxState[SIZE_CONTAINER].constants.itemContainerListSidebar !== null
		) {
			const itemContainerElement = document.getElementsByClassName(
				"js-item-container"
			)[0];

			itemContainerElement.style.height =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].variables.navbar.height -
				reduxState[SIZE_CONTAINER].constants.itemContainerTopBar.height +
				"px";

			if (
				reduxState[GENERAL_CONTAINER].componentsDisplay.itemContainerListSidebar
			) {
				itemContainerElement.style.width =
					reduxState[SIZE_CONTAINER].variables.window.width -
					reduxState[SIZE_CONTAINER].constants.itemContainerListSidebar.width +
					"px";
			} else {
				itemContainerElement.style.width =
					reduxState[SIZE_CONTAINER].variables.window.width + "px";
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER],
		// eslint-disable-next-line
		reduxState[GENERAL_CONTAINER].componentsDisplay.itemContainerListSidebar,
	]);

	// If user has not set itemContainerListSidebar, then whether it is
	// ...open or closed will be decided based on the current window size
	useEffect(() => {
		if (
			reduxState[GENERAL_CONTAINER].componentsDisplay
				.itemContainerListSidebarUserSet === false &&
			reduxState[SIZE_CONTAINER].constants.itemContainerListSidebar !== null &&
			reduxState[SIZE_CONTAINER].constants
				.itemContainerOuterDividingContainerMinWidth !== null &&
			reduxState[SIZE_CONTAINER].constants
				.itemContainerPaddingContainerPadding !== null
		) {
			// Instead of putting inn the optimization to re-run once no longer
			// ...null since it would also re-run every window resize
			const windowSize =
				reduxState[SIZE_CONTAINER].variables.window === null
					? getWindowSize()
					: reduxState[SIZE_CONTAINER].variables.window;

			const minWidthNeededForNoItemBoxOverflow =
				reduxState[SIZE_CONTAINER].constants
					.itemContainerOuterDividingContainerMinWidth +
				reduxState[SIZE_CONTAINER].constants
					.itemContainerPaddingContainerPadding *
					2;

			dispatch(
				setWhichGeneralComponentsDisplay({
					...reduxState[GENERAL_CONTAINER].componentsDisplay,
					itemContainerListSidebar:
						windowSize.width -
							reduxState[SIZE_CONTAINER].constants.itemContainerListSidebar
								.width >=
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
				.itemContainerOuterDividingContainerMinWidth !== null
		) {
			manageSizeOfItemBoxsInPairContainer(
				document.getElementsByClassName("js-description-info-pair")[0],
				"outer-dividing-container--half-width",
				reduxState[SIZE_CONTAINER].constants
					.itemContainerOuterDividingContainerMinWidth
			);
			if (props.reduxContainerName === PROJECT_CONTAINER) {
				manageSizeOfItemBoxsInPairContainer(
					document.getElementsByClassName("js-project-bugs-info-pair")[0],
					"outer-dividing-container--half-width",
					reduxState[SIZE_CONTAINER].constants
						.itemContainerOuterDividingContainerMinWidth
				);
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants
			.itemContainerOuterDividingContainerMinWidth,
	]);

	return (
		<div>
			<ItemContainerTopBar reduxContainerName={props.reduxContainerName} />
			<ItemContainerListSidebar reduxContainerName={props.reduxContainerName} />
			{/* Located outside item-container-component so topBar doesn't cover it */}
			{reduxState[props.reduxContainerName].componentsDisplay
				.itemContainerDeleteModal ? (
				<ItemContainerDeleteModal
					reduxContainerName={props.reduxContainerName}
				/>
			) : null}
			{reduxState[BUG_CONTAINER].componentsDisplay.itemContainer === true &&
			reduxState[COMMENT_CONTAINER].componentsDisplay.commentDeleteModal ===
				true ? (
				<ItemContainerCommentsBoxIndividualCommentDeleteModal />
			) : null}
			<div className="item-container-component">
				<div
					className={
						"item-container js-item-container" +
						(reduxState[GENERAL_CONTAINER].componentsDisplay
							.itemContainerListSidebar
							? " item-container--shifted-right"
							: "")
					}
				>
					<div className="item-content-container js-item-content-container">
						<div className="padding-container">
							{!reduxState[props.reduxContainerName].componentsDisplay
								.itemContainerEditItemInfo ? (
								<div>
									<ItemContainerDisplayItemInfo
										reduxContainerName={props.reduxContainerName}
									/>
								</div>
							) : (
								<div>
									<ItemContainerEditItemInfo
										reduxContainerName={props.reduxContainerName}
									/>
								</div>
							)}
							{props.reduxContainerName !== PROJECT_CONTAINER ? null : (
								<div className="pair-container js-project-bugs-info-pair">
									<div className="outer-dividing-container outer-dividing-container--half-width">
										<div className="item-box item-box--project-bugs-stats-height item-box--no-left-right-padding">
											<h2 className="item-box__title">Status of Bugs</h2>
											{[...reduxState[BUG_CONTAINER].list].filter(
												(item) =>
													item.project_id ===
													reduxState[PROJECT_CONTAINER].componentsDisplay
														.targetItem.id
											).length > 0 ? (
												<ItemContainerBugPieChart />
											) : (
												<div className="item-box__no-bugs-message">
													This project has no bugs tracked
												</div>
											)}
										</div>
									</div>
									<div className="outer-dividing-container outer-dividing-container--half-width">
										<div className="item-box item-box--project-bugs-stats-height">
											<h2 className="item-box__title">
												Most Recent Bugs Worked On
											</h2>
											{[...reduxState[BUG_CONTAINER].list].filter(
												(item) =>
													item.project_id ===
													reduxState[PROJECT_CONTAINER].componentsDisplay
														.targetItem.id
											).length > 0 ? (
												<ItemContainerBugList />
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
								<ItemContainerCommentsBox />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
