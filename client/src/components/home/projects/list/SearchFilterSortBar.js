import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	setWhichAccountComponentsDisplay,
	setProjectsSearchFilterSort,
} from "../../../../actions";

import { getElementSize } from "../../../../utils/displaySizeUtils";

import { toggleDropdownButtonDisplay } from "../../../../utils/buttonUtils";

import "../../../../SCSS/projects-bugs-shared/searchFilterSortBar.scss";

export default function SearchFilterSortBar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchBarText, setSearchBarText] = useState("");

	const [showFilterDropdown, setShowFilterDropdown] = useState(false);

	// Used for optimization in search-bar resizes
	const [
		regularlyUsedContainerSizes,
		setRegularlyUsedContainerSizes,
	] = useState(null);

	// Resize search-bar to fit search-filter-sort-bar width
	useEffect(() => {
		if (reduxState.displaySizeVariables.navbar !== null) {
			// Makes sure regularlyUsedContainerSizes gets set
			if (regularlyUsedContainerSizes === null) {
				setRegularlyUsedContainerSizes({
					newProjectsButtonContainer: getElementSize(
						document.getElementsByClassName(
							"js-new-project-button-container"
						)[0]
					),
					sortAndFilterContainer: getElementSize(
						document.getElementsByClassName("js-sort-filter-group-container")[0]
					),
				});

				// Prevents crash since regularlyUsedContainerSizes will still
				// ...be null for remainder of this useEfffect iteration
				return;
			}

			let searchBarContainer = document.getElementsByClassName(
				"js-search-bar-container"
			)[0];

			console.log("-----");
			console.log(reduxState.displaySizeVariables.navbar.width);
			console.log(regularlyUsedContainerSizes.newProjectsButtonContainer.width);
			console.log(regularlyUsedContainerSizes.sortAndFilterContainer.width);

			searchBarContainer.style.width =
				reduxState.displaySizeVariables.navbar.width -
				regularlyUsedContainerSizes.newProjectsButtonContainer.width -
				regularlyUsedContainerSizes.sortAndFilterContainer.width +
				"px";

			console.log(searchBarContainer.style.width);
		}
	}, [reduxState.displaySizeVariables, regularlyUsedContainerSizes]);

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
				<div className="search-filter-sort-bar__centering-container search-filter-sort-bar__centering-container--for-new-project-button js-new-project-button-container">
					<div
						className="search-filter-sort-bar__centering-container__new-project-button"
						onClick={openCreateProjectSidebar}
					>
						<i className="fa fa-plus" aria-hidden="true" /> New Project
					</div>
				</div>
				<div className="search-filter-sort-bar__centering-container search-filter-sort-bar__centering-container--for-search-bar js-search-bar-container">
					<input
						type="text"
						name="searchBarText"
						onChange={(e) => onChangeSearchBar(e)}
						onKeyDown={(e) => searchBarKeyDown(e)}
						value={searchBarText.searchBarText}
						className="search-filter-sort-bar__centering-container__search-bar"
					/>
				</div>
				<div className="search-filter-sort-bar__sort-filter-group-container js-sort-filter-group-container">
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
								<div className="search-filter-sort-bar__filter-container__content-dropdown__content__block">
									<input
										type="checkbox"
										name="priorityFilter"
										value="1"
										onChange={(e) => onChangeFilter(e)}
										checked={reduxState.projectsSearchFilterSort.priorityFilter.includes(
											1
										)}
										id="projects-priority-filter-1"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor="projects-priority-filter-1"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
									>
										Not Assigned
									</label>
								</div>
								<div className="search-filter-sort-bar__filter-container__content-dropdown__content__block">
									<input
										type="checkbox"
										name="priorityFilter"
										value="2"
										onChange={(e) => onChangeFilter(e)}
										checked={reduxState.projectsSearchFilterSort.priorityFilter.includes(
											2
										)}
										id="projects-priority-filter-2"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor="projects-priority-filter-2"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
									>
										Low
									</label>
								</div>
								<div className="search-filter-sort-bar__filter-container__content-dropdown__content__block">
									<input
										type="checkbox"
										name="priorityFilter"
										value="3"
										onChange={(e) => onChangeFilter(e)}
										checked={reduxState.projectsSearchFilterSort.priorityFilter.includes(
											3
										)}
										id="projects-priority-filter-3"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor="projects-priority-filter-3"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
									>
										Medium
									</label>
								</div>
								<div className="search-filter-sort-bar__filter-container__content-dropdown__content__block">
									<input
										type="checkbox"
										name="priorityFilter"
										value="4"
										onChange={(e) => onChangeFilter(e)}
										checked={reduxState.projectsSearchFilterSort.priorityFilter.includes(
											4
										)}
										id="projects-priority-filter-4"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor="projects-priority-filter-4"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
									>
										High
									</label>
								</div>
							</div>
							<div className="search-filter-sort-bar__filter-container__content-dropdown__content search-filter-sort-bar__filter-container__content-dropdown__content--right">
								<span className="search-filter-sort-bar__filter-container__content-dropdown__content__title">
									Status
								</span>
								<div className="search-filter-sort-bar__filter-container__content-dropdown__content__block">
									<input
										type="checkbox"
										name="statusFilter"
										value="1"
										onChange={(e) => onChangeFilter(e)}
										checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
											1
										)}
										id="projects-status-filter-1"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor="projects-status-filter-1"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
									>
										Not Assigned
									</label>
								</div>
								<div className="search-filter-sort-bar__filter-container__content-dropdown__content__block">
									<input
										type="checkbox"
										name="statusFilter"
										value="2"
										onChange={(e) => onChangeFilter(e)}
										checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
											2
										)}
										id="projects-status-filter-2"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor="projects-status-filter-2"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
									>
										Planning
									</label>
								</div>
								<div className="search-filter-sort-bar__filter-container__content-dropdown__content__block">
									<input
										type="checkbox"
										name="statusFilter"
										value="3"
										onChange={(e) => onChangeFilter(e)}
										checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
											3
										)}
										id="projects-status-filter-3"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor="projects-status-filter-3"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
									>
										Developing
									</label>
								</div>
								<div className="search-filter-sort-bar__filter-container__content-dropdown__content__block">
									<input
										type="checkbox"
										name="statusFilter"
										value="4"
										onChange={(e) => onChangeFilter(e)}
										checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
											4
										)}
										id="projects-status-filter-4"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor="projects-status-filter-4"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
									>
										Testing
									</label>
								</div>
								<div className="search-filter-sort-bar__filter-container__content-dropdown__content__block">
									<input
										type="checkbox"
										name="statusFilter"
										value="5"
										onChange={(e) => onChangeFilter(e)}
										checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
											5
										)}
										id="projects-status-filter-5"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor="projects-status-filter-5"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
									>
										Completed
									</label>
								</div>
								<div className="search-filter-sort-bar__filter-container__content-dropdown__content__block">
									<input
										type="checkbox"
										name="statusFilter"
										value="6"
										onChange={(e) => onChangeFilter(e)}
										checked={reduxState.projectsSearchFilterSort.statusFilter.includes(
											6
										)}
										id="projects-status-filter-6"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor="projects-status-filter-6"
										className="search-filter-sort-bar__filter-container__content-dropdown__content__block__label"
									>
										On Hold
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
