import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import { getElementLocation } from "../../../utils/displaySizeUtils";

import { dateToInt } from "../../../utils/dateUtils";

// Components
import ProjectRow from "./ProjectRow";

import "../../../SCSS/projects/projectsTableAndRows.scss";

export default function ProjectsTable() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchSortFilterInfo, setSearchSortFilterInfo] = useState({
		searchBarText: "",
		sortByAscending: true,
		sortByType: 2,
		priorityFilter: [1, 2, 3, 4],
		statusFilter: [1, 2, 3, 4, 5, 6],
	});

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

	const openCreateProjectSidebar = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				projectsTable: true,
				createProjectSidbar: true,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
	};

	const onChangeSearchBar = (e) => {
		setSearchSortFilterInfo({
			...searchSortFilterInfo,
			[e.target.name]: e.target.value,
		});
	};

	const onChangeSortByType = (e) => {
		setSearchSortFilterInfo({
			...searchSortFilterInfo,
			[e.target.name]: Number(e.target.value),
		});
	};

	const onChangeSortByAscending = (e) => {
		setSearchSortFilterInfo({
			...searchSortFilterInfo,
			[e.target.name]: e.target.value == "true",
		});
	};

	const sortProjects = (projects) => {
		if (searchSortFilterInfo.sortByAscending) {
			switch (searchSortFilterInfo.sortByType) {
				case 1:
					return projects.sort((a, b) => {
						let nameA = a.name.toLowerCase();
						let nameB = b.name.toLowerCase();
						return nameA > nameB ? 1 : -1;
					});
				case 2:
					return projects.sort((a, b) => {
						return dateToInt(a.creation_date) - dateToInt(b.creation_date);
					});
				case 3:
					return projects.sort((a, b) => {
						return dateToInt(a.start_date) - dateToInt(b.start_date);
					});
				case 4:
					return projects.sort((a, b) => {
						return dateToInt(a.due_date) - dateToInt(b.due_date);
					});
				case 5:
					return projects.sort((a, b) => {
						return a.p_priority_id - b.p_priority_id;
					});
				case 6:
					return projects.sort((a, b) => {
						return a.p_status_id - b.p_status_id;
					});
				default:
					return projects;
			}
		} else {
			switch (searchSortFilterInfo.sortByType) {
				case 1:
					return projects.sort((a, b) => {
						let nameA = a.name.toLowerCase();
						let nameB = b.name.toLowerCase();
						return nameB > nameA ? 1 : -1;
					});
				case 2:
					return projects.sort((a, b) => {
						return dateToInt(b.creation_date) - dateToInt(a.creation_date);
					});
				case 3:
					return projects.sort((a, b) => {
						return dateToInt(b.start_date) - dateToInt(a.start_date);
					});
				case 4:
					return projects.sort((a, b) => {
						return dateToInt(b.due_date) - dateToInt(a.due_date);
					});
				case 5:
					return projects.sort((a, b) => {
						return b.p_priority_id - a.p_priority_id;
					});
				case 6:
					return projects.sort((a, b) => {
						return b.p_status_id - a.p_status_id;
					});
				default:
					return projects;
			}
		}
	};

	return (
		<div className="projects-table-component">
			<div className="search-sort-filter-bar js-project-search-sort-filter-bar">
				<div className="search-sort-filter-bar__centering-container search-sort-filter-bar__centering-container--for-new-project-button">
					<div
						className="search-sort-filter-bar__centering-container__new-project-button"
						onClick={openCreateProjectSidebar}
					>
						<i className="fa fa-plus" aria-hidden="true" />
						New Project
					</div>
				</div>
				<div className="search-sort-filter-bar__centering-container search-sort-filter-bar__centering-container--for-search-bar">
					<input
						type="text"
						name="searchBarText"
						onChange={(e) => onChangeSearchBar(e)}
						value={searchSortFilterInfo.searchBarText}
						className="search-sort-filter-bar__centering-container__search-bar"
					/>
				</div>
				<div className="search-sort-filter-bar__centering-container search-sort-filter-bar__centering-container--for-sort-by-type">
					<div className="search-sort-filter-bar__centering-container__inner-container">
						<label
							htmlFor="projects-sort-by-type"
							className="search-sort-filter-bar__centering-container__inner-container__order-by-type-label"
						>
							Sort by:
						</label>
						<select
							name="sortByType"
							value={searchSortFilterInfo.sortByType}
							onChange={(e) => onChangeSortByType(e)}
							id="projects-sort-by-type"
							className="search-sort-filter-bar__centering-container__inner-container__order-by-type-select"
						>
							<option value="0"></option>
							<option value="1">Name</option>
							<option value="2">Created on</option>
							<option value="3">Start Date</option>
							<option value="4">Due Date</option>
							<option value="5">Priority</option>
							<option value="6">Status</option>
						</select>
					</div>
				</div>
				<div className="search-sort-filter-bar__centering-container search-sort-filter-bar__centering-container--for-sort-by-ascending">
					<div className="search-sort-filter-bar__centering-container__inner-container search-sort-filter-bar__centering-container__inner-container--full-width">
						<div className="search-sort-filter-bar__centering-container__inner-container__block search-sort-filter-bar__centering-container__inner-container__block--bottom-margin">
							<input
								type="radio"
								id="projects-radio-ascending"
								name="sortByAscending"
								value="true"
								onChange={(e) => onChangeSortByAscending(e)}
							/>
							<label htmlFor="projects-radio-ascending">Ascending</label>
						</div>
						<div className="search-sort-filter-bar__centering-container__inner-container__block">
							<input
								type="radio"
								id="projects-radio-descending"
								name="sortByAscending"
								value="false"
								onChange={(e) => onChangeSortByAscending(e)}
							/>
							<label htmlFor="projects-radio-descending">Descending</label>
						</div>
					</div>
				</div>
			</div>
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
					{sortProjects(reduxState.projects).map((project, i) => {
						return <ProjectRow key={i} project={project} />;
					})}
					{/*Creates an empty space at the bottom*/}
					<tr className="project-table__row--empty" />
				</tbody>
			</table>
		</div>
	);
}
