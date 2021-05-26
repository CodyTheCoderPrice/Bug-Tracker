import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	SIZE_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setProjectOrBugMassDeleteList,
	setWhichProjectOrBugComponentsDisplay,
} from "../../../../actions";

import {
	getElementLocation,
	getListHeaderBoxShadowAndBackgroundColorClassNameForLightOrDarkMode,
	getSearchedFilteredSortedList,
	getListViewEmptyListMessageTextColorClassNameForLightOrDarkMode,
} from "../../../../utils";

// Components
import ListTableRow from "./ListViewTableRow";
import SortArrowsButton from "../../../basic/SortArrowsButton";

export default function ListViewTable(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Adjusts the height and width of the table to fit the screen
	// ...as well as adjust the height of empty-list-message-container
	// ...(if it is present)
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.listViewTopBarHeight !== null
		) {
			const listTableContainerElement = document.getElementsByClassName(
				"js-list-table-container"
			)[0];

			listTableContainerElement.style.height =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].variables.navbar.height -
				reduxState[SIZE_CONTAINER].constants.listViewTopBarHeight +
				"px";

			listTableContainerElement.style.width =
				reduxState[SIZE_CONTAINER].variables.window.width + "px";

			// If empty-list-message-container is present
			if (
				(props.reduxContainerName === PROJECT_CONTAINER &&
					reduxState[props.reduxContainerName].list.length < 1) ||
				(props.reduxContainerName === BUG_CONTAINER &&
					reduxState[props.reduxContainerName].list.filter(
						(item) =>
							item.project_id ===
							reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem.id
					).length < 1)
			) {
				const emptyListMessageContainer = document.getElementsByClassName(
					"js-empty-list-message-container"
				)[0];
				emptyListMessageContainer.style.height =
					reduxState[SIZE_CONTAINER].variables.window.height -
					reduxState[SIZE_CONTAINER].variables.navbar.height -
					reduxState[SIZE_CONTAINER].constants.listViewTopBarHeight.height -
					reduxState[SIZE_CONTAINER].constants.listViewTableRowHeight -
					reduxState[SIZE_CONTAINER].constants.scrollbarWidth +
					"px";
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER],
	]);

	// Fills remaining space in a table row after status
	useEffect(() => {
		if (reduxState[SIZE_CONTAINER].variables.window !== null) {
			let remainingSpaceElement = document.getElementsByClassName(
				"js-remaining-space"
			)[0];
			remainingSpaceElement.style.width =
				reduxState[SIZE_CONTAINER].variables.window.width -
				getElementLocation(
					document.getElementsByClassName("js-remaining-space")[0]
				).left +
				"px";
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].variables,
	]);

	const checkAllItems = () => {
		let allItems = [];
		for (let item of getSearchedFilteredSortedList(
			reduxState,
			props.reduxContainerName
		)) {
			allItems.push(item.id);
		}

		dispatch(setProjectOrBugMassDeleteList(props.reduxContainerName, allItems));
	};

	const uncheckAllItems = () => {
		dispatch(setProjectOrBugMassDeleteList(props.reduxContainerName, []));
	};

	const openMassDeleteItemsModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listViewDeleteModal: true,
			})
		);
	};

	const createMassDeleteButton = (
		shouldBeActive,
		onclickfunction,
		iconClassName,
		buttonAltText,
		iconAltText
	) => {
		return (
			<div
				className={
					"list-table__header__mass-delete-options-container__button" +
					(shouldBeActive
						? ""
						: " list-table__header__mass-delete-options-container__button--disabled")
				}
				alt={buttonAltText}
				onClick={onclickfunction}
			>
				<i
					className={"fa " + iconClassName}
					aria-hidden="true"
					alt={iconAltText}
				/>
			</div>
		);
	};

	return (
		<div
			className={
				"list-table-component js-list-table-container" +
				// If a sidebar or modal is present overtop of the table
				// ...or the emptyListMessage is present
				(Object.values(reduxState[ACCOUNT_CONTAINER].componentsDisplay).indexOf(
					true
				) > -1 ||
				reduxState[props.reduxContainerName].componentsDisplay
					.listViewCreateItemSidbar === true ||
				(props.reduxContainerName === PROJECT_CONTAINER &&
					reduxState[props.reduxContainerName].list.length < 1) ||
				(props.reduxContainerName === BUG_CONTAINER &&
					reduxState[props.reduxContainerName].list.filter(
						(item) =>
							item.project_id ===
							reduxState[PROJECT_CONTAINER].componentsDisplay
								.itemViewCurrentItem.id
					).length < 1)
					? " list-table-component--no-scroll"
					: "")
			}
		>
			<table className="list-table">
				<thead className="">
					<tr className="list-table__row">
						<th
							className={
								"list-table__header list-table__header--for-mass-delete" +
								getListHeaderBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						>
							<div className="list-table__header__mass-delete-options-container js-mass-delete-buttons-container">
								{createMassDeleteButton(
									reduxState[props.reduxContainerName].massDeleteList.length <
										getSearchedFilteredSortedList(
											reduxState,
											props.reduxContainerName
										).length,
									checkAllItems,
									"fa-check-square-o",
									"Button to check all " +
										(props.reduxContainerName === PROJECT_CONTAINER
											? "projects"
											: "bugs"),
									"Icon of a check mark inside a square"
								)}
								{createMassDeleteButton(
									reduxState[props.reduxContainerName].massDeleteList.length >
										0,
									uncheckAllItems,
									"fa-square-o",
									"Button to uncheck all " +
										(props.reduxContainerName === PROJECT_CONTAINER
											? "projects"
											: "bugs"),
									"Icon of an empty square"
								)}
								{createMassDeleteButton(
									reduxState[props.reduxContainerName].massDeleteList.length >
										0,
									openMassDeleteItemsModal,
									"fa-trash-o",
									"Button to delete all checked " +
										(props.reduxContainerName === PROJECT_CONTAINER
											? "projects"
											: "bugs"),
									"Icon of a trash can"
								)}
							</div>
						</th>
						{reduxState[GENERAL_CONTAINER].sortCategories.map(
							(categoryObject, idx) => {
								return (
									<th
										key={idx}
										className={
											"list-table__header" +
											getListHeaderBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
												reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											)
										}
									>
										<span className="list-table__header__span">{categoryObject.category}</span>
										<span className="list-table__header__sort-arrow-container">
											<SortArrowsButton
												reduxContainerName={props.reduxContainerName}
												sortId={categoryObject.sort_id}
												sortFor={categoryObject.category}
												uniqueId={null}
												dark_mode={
													reduxState[ACCOUNT_CONTAINER].settings.dark_mode
												}
											/>
										</span>
									</th>
								);
							}
						)}
						<th
							className={
								"list-table__header" +
								getListHeaderBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						>
							<span className="list-table__header__span">
								{props.reduxContainerName === PROJECT_CONTAINER
									? "Bugs Completed"
									: "Comments"}
							</span>
						</th>
						<th
							className={
								"list-table__header js-remaining-space" +
								getListHeaderBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
						>
							{/*Fills remaining empty space*/}
						</th>
					</tr>
				</thead>
				<tbody>
					{getSearchedFilteredSortedList(
						reduxState,
						props.reduxContainerName
					).map((item, idx) => {
						return (
							<ListTableRow
								key={idx}
								item={item}
								reduxContainerName={props.reduxContainerName}
							/>
						);
					})}
					{/*If the list has items, creates an empty space at the bottom of the table*/}
					{(props.reduxContainerName === PROJECT_CONTAINER &&
						reduxState[props.reduxContainerName].list.length > 0) ||
					(props.reduxContainerName === BUG_CONTAINER &&
						reduxState[props.reduxContainerName].list.filter(
							(item) =>
								item.project_id ===
								reduxState[PROJECT_CONTAINER].componentsDisplay
									.itemViewCurrentItem.id
						).length > 0) ? (
						<tr className="list-table__row--empty" />
					) : null}
				</tbody>
			</table>
			{/*If the list has no items, displays a message saying list is empty*/}
			{(props.reduxContainerName === PROJECT_CONTAINER &&
				reduxState[props.reduxContainerName].list.length > 0) ||
			(props.reduxContainerName === BUG_CONTAINER &&
				reduxState[props.reduxContainerName].list.filter(
					(item) =>
						item.project_id ===
						reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
							.id
				).length > 0) ? null : (
				<div className="empty-list-message-centering-container js-empty-list-message-container">
					<div
						className={
							"empty-list-message-centering-container__message" +
							getListViewEmptyListMessageTextColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
					>
						{props.reduxContainerName === PROJECT_CONTAINER
							? "Account has no projects created."
							: "This project has no bugs tracked"}
					</div>
				</div>
			)}
		</div>
	);
}
