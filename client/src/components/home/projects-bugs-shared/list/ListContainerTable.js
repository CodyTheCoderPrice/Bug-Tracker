import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	SIZE_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setProjectOrBugMassDeleteList,
	setWhichProjectOrBugComponentsDisplay,
} from "../../../../actions";

import { getElementLocation, searchFilterSort } from "../../../../utils";

// Components
import ListTableRow from "./ListContainerTableRow";
import ListTableSortArrowsButton from "./ListContainerTableSortArrowsButton";

import "../../../../SCSS/home/projects-bugs-shared/list/listContainerTableAndRows.scss";

export default function ListContainerTable(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Adjusts the height and width of the table to fit the screen
	// ...as well as adjust the height of empty-list-message-container
	// ...(if it is present)
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants
				.listContainerSearchFilterSortBar !== null
		) {
			const listTableContainerElement = document.getElementsByClassName(
				"js-list-table-container"
			)[0];

			listTableContainerElement.style.height =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].variables.navbar.height -
				reduxState[SIZE_CONTAINER].constants.listContainerSearchFilterSortBar
					.height +
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
							reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id
					).length < 1)
			) {
				const emptyListMessageContainer = document.getElementsByClassName(
					"js-empty-list-message-container"
				)[0];
				emptyListMessageContainer.style.height =
					reduxState[SIZE_CONTAINER].variables.window.height -
					reduxState[SIZE_CONTAINER].variables.navbar.height -
					reduxState[SIZE_CONTAINER].constants
						.listContainerSearchFilterSortBar.height -
					reduxState[SIZE_CONTAINER].constants.listContainerTableRowHeight -
					reduxState[SIZE_CONTAINER].constants.scrollbar.width +
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
		for (let item of reduxState[props.reduxContainerName].list) {
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
				listContainerMassDeleteItemsModal: true,
			})
		);
	};

	return (
		<div
			className={
				"list-table-component js-list-table-container" +
				// If a sidebar or modal is present overtop of the table
				// ...or the emptyListMessage is present
				(Object.values(
					reduxState[ACCOUNT_CONTAINER].componentsDisplay
				).indexOf(true) > -1 ||
				reduxState[props.reduxContainerName].componentsDisplay
					.listContainerCreateItemSidbar === true ||
				(props.reduxContainerName === PROJECT_CONTAINER &&
					reduxState[props.reduxContainerName].list.length < 1) ||
				(props.reduxContainerName === BUG_CONTAINER &&
					reduxState[props.reduxContainerName].list.filter(
						(item) =>
							item.project_id ===
							reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id
					).length < 1)
					? " list-table-component--no-scroll"
					: "")
			}
		>
			<table className="list-table">
				<thead className="">
					<tr className="list-table__row">
						<th className="list-table__header list-table__header--for-mass-delete">
							<div className="list-table__header__mass-delete-options-container js-mass-delete-buttons-container">
								<div
									className={
										"list-table__header__mass-delete-options-container__button" +
										(reduxState[props.reduxContainerName].massDeleteList
											.length > 0
											? ""
											: " list-table__header__mass-delete-options-container__button--disabled")
									}
									onClick={checkAllItems}
								>
									<i className="fa fa-check-square-o" aria-hidden="true" />
								</div>
								<div
									className={
										"list-table__header__mass-delete-options-container__button" +
										(reduxState[props.reduxContainerName].massDeleteList
											.length > 0
											? ""
											: " list-table__header__mass-delete-options-container__button--disabled")
									}
									onClick={uncheckAllItems}
								>
									<i className="fa fa-square-o" aria-hidden="true" />
								</div>
								<div
									className={
										"list-table__header__mass-delete-options-container__button" +
										(reduxState[props.reduxContainerName].massDeleteList
											.length > 0
											? ""
											: " list-table__header__mass-delete-options-container__button--disabled")
									}
									onClick={openMassDeleteItemsModal}
								>
									<i className="fa fa-trash-o" aria-hidden="true" />
								</div>
							</div>
						</th>
						<th className="list-table__header js-list-table__header">
							<span className="list-table__header__span">Name</span>
							<ListTableSortArrowsButton
								sortTypeId={1}
								sortFor="Name"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">Status</span>
							<ListTableSortArrowsButton
								sortTypeId={2}
								sortFor="Status"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">Priority</span>
							<ListTableSortArrowsButton
								sortTypeId={3}
								sortFor="Priority"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">Created on</span>
							<ListTableSortArrowsButton
								sortTypeId={4}
								sortFor="Created on"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">Start Date</span>
							<ListTableSortArrowsButton
								sortTypeId={5}
								sortFor="Start Date"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">Due Date</span>
							<ListTableSortArrowsButton
								sortTypeId={6}
								sortFor="Due Date"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">
								{props.reduxContainerName === PROJECT_CONTAINER
									? "Bugs Completed"
									: "Comments"}
							</span>
						</th>
						<th className="list-table__header js-remaining-space">
							{/*Fills remaining empty space*/}
						</th>
					</tr>
				</thead>
				<tbody>
					{/*Spread operator used for deep copy so 
					  ...original list array is unaffected*/}
					{searchFilterSort(
						props.reduxContainerName === PROJECT_CONTAINER
							? [...reduxState[props.reduxContainerName].list]
							: [...reduxState[props.reduxContainerName].list].filter(
									(item) =>
										item.project_id ===
										reduxState[PROJECT_CONTAINER].componentsDisplay
											.targetItem.id
							  ),
						reduxState[props.reduxContainerName].searchFilterSort
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
								reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id
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
						reduxState[PROJECT_CONTAINER].componentsDisplay.targetItem.id
				).length > 0) ? null : (
				<div className="empty-list-message-centering-container js-empty-list-message-container">
					<div className="empty-list-message-centering-container__message">
						{props.reduxContainerName === PROJECT_CONTAINER
							? "Account has no projects created."
							: "This project has no bugs tracked"}
					</div>
				</div>
			)}
		</div>
	);
}
