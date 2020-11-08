import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectContainerName } from "../../../../reducers/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	setWhichAccountComponentsDisplay,
	setProjectOrBugSearchFilterSort,
} from "../../../../actions";

import { useSearchBarResizeAndBorderEventListener } from "../../../../utils/searchBarHookUtils";

import { toggleDropdownButtonDisplay } from "../../../../utils/buttonUtils";

import "../../../../SCSS/home/projects-bugs-shared/list/listContainerSearchFilterSortBar.scss";

export default function ListContainerSearchFilterSortBar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchBarText, setSearchBarText] = useState("");

	const [showFilterDropdown, setShowFilterDropdown] = useState(false);

	// Custom hook resizes the searchbar to take up the space
	// ...in the middle of the search-sort-filter-bar. Also adds
	// ... an event listener to highlight the searchbar
	useSearchBarResizeAndBorderEventListener(
		reduxState,
		"js-list-search-bar",
		"js-list-search-bar-button",
		"js-list-search-bar-and-button-search-group-container",
		"centering-container__search-group-container--with-border",
		"js-new-item-button-centering-container",
		"js-list-filter-area-container",
		"js-list-search-bar-centering-container"
	);

	useEffect(() => {
		toggleDropdownButtonDisplay(
			showFilterDropdown,
			document.getElementsByClassName("js-list-filter-button")[0],
			document.getElementsByClassName("js-list-filter-content-container")[0],
			"filter-area-container__dropdown-container__button--clicked"
		);
	}, [showFilterDropdown]);

	const toggleFilterDropdown = () => {
		setShowFilterDropdown(!showFilterDropdown);
	};

	const openCreateItemSidebar = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listContainerCreateItemSidbar: true,
			})
		);
		dispatch(setWhichAccountComponentsDisplay({}));
	};

	const onChangeSearchBar = (e) => {
		setSearchBarText(e.target.value);
	};

	const updateSearchKeyWordString = () => {
		dispatch(
			setProjectOrBugSearchFilterSort(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].searchFilterSort,
				searchKeyWordString: searchBarText,
			})
		);
	};

	const searchBarKeyDown = (e) => {
		if (e.keyCode === 13) {
			updateSearchKeyWordString();
		}
	};

	const onChangeFilter = (e) => {
		const value = Number(e.target.value);
		let deepCopyFilterArray = [
			...reduxState[props.reduxContainerName].searchFilterSort[e.target.name],
		];
		const index = deepCopyFilterArray.indexOf(value);

		if (index === -1) {
			deepCopyFilterArray.push(value);
		} else {
			deepCopyFilterArray.splice(index, 1);
		}

		dispatch(
			setProjectOrBugSearchFilterSort(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].searchFilterSort,
				[e.target.name]: deepCopyFilterArray,
			})
		);
	};

	return (
		<div className="search-filter-sort-component ">
			<div className="centering-container js-new-item-button-centering-container">
				<div
					className="centering-container__new-item-button"
					onClick={openCreateItemSidebar}
				>
					<span className="centering-container__new-item-button__text">
						{props.reduxContainerName === projectContainerName
							? "New Project"
							: "New Bug"}
					</span>
				</div>
			</div>
			<div className="centering-container js-list-search-bar-centering-container">
				<div className="centering-container__search-group-container js-list-search-bar-and-button-search-group-container">
					<input
						type="text"
						name="searchBarText"
						onChange={(e) => onChangeSearchBar(e)}
						onKeyDown={(e) => searchBarKeyDown(e)}
						value={searchBarText.searchBarText}
						className="centering-container__search-group-container__search-bar js-list-search-bar"
					/>
					<div
						className="centering-container__search-group-container__search-bar-button js-list-search-bar-button"
						onClick={updateSearchKeyWordString}
					>
						<span className="centering-container__search-group-container__search-bar-button__icon">
							<i className="fa fa-search" aria-hidden="true" />
						</span>
					</div>
				</div>
			</div>
			<div className="filter-area-container js-list-filter-area-container">
				<div className="filter-area-container__dropdown-container">
					<div
						className="filter-area-container__dropdown-container__button js-list-filter-button"
						onClick={toggleFilterDropdown}
					>
						<span className="filter-area-container__dropdown-container__button__text">
							<i className="fa fa-filter" aria-hidden="true" /> Filter
						</span>
					</div>
					<div className="filter-area-container__dropdown-container__content-dropdown js-list-filter-content-container">
						<div className="filter-area-container__dropdown-container__content-dropdown__content">
							<span className="filter-area-container__dropdown-container__content-dropdown__content__title">
								Priority
							</span>
							{reduxState[
								props.reduxContainerName
							].priorityStatusOptions.priorityOptions.map((obj, i) => {
								return (
									<div
										key={i}
										className="filter-area-container__dropdown-container__content-dropdown__content__block"
									>
										<input
											type="checkbox"
											name="priorityFilter"
											value={obj.id}
											onChange={(e) => onChangeFilter(e)}
											checked={reduxState[
												props.reduxContainerName
											].searchFilterSort.priorityFilter.includes(obj.id)}
											id={"list-priority-filter-" + obj.id}
											className="filter-area-container__dropdown-container__content-dropdown__content__block__checkbox"
										/>
										<label
											htmlFor={"list-priority-filter-" + obj.id}
											className="filter-area-container__dropdown-container__content-dropdown__content__block__label"
										>
											{obj.option !== "" ? obj.option : "Not Assigned"}
										</label>
									</div>
								);
							})}
						</div>
						<div className="filter-area-container__dropdown-container__content-dropdown__content filter-area-container__dropdown-container__content-dropdown__content--right">
							<span className="filter-area-container__dropdown-container__content-dropdown__content__title">
								Status
							</span>
							{reduxState[
								props.reduxContainerName
							].priorityStatusOptions.statusOptions.map((obj, i) => {
								return (
									<div
										key={i}
										className="filter-area-container__dropdown-container__content-dropdown__content__block"
									>
										<input
											type="checkbox"
											name="statusFilter"
											value={obj.id}
											onChange={(e) => onChangeFilter(e)}
											checked={reduxState[
												props.reduxContainerName
											].searchFilterSort.statusFilter.includes(obj.id)}
											id={"list-status-filter-" + obj.id}
											className="filter-area-container__dropdown-container__content-dropdown__content__block__checkbox"
										/>
										<label
											htmlFor={"list-status-filter-" + obj.id}
											className="filter-area-container__dropdown-container__content-dropdown__content__block__label"
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
	);
}
