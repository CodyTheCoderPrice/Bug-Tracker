import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	setWhichAccountComponentsDisplay,
	setProjectsSearchFilterSort,
} from "../../../../actions";

import "../../../../SCSS/projects-bugs-shared/searchFilterSortBar.scss";

export default function SearchFilterSortBar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchBarText, setSearchBarText] = useState("");

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
		setSearchBarText(e.target.value);
	};

	const searchBarKeyDown = (event) => {
		if (event.keyCode === 13) {
			dispatch(
				setProjectsSearchFilterSort({
					...reduxState.projectsSearchFilterSort,
					// Converts string to boolean by setting equal
					// ...to whether the value == true
					searchKeyWordString: searchBarText,
				})
			);
		}
	};

	const onChangeSortByType = (e) => {
		dispatch(
			setProjectsSearchFilterSort({
				...reduxState.projectsSearchFilterSort,
				[e.target.name]: Number(e.target.value),
			})
		);
	};

	const onChangeSortByAscending = (e) => {
		dispatch(
			setProjectsSearchFilterSort({
				...reduxState.projectsSearchFilterSort,
				// Converts string to boolean by setting equal
				// ...to whether the value == true
				[e.target.name]: e.target.value == "true",
			})
		);
	};

	const onChangeFilter = (e) => {
		const value = Number(e.target.value);
		let deepCopyFilterArray = [
			...reduxState.projectsSearchFilterSort[e.target.name],
		];
		const index = deepCopyFilterArray.indexOf(value);

		if (index === -1) {
			deepCopyFilterArray.push(value);
		} else {
			deepCopyFilterArray.splice(index, 1);
		}

		console.log(e.target.name + " --> " + deepCopyFilterArray);

		dispatch(
			setProjectsSearchFilterSort({
				...reduxState.projectsSearchFilterSort,
				[e.target.name]: deepCopyFilterArray,
			})
		);
	};

	return (
		<div className="search-filter-sort-component">
			<div className="search-filter-sort-bar js-project-search-filter-sort-bar">
				<div className="search-filter-sort-bar__centering-container search-filter-sort-bar__centering-container--for-new-project-button">
					<div
						className="search-filter-sort-bar__centering-container__new-project-button"
						onClick={openCreateProjectSidebar}
					>
						<i className="fa fa-plus" aria-hidden="true" />
						New Project
					</div>
				</div>
				<div className="search-filter-sort-bar__centering-container search-filter-sort-bar__centering-container--for-search-bar">
					<input
						type="text"
						name="searchBarText"
						onChange={(e) => onChangeSearchBar(e)}
						onKeyDown={(e) => searchBarKeyDown(e)}
						value={searchBarText.searchBarText}
						className="search-filter-sort-bar__centering-container__search-bar"
					/>
				</div>
				<div className="search-filter-sort-bar__centering-container search-filter-sort-bar__centering-container--for-sort-by-type">
					<div className="search-filter-sort-bar__centering-container__inner-container">
						<label
							htmlFor="projects-sort-by-type"
							className="search-filter-sort-bar__centering-container__inner-container__order-by-type-label"
						>
							Sort by:
						</label>
						<select
							name="sortByType"
							value={reduxState.projectsSearchFilterSort.sortByType}
							onChange={(e) => onChangeSortByType(e)}
							id="projects-sort-by-type"
							className="search-filter-sort-bar__centering-container__inner-container__order-by-type-select"
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
				<div className="search-filter-sort-bar__centering-container search-filter-sort-bar__centering-container--for-sort-by-ascending">
					<div className="search-filter-sort-bar__centering-container__inner-container search-filter-sort-bar__centering-container__inner-container--full-width">
						<div className="search-filter-sort-bar__centering-container__inner-container__block search-filter-sort-bar__centering-container__inner-container__block--bottom-margin">
							<input
								type="radio"
								id="projects-radio-ascending"
								name="sortByAscending"
								value="true"
								onChange={(e) => onChangeSortByAscending(e)}
							/>
							<label htmlFor="projects-radio-ascending">Ascending</label>
						</div>
						<div className="search-filter-sort-bar__centering-container__inner-container__block">
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
				<div className="search-filter-sort-bar__filter-container">
					<div className="search-filter-sort-bar__filter-container__button">
						<span className="search-filter-sort-bar__filter-container__button__text">
							<i className="fa fa-filter" aria-hidden="true" /> Filter
						</span>
					</div>
					<div className="search-filter-sort-bar__filter-container__content-container">
						<div className="search-filter-sort-bar__filter-container__content-container__content">
							<span className="search-filter-sort-bar__filter-container__content-container__content__title">
								Priority
							</span>
							<div className="search-filter-sort-bar__filter-container__content-container__content__block">
								<input
									type="checkbox"
									id="projects-priority-filter-1"
									name="priorityFilter"
									value="1"
									onChange={(e) => onChangeFilter(e)}
									checked={reduxState.projectsSearchFilterSort.priorityFilter.includes(
										1
									)}
								/>
								<label htmlFor="projects-priority-filter-1">Not Assigned</label>
							</div>
							<div className="search-filter-sort-bar__filter-container__content-container__content__block">
								<input
									type="checkbox"
									id="projects-priority-filter-2"
									name="priorityFilter"
									value="2"
									onChange={(e) => onChangeFilter(e)}
									checked={reduxState.projectsSearchFilterSort.priorityFilter.includes(
										2
									)}
								/>
								<label htmlFor="projects-priority-filter-2">Low</label>
							</div>
							<div className="search-filter-sort-bar__filter-container__content-container__content__block">
								<input
									type="checkbox"
									id="projects-priority-filter-3"
									name="priorityFilter"
									value="3"
									onChange={(e) => onChangeFilter(e)}
									checked={reduxState.projectsSearchFilterSort.priorityFilter.includes(
										3
									)}
								/>
								<label htmlFor="projects-priority-filter-3">Medium</label>
							</div>
							<div className="search-filter-sort-bar__filter-container__content-container__content__block">
								<input
									type="checkbox"
									id="projects-priority-filter-4"
									name="priorityFilter"
									value="4"
									onChange={(e) => onChangeFilter(e)}
									checked={reduxState.projectsSearchFilterSort.priorityFilter.includes(
										4
									)}
								/>
								<label htmlFor="projects-priority-filter-4">High</label>
							</div>
						</div>
						<div className="search-filter-sort-bar__filter-container__content-container__content search-filter-sort-bar__filter-container__content-container__content--right">
							<span className="search-filter-sort-bar__filter-container__content-container__content__title">
								Status
							</span>
							<div className="search-filter-sort-bar__filter-container__content-container__content__block">
								<input
									type="checkbox"
									id="projects-status-filter-1"
									name="statusFilter"
									value="1"
									onChange={(e) => onChangeFilter(e)}
									checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
										1
									)}
								/>
								<label htmlFor="projects-status-filter-1">Not Assigned</label>
							</div>
							<div className="search-filter-sort-bar__filter-container__content-container__content__block">
								<input
									type="checkbox"
									id="projects-status-filter-2"
									name="statusFilter"
									value="2"
									onChange={(e) => onChangeFilter(e)}
									checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
										2
									)}
								/>
								<label htmlFor="projects-status-filter-2">Planning</label>
							</div>
							<div className="search-filter-sort-bar__filter-container__content-container__content__block">
								<input
									type="checkbox"
									id="projects-status-filter-3"
									name="statusFilter"
									value="3"
									onChange={(e) => onChangeFilter(e)}
									checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
										3
									)}
								/>
								<label htmlFor="projects-status-filter-3">Developing</label>
							</div>
							<div className="search-filter-sort-bar__filter-container__content-container__content__block">
								<input
									type="checkbox"
									id="projects-status-filter-4"
									name="statusFilter"
									value="4"
									onChange={(e) => onChangeFilter(e)}
									checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
										4
									)}
								/>
								<label htmlFor="projects-status-filter-4">Testing</label>
							</div>
							<div className="search-filter-sort-bar__filter-container__content-container__content__block">
								<input
									type="checkbox"
									id="projects-status-filter-5"
									name="statusFilter"
									value="5"
									onChange={(e) => onChangeFilter(e)}
									checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
										5
									)}
								/>
								<label htmlFor="projects-status-filter-5">Completed</label>
							</div>
							<div className="search-filter-sort-bar__filter-container__content-container__content__block">
								<input
									type="checkbox"
									id="projects-status-filter-6"
									name="statusFilter"
									value="6"
									onChange={(e) => onChangeFilter(e)}
									checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
										6
									)}
								/>
								<label htmlFor="projects-status-filter-6">On Hold</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
