import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setMassDelete,
} from "../../../../actions";

import { getElementLocation } from "../../../../utils/displaySizeUtils";

import { searchFilterSort } from "../../../../utils/searchFilterSortUtils";

import { toggleDisableButtons } from "../../../../utils/massDeleteUtils";

// Components
/* import SortButtons from "./SortButtons"; */
import ProjectRow from "./ProjectRow";

import "../../../../SCSS/projects/projectsTableAndRows.scss";

export default function ProjectsTable() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

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

	useEffect(() => {
		toggleDisableButtons(
			reduxState.massDelete.projects.length === 0,
			"project-table__header__mass-delete-options"
		);
	}, [reduxState.massDelete.projects]);

	const checkAllProjects = () => {
		let allProjects = [];
		for (let project of reduxState.projects) {
			allProjects.push(project.project_id);
		}

		dispatch(
			setMassDelete({
				projects: allProjects,
			})
		);
	};

	const uncheckAllProjects = () => {
		dispatch(
			setMassDelete({
				projects: [],
			})
		);
	};

	return (
		<div className="projects-table-component">
			<table className="projects-table">
				<thead className="">
					<tr className="project-table__row project-table__row--sticky">
						<th className="project-table__header project-table__header__checkbox">
							<div className="project-table__header__mass-delete-options">
								<div className="project-table__header__mass-delete-options__button" onClick={checkAllProjects}>
									<i className="fa fa-check-square-o" aria-hidden="true" />
								</div>
								<div className="project-table__header__mass-delete-options__button" onClick={uncheckAllProjects}>
									<i className="fa fa-square-o" aria-hidden="true" />
								</div>
								<div className="project-table__header__mass-delete-options__button">
									<i className="fa fa-trash-o" aria-hidden="true" />
								</div>
							</div>
						</th>
						<th className="project-table__header js-project-table__header">
							<span className="project-table__header__span">Name</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">Created on</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">Start Date</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">Due Date</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">Priority</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">Status</span>
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
