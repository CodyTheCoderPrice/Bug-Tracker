import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	deleteProjectOrBug,
	deleteComment,
	setWhichCommentComponentsDisplay,
} from "../../../../actions";

import {
	manageSizeOfItemBoxsElementInPairContainerElement,
	getItemViewComponentItemContentContainerElementBackgroundColorClassNameForLightOrDarkMode,
	getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode,
} from "../../../../utils";

// Components
import ItemViewTopBar from "./top-bar/ItemViewTopBar";
import ItemViewDisplayItemInfo from "./ItemViewDisplayItemInfo";
import ItemViewEditItemInfo from "./ItemViewEditItemInfo";
import DeleteModal from "../DeleteModal";
import ItemViewBugList from "./ItemViewBugList";
import ItemViewBugPieChart from "./ItemViewBugPieChart";
import ItemViewCommentsBox from "./comment-box/ItemViewCommentsBox";

export default function ItemView(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Adjusts the height and width of the component to fit the screen
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].variables.navPanel !== null &&
			reduxState[SIZE_CONTAINER].constants.itemViewTopBarComponentHeight !==
				null
		) {
			const itemViewElement = document.getElementsByClassName(
				"js-item-content-container"
			)[0];

			itemViewElement.style.height =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].variables.navbar.height -
				reduxState[SIZE_CONTAINER].constants.itemViewTopBarComponentHeight +
				"px";

			/* const baseItemViewWidth =
				reduxState[SIZE_CONTAINER].variables.window.width -
				reduxState[SIZE_CONTAINER].variables.navPanel.width;

			itemViewElement.style.width = baseItemViewWidth + "px"; */
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[SIZE_CONTAINER],
	]);

	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].constants
				.itemViewComponentOuterDividingContainerElementMinWidth !== null &&
			props.reduxContainerName === PROJECT_CONTAINER
		) {
			manageSizeOfItemBoxsElementInPairContainerElement(
				document.getElementsByClassName(
					"js-bug-info-pair-container-for-project"
				)[0],
				reduxState[SIZE_CONTAINER].constants
					.itemViewComponentOuterDividingContainerElementMinWidth
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// eslint-disable-next-line react-hooks/exhaustive-deps
		reduxState[SIZE_CONTAINER].constants
			.itemViewComponentOuterDividingContainerElementMinWidth,
	]);

	const deleteItem = () => {
		let copyMassDeleteList = [
			...reduxState[props.reduxContainerName].massDeleteList,
		];

		// Object instead of Number since deleting bugs requires the project_id
		// ...so it is appended below when deleting bugs
		let idsObject = {
			id: reduxState[props.reduxContainerName].componentsDisplay
				.itemViewCurrentItem.id,
		};
		// Adds project_id when deleting a bug
		if (props.reduxContainerName === BUG_CONTAINER) {
			idsObject["project_id"] =
				reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem.id;
		}
		dispatch(
			deleteProjectOrBug(
				props.reduxContainerName,
				idsObject,
				copyMassDeleteList
			)
		);
	};

	const closeItemViewDeleteModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				deleteModalComponentForItemViewShouldDisplay: false,
			})
		);
	};

	// Named deleteSelectedComment since deleteComment is an action function
	const deleteSelectedComment = () => {
		dispatch(
			deleteComment(
				{
					id: reduxState[COMMENT_CONTAINER].componentsDisplay.commentToBeDeleted
						.id,
					project_id:
						reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
							.id,
					bug_id:
						reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.id,
				},
				reduxState[COMMENT_CONTAINER].componentsDisplay.commentBeingEdited
			)
		);
	};

	const closeCommentDeleteModal = () => {
		dispatch(
			setWhichCommentComponentsDisplay({
				commentBeingEdited:
					reduxState[COMMENT_CONTAINER].componentsDisplay.commentBeingEdited,
			})
		);
	};

	return (
		<div className="item-view-component">
			<ItemViewTopBar reduxContainerName={props.reduxContainerName} />
			{/* Located outside item-view-component so topBar doesn't cover it */}
			{reduxState[props.reduxContainerName].componentsDisplay
				.deleteModalComponentForItemViewShouldDisplay ? (
				// Delete modal for items
				<DeleteModal
					clickToCloseBlurredBackdrop={false}
					deleteFunction={deleteItem}
					closeModalFunction={closeItemViewDeleteModal}
				/>
			) : null}
			{reduxState[BUG_CONTAINER].componentsDisplay
				.itemViewComponentShouldDisplay === true &&
			reduxState[COMMENT_CONTAINER].componentsDisplay.commentToBeDeleted !==
				null ? (
				// Delete modal for comments
				<DeleteModal
					clickToCloseBlurredBackdrop={false}
					deleteFunction={deleteSelectedComment}
					closeModalFunction={closeCommentDeleteModal}
				/>
			) : null}
			<div
				className={
					"item-content-container js-item-content-container" +
					getItemViewComponentItemContentContainerElementBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<div className="padding-container">
					{reduxState[props.reduxContainerName].componentsDisplay
						.itemViewEditItemInfoComponentShouldDisplay === false ? (
						<ItemViewDisplayItemInfo
							reduxContainerName={props.reduxContainerName}
						/>
					) : (
						<ItemViewEditItemInfo
							reduxContainerName={props.reduxContainerName}
						/>
					)}
					{props.reduxContainerName !== PROJECT_CONTAINER ? null : (
						<div className="pair-container js-bug-info-pair-container-for-project">
							<div className="outer-dividing-container outer-dividing-container--half-width">
								<div
									className={
										"item-box item-box--bugs-stats-height item-box--no-left-right-padding" +
										getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									<h2 className={"item-box__title"}>Status of Bugs</h2>
									{[...reduxState[BUG_CONTAINER].list].filter(
										(item) =>
											item.project_id ===
											reduxState[PROJECT_CONTAINER].componentsDisplay
												.itemViewCurrentItem.id
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
								<div
									className={
										"item-box item-box--bugs-stats-height" +
										getCommonItemViewComponentItemBoxElementBackgroundColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									<h2 className={"item-box__title"}>
										Most Recent Bugs Worked On
									</h2>
									{[...reduxState[BUG_CONTAINER].list].filter(
										(item) =>
											item.project_id ===
											reduxState[PROJECT_CONTAINER].componentsDisplay
												.itemViewCurrentItem.id
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
	);
}
