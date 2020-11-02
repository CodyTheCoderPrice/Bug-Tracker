import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectContainerName } from "../../../../reducers/containerNames";

import {
	setProjectOrBugMassDeleteList,
	setWhichProjectOrBugComponentsDisplay,
} from "../../../../actions";

import { getElementLocation } from "../../../../utils/displaySizeUtils";

import { searchFilterSort } from "../../../../utils/searchFilterSortUtils";

import { toggleDisableButtons } from "../../../../utils/massDeleteUtils";

// Components
import ListTableRow from "./ListContainerTableRow";
import ListTableSortArrowsButton from "./ListContainerTableSortArrowsButton";

import "../../../../SCSS/home/projects-bugs-shared/list/listContainerTableAndRows.scss";

export default function ListContainerTable(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Fills remaining space in a table row after status
	useEffect(() => {
		if (reduxState.sizeContainer.variables.window !== null) {
			let remainingSpaceElement = document.getElementsByClassName(
				"js-remaining-space"
			)[0];
			remainingSpaceElement.style.width =
				reduxState.sizeContainer.variables.window.width -
				getElementLocation(
					document.getElementsByClassName("js-remaining-space")[0]
				).left +
				"px";
		}
	}, [reduxState.sizeContainer.variables]);

	// Disables mass delete options buttons when no checkboxes are selected
	useEffect(() => {
		toggleDisableButtons(
			reduxState[props.reduxContainerName].massDeleteList.length === 0,
			"js-mass-delete-buttons-container",
			"list-table__header__mass-delete-options-container__button--disabled"
		);
		// eslint-disable-next-line
	}, [reduxState[props.reduxContainerName].massDeleteList]);

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
		<div className="list-table-component">
			<table className="list-table">
				<thead className="">
					<tr className="list-table__row">
						<th className="list-table__header list-table__header--for-mass-delete">
							<div className="list-table__header__mass-delete-options-container js-mass-delete-buttons-container">
								<div
									className="list-table__header__mass-delete-options-container__button"
									onClick={checkAllItems}
								>
									<i className="fa fa-check-square-o" aria-hidden="true" />
								</div>
								<div
									className="list-table__header__mass-delete-options-container__button"
									onClick={uncheckAllItems}
								>
									<i className="fa fa-square-o" aria-hidden="true" />
								</div>
								<div
									className="list-table__header__mass-delete-options-container__button"
									onClick={openMassDeleteItemsModal}
								>
									<i className="fa fa-trash-o" aria-hidden="true" />
								</div>
							</div>
						</th>
						<th className="list-table__header js-list-table__header">
							<span className="list-table__header__span">Name</span>
							<ListTableSortArrowsButton
								sortId={1}
								sortFor="Name"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">Created on</span>
							<ListTableSortArrowsButton
								sortId={2}
								sortFor="Created on"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">Start Date</span>
							<ListTableSortArrowsButton
								sortId={3}
								sortFor="Start Date"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">Due Date</span>
							<ListTableSortArrowsButton
								sortId={4}
								sortFor="Due Date"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">Priority</span>
							<ListTableSortArrowsButton
								sortId={5}
								sortFor="Priority"
								reduxContainerName={props.reduxContainerName}
							/>
						</th>
						<th className="list-table__header">
							<span className="list-table__header__span">Status</span>
							<ListTableSortArrowsButton
								sortId={6}
								sortFor="Status"
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
