import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setProjectOrBugMassDeleteList,
	setWhichProjectOrBugComponentsDisplay,
} from "../../../../actions";

import {
	getListViewTableComponentRowHeaderElementBoxShadowAndBackgroundColorClassNameForLightOrDarkMode,
	getSearchedFilteredSortedList,
	getListViewComponentEmptyListMessageElementTextColorClassNameForLightOrDarkMode,
} from "../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSquare,
	faSquareCheck,
	faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

// Components
import ListTableRow from "./ListViewTableItemRow";
import SortArrowsButton from "../../../basic/SortArrowsButton";

export default function ListViewTable(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	function shouldEmptyListMessageDisplay() {
		return (
			(props.reduxContainerName === PROJECT_CONTAINER &&
				reduxState[props.reduxContainerName].list.length < 1) ||
			(props.reduxContainerName === BUG_CONTAINER &&
				reduxState[props.reduxContainerName].list.filter(
					(item) =>
						item.project_id ===
						reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
							.id
				).length < 1)
		);
	}

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

	const openDeleteModalForMassItems = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				deleteModalComponentForListViewShouldDisplay: true,
			})
		);
	};

	const createMassDeleteButton = (
		shouldBeActive,
		onclickfunction,
		iconClassName,
		buttonAltText
	) => {
		return (
			<div
				className={
					"list-table__row__header__mass-delete-options-container__button" +
					(shouldBeActive
						? ""
						: " list-table__row__header__mass-delete-options-container__button--disabled")
				}
				alt={buttonAltText}
				onClick={onclickfunction}
			>
				<FontAwesomeIcon icon={iconClassName} aria-hidden="true" />
			</div>
		);
	};

	return (
		<div className="list-view-table-component js-list-view-table-component">
			<table
				className={
					"list-table" +
					(shouldEmptyListMessageDisplay()
						? " list-table--empty"
						: "")
				}
			>
				<thead>
					<tr className="list-table__row">
						<th
							className={
								"list-table__row__header list-table__row__header--for-mass-delete" +
								getListViewTableComponentRowHeaderElementBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
							scope="col"
						>
							<div className="list-table__row__header__mass-delete-options-container js-mass-delete-buttons-container">
								{createMassDeleteButton(
									reduxState[props.reduxContainerName].massDeleteList.length <
										getSearchedFilteredSortedList(
											reduxState,
											props.reduxContainerName
										).length,
									checkAllItems,
									faSquareCheck,
									"Button to check all " +
										(props.reduxContainerName === PROJECT_CONTAINER
											? "projects"
											: "bugs")
								)}
								{createMassDeleteButton(
									reduxState[props.reduxContainerName].massDeleteList.length >
										0,
									uncheckAllItems,
									faSquare,
									"Button to uncheck all " +
										(props.reduxContainerName === PROJECT_CONTAINER
											? "projects"
											: "bugs")
								)}
								{createMassDeleteButton(
									reduxState[props.reduxContainerName].massDeleteList.length >
										0,
									openDeleteModalForMassItems,
									faTrashCan,
									"Button to delete all checked " +
										(props.reduxContainerName === PROJECT_CONTAINER
											? "projects"
											: "bugs")
								)}
							</div>
						</th>
						{reduxState[GENERAL_CONTAINER].sortCategories.map(
							(categoryObject, idx) => {
								return (
									<th
										className={
											"list-table__row__header" +
											getListViewTableComponentRowHeaderElementBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
												reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											)
										}
										key={idx}
										scope="col"
									>
										<span>{categoryObject.category}</span>
										<span className="list-table__row__header__sort-arrow-container">
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
								"list-table__row__header" +
								getListViewTableComponentRowHeaderElementBoxShadowAndBackgroundColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								)
							}
							scope="col"
						>
							<span>
								{props.reduxContainerName === PROJECT_CONTAINER
									? "Bugs Completed"
									: "Comments"}
							</span>
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
				</tbody>
			</table>
			{/*If the list has no items, displays a message saying list is empty*/}
			{!shouldEmptyListMessageDisplay() ? null : (
				<div className="empty-list-message-centering-container js-empty-list-message-container">
					<div
						className={
							"empty-list-message-centering-container__message" +
							getListViewComponentEmptyListMessageElementTextColorClassNameForLightOrDarkMode(
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
