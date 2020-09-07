import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	setWhichAccountComponentsDisplay,
} from "../../../../actions";

import { getElementLocation } from "../../../../utils/displaySizeUtils";

import { searchFilterSort } from "../../../../utils/searchFilterSortUtils";

// Components
import ProjectRow from "./ProjectRow";

import "../../../../SCSS/projects/projectsTableAndRows.scss";

export default function ProjectsTable() {
	const reduxState = useSelector((state) => state);

	useEffect(() => {
		if (reduxState.displaySizeVariables.window !== null) {
			let remainingSpaceElement = document.getElementsByClassName(
				"js-remaining-space"
			)[0];
			remainingSpaceElement.style.width =
				reduxState.displaySizeVariables.window.width -
				getElementLocation(
					document.getElementsByClassName("js-remaining-space")[0]
				).left +
				"px";
		}
	}, [reduxState.displaySizeVariables]);

	return (
		<div className="projects-table-component">
			<table className="projects-table">
				<thead className="">
					<tr className="project-table__row project-table__row--sticky">
						<th className="project-table__header js-project-table__header">
							<span className="project-table__header__name">Name</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__start-date">
								Created on
							</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__start-date">
								Start Date
							</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__due-date">Due Date</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__priority">Priority</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__status">Status</span>
						</th>
						<th className="project-table__header">{/*For more info link*/}</th>
						<th className="project-table__header js-remaining-space">
							{/*Fills remaining empty space*/}
						</th>
					</tr>
				</thead>
				<tbody>
					{/*Spread operator used for deep copy so 
					  ...original projects array is unaffected*/}
					{searchFilterSort(
						[...reduxState.projects],
						reduxState.projectsSearchFilterSort
					).map((project, i) => {
						return <ProjectRow key={i} project={project} />;
					})}
					{/*Creates an empty space at the bottom*/}
					<tr className="project-table__row--empty" />
				</tbody>
			</table>
		</div>
	);
}
