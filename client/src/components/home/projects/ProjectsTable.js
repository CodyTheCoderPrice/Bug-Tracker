import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

// Components
import ProjectRow from "./ProjectRow";

import "../../../SCSS/projects/projectsTableAndRows.scss";

export default function ProjectsTable() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const openCreateProjectSidebar = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				projectsTable: true,
				createProjectSidbar: true,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
	};

	return (
		<div className="projects-table-component">
			<div className="filter-search-bar js-project-filter-search-bar">
				<div
					className="filter-search-bar__new-project-button"
					onClick={openCreateProjectSidebar}
				>
					New Project
				</div>
			</div>
			<table className="projects-table">
				<thead>
					<tr className="project-table__row">
						<th className="project-table__header js-project-table__header">
							<span className="project-table__header__name">Name</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__priority">Priority</span>
						</th>
						<th className="project-table__header">
							<span className="project-table__header__status">Status</span>
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
							<span className="project-table__header__more-info"></span>
						</th>
						{/*Used to fill the remaining space of the screen (if needed)*/}
						<th className="project-table__header js-remaining-space"></th>
					</tr>
				</thead>
				<tbody>
					{reduxState.projects.map((project, i) => {
						return <ProjectRow key={i} project={project} />;
					})}
				</tbody>
			</table>
		</div>
	);
}
