import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setProjectOrBugMassDeleteList,
	setWhichProjectOrBugComponentsDisplay,
} from "../../../../actions";

import { getElementLocation } from "../../../../utils/displaySizeUtils";

import { searchFilterSort } from "../../../../utils/searchFilterSortUtils";

import { toggleDisableButtons } from "../../../../utils/massDeleteUtils";

// Components
import ListTableSearchFilterSortBar from "./ListTableSearchFilterSortBar"
import ListTableRow from "./ListTableRow";
import ListTableSortArrowsButton from "./ListTableSortArrowsButton";

import "../../../../SCSS/home/projects-bugs-shared/list/listTableAndRows.scss";

export default function ListTable(props) {
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
			"project-table__header__mass-delete-options"
		);
	}, [reduxState[props.reduxContainerName].massDeleteList]);

	const checkAllProjects = () => {
		let allProjects = [];
		for (let project of reduxState[props.reduxContainerName].list) {
			allProjects.push(project.id);
		}

		dispatch(setProjectOrBugMassDeleteList(props.reduxContainerName, allProjects));
	};

	const uncheckAllProjects = () => {
		dispatch(setProjectOrBugMassDeleteList(props.reduxContainerName, []));
	};

	const openMassDeleteProjectsModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				listTable: true,
				listTableMassDeleteItemsModal: true,
			})
		);
	};

	return (
		<div className="projects-table-component">
			<ListTableSearchFilterSortBar reduxContainerName={props.reduxContainerName} />
			<table className="projects-table">
				<thead className="">
					<tr className="project-table__row">
						<th className="project-table__header project-table__header--for-mass-delete">
							<div className="project-table__header__mass-delete-options">
								<div
									className="project-table__header__mass-delete-options__button"
									onClick={checkAllProjects}
								>
									<i className="fa fa-check-square-o" aria-hidden="true" />
								</div>
								<div
									className="project-table__header__mass-delete-options__button"
									onClick={uncheckAllProjects}
								>
									<i className="fa fa-square-o" aria-hidden="true" />
								</div>
								<div
									className="project-table__header__mass-delete-options__button"
									onClick={openMassDeleteProjectsModal}
								>
									<i className="fa fa-trash-o" aria-hidden="true" />
								</div>
							</div>
						</th>
						<th className="project-table__header js-project-table__header">
							<span className="project-table__header__span">Name</span>
							<ListTableSortArrowsButton sortId={1} sortFor="Name" reduxContainerName={props.reduxContainerName} />
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">Created on</span>
							<ListTableSortArrowsButton sortId={2} sortFor="Created on" reduxContainerName={props.reduxContainerName} />
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">Start Date</span>
							<ListTableSortArrowsButton sortId={3} sortFor="Start Date" reduxContainerName={props.reduxContainerName} />
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">Due Date</span>
							<ListTableSortArrowsButton sortId={4} sortFor="Due Date" reduxContainerName={props.reduxContainerName} />
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">Priority</span>
							<ListTableSortArrowsButton sortId={5} sortFor="Priority" reduxContainerName={props.reduxContainerName} />
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">Status</span>
							<ListTableSortArrowsButton sortId={6} sortFor="Status" reduxContainerName={props.reduxContainerName} />
						</th>
						<th className="project-table__header js-remaining-space">
							{/*Fills remaining empty space*/}
						</th>
					</tr>
				</thead>
				<tbody>
					{/*Spread operator used for deep copy so 
					  ...original projects array is unaffected*/}
					{searchFilterSort(
						[...reduxState[props.reduxContainerName].list],
						reduxState[props.reduxContainerName].searchFilterSort
					).map((project, i) => {
						return <ListTableRow key={i} project={project} reduxContainerName={props.reduxContainerName} />;
					})}
					{/*Creates an empty space at the bottom*/}
					<tr className="project-table__row--empty" />
				</tbody>
			</table>
		</div>
	);
}
