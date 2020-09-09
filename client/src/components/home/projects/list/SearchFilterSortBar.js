import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	setWhichAccountComponentsDisplay,
	setProjectsSearchFilterSort,
} from "../../../../actions";

import { useSearchBarResizeAndBorderEventListener } from "../../../../utils/searchBarHookUtils";

import { toggleDropdownButtonDisplay } from "../../../../utils/buttonUtils";

import "../../../../SCSS/projects-bugs-shared/searchFilterSortBar.scss";

export default function SearchFilterSortBar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchBarText, setSearchBarText] = useState("");

	const [showFilterDropdown, setShowFilterDropdown] = useState(false);

	// This custom hook resizes the searchbar to take up the space
	// ...in the middle of the search-sort-filter-bar. Also adds
	// ... an event listener to highlight the searchbar
	const [] = useSearchBarResizeAndBorderEventListener(
		reduxState,
		"js-projects-search-bar",
		"js-projects-search-bar-button",
		"js-projects-search-bar-and-button-inner-container",
		"search-filter-sort-bar__centering-container__inner-container--search-bar-border",
		"js-new-project-button-centering-container",
		"js-projects-sort-filter-group-container",
		"js-projects-search-bar-centering-container"
	);

	useEffect(() => {
		toggleDropdownButtonDisplay(
			showFilterDropdown,
			document.getElementsByClassName("js-projects-filter-button")[0],
			document.getElementsByClassName(
				"js-projects-filter-content-container"
			)[0],
			"search-filter-sort-bar__filter-container__button--clicked"
		);
	}, [showFilterDropdown]);

	const toggleFilterDropdown = () => {
		setShowFilterDropdown(!showFilterDropdown);
	};

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

	const updateSearchKeyWordString = () => {
		dispatch(
			setProjectsSearchFilterSort({
				...reduxState.projectsSearchFilterSort,
				// Converts string to boolean by setting equal
				// ...to whether the value == true
				searchKeyWordString: searchBarText,
			})
		);
	};

	const searchBarKeyDown = (event) => {
		if (event.keyCode === 13) {
			updateSearchKeyWordString();
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
				// ...to whether the value === true
				[e.target.name]: e.target.value === "true",
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
				<div className="search-filter-sort-bar__centering-container search-filter-sort-bar__centering-container--for-new-project-button js-new-project-button-centering-container">
					<div
						className="search-filter-sort-bar__centering-container__new-project-button"
						onClick={openCreateProjectSidebar}
					>
						<i className="fa fa-plus" aria-hidden="true" /> New Project
					</div>
				</div>
				<div className="search-filter-sort-bar__centering-container search-filter-sort-bar__centering-container--for-search-bar js-projects-search-bar-centering-container">
					<div className="search-filter-sort-bar__centering-container__inner-container js-projects-search-bar-and-button-inner-container">
						<input
							type="text"
							name="searchBarText"
							onChange={(e) => onChangeSearchBar(e)}
							onKeyDown={(e) => searchBarKeyDown(e)}
							value={searchBarText.searchBarText}
							className="search-filter-sort-bar__centering-container__inner-container__search-bar js-projects-search-bar"
						/>
						<div
							className="search-filter-sort-bar__centering-container__inner-container__search-bar-button js-projects-search-bar-button"
							onClick={updateSearchKeyWordString}
						>
							<span className="search-filter-sort-bar__centering-container__inner-container__search-bar-button__icon">
								<i className="fa fa-search" aria-hidden="true" />
							</span>
						</div>
					</div>
				</div>
				<div className="search-filter-sort-bar__sort-filter-group-container js-projects-sort-filter-group-container">
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
									name="sortByAscending"
									value="true"
									onChange={(e) => onChangeSortByAscending(e)}
									id="projects-radio-ascending"
									checked={reduxState.projectsSearchFilterSort.sortByAscending}
								/>
								<label htmlFor="projects-radio-ascending">Ascending</label>
							</div>
							<div className="search-filter-sort-bar__centering-container__inner-container__block">
								<input
									type="radio"
									name="sortByAscending"
									value="false"
									onChange={(e) => onChangeSortByAscending(e)}
									id="projects-radio-descending"
									checked={!reduxState.projectsSearchFilterSort.sortByAscending}
								/>
								<label htmlFor="projects-radio-descending">Descending</label>
							</div>
						</div>
					</div>
					<div className="search-filter-sort-bar__filter-container">
						<div
							className="search-filter-sort-bar__filter-container__button js-projects-filter-button"
							onClick={toggleFilterDropdown}
						>
							<span className="search-filter-sort-bar__filter-container__button__text">
								<i className="fa fa-filter" aria-hidden="true" /> Filter
							</span>
						</div>
						<div className="search-filter-sort-bar__filter-container__content-dropdown js-projects-filter-content-container">
							<div className="search-filter-sort-bar__filter-container__content-dropdown__content">
								<span className="search-filter-sort-bar__filter-container__content-dropdown__content__title">
									Priority
								</span>
								{reduxState.priorityStatusArrays.projectPriority.map(
									(obj, i) => {
										return (
											<div
												key={i}
												className="search-filter-sort-bar__filter-container__content-dropdown__content__block"
											>
												<input
													type="checkbox"
													name="priorityFilter"
													value={obj.id}
													onChange={(e) => onChangeFilter(e)}
													checked={reduxState.projectsSearchFilterSort.priorityFilter.includes(
														obj.id
													)}
													id={"projects-priority-filter-" + obj.id}
													className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
												/>
												<label
													htmlFor={"projects-priority-filter-" + obj.id}
													className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
												>
													{obj.option !== "" ? obj.option : "Not Assigned"}
												</label>
											</div>
										);
									}
								)}
							</div>
							<div className="search-filter-sort-bar__filter-container__content-dropdown__content search-filter-sort-bar__filter-container__content-dropdown__content--right">
								<span className="search-filter-sort-bar__filter-container__content-dropdown__content__title">
									Status
								</span>
								{reduxState.priorityStatusArrays.projectStatus.map((obj, i) => {
									return (
										<div
											key={i}
											className="search-filter-sort-bar__filter-container__content-dropdown__content__block"
										>
											<input
												type="checkbox"
												name="statusFilter"
												value={obj.id}
												onChange={(e) => onChangeFilter(e)}
												checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
													obj.id
												)}
												id={"projects-status-filter-" + obj.id}
												className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
											/>
											<label
												htmlFor={"projects-status-filter-" + obj.id}
												className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
											>
												{obj.option !== "" ? obj.option : "Not Assigned"}
											</label>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
