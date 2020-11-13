import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	sizeContainerName,
	projectContainerName,
} from "../../../../reducers/containerNames";

import {
	setProjectOrBugMassDeleteList,
	setWhichProjectOrBugComponentsDisplay,
} from "../../../../actions";

import { getElementLocation } from "../../../../utils/displaySizeUtils";

import { searchFilterSort } from "../../../../utils/searchFilterSortUtils";

// Components
import ListTableRow from "./ListContainerTableRow";
import ListTableSortArrowsButton from "./ListContainerTableSortArrowsButton";

import "../../../../SCSS/home/projects-bugs-shared/list/listContainerTableAndRows.scss";

export default function ListContainerTable(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Adjusts the height of the table to fit the screen
	useEffect(() => {
		if (
			reduxState[sizeContainerName].variables.window !== null &&
			reduxState[sizeContainerName].variables.navbar !== null &&
			reduxState[sizeContainerName].constants
				.listcontainerSearchFilterSortBar !== null
		) {
			const listTableContainerElement = document.getElementsByClassName(
				"js-list-table-container"
			)[0];

			listTableContainerElement.style.height =
				reduxState[sizeContainerName].variables.window.height -
				reduxState[sizeContainerName].variables.navbar.height -
				reduxState[sizeContainerName].constants.listcontainerSearchFilterSortBar
					.height +
				"px";
		}
	}, [reduxState[sizeContainerName]]);

	// Fills remaining space in a table row after status
	useEffect(() => {
		if (reduxState[sizeContainerName].variables.window !== null) {
			let remainingSpaceElement = document.getElementsByClassName(
				"js-remaining-space"
			)[0];
			remainingSpaceElement.style.width =
				reduxState[sizeContainerName].variables.window.width -
				getElementLocation(
					document.getElementsByClassName("js-remaining-space")[0]
				).left +
				"px";
		}
	}, [reduxState[sizeContainerName].variables]);

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
		<div className="list-table-component js-list-table-container">
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
						<th className="list-table__header js-remaining-space">
							{/*Fills remaining empty space*/}
						</th>
					</tr>
				</thead>
				<tbody>
					{/*Spread operator used for deep copy so 
					  ...original list array is unaffected*/}
					{searchFilterSort(
						props.reduxContainerName === projectContainerName
							? [...reduxState[props.reduxContainerName].list]
							: [
									...reduxState[props.reduxContainerName].list.filter(
										(item) =>
											item.project_id ===
											reduxState[projectContainerName].componentsDisplay
												.targetItem.id
									),
							  ],
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
					{/*Creates an empty space at the bottom*/}
					<tr className="list-table__row--empty" />
				</tbody>
			</table>
		</div>
	);
}
