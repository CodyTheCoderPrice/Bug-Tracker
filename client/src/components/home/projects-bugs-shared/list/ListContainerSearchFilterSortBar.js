import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	setWhichAccountComponentsDisplay,
	setProjectOrBugSearchFilterSort,
} from "../../../../actions";

import {
	getProjectOrBugBackgroundColorClassNameLight,
	getProjectOrBugBorderColorClassNameLight,
} from "../../../../utils";

import { useSearchBarResizeAndBorderEventListener } from "../../../../utils/hooks";

export default function ListContainerSearchFilterSortBar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchBarText, setSearchBarText] = useState(
		reduxState[props.reduxContainerName].searchFilterSort.searchKeyWordString
	);

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

	const toggleFilterDropdown = () => {
		setShowFilterDropdown(!showFilterDropdown);
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
					className={
						"centering-container__new-item-button" +
						((props.reduxContainerName === PROJECT_CONTAINER &&
							reduxState[props.reduxContainerName].list.length > 0) ||
						(props.reduxContainerName === BUG_CONTAINER &&
							reduxState[props.reduxContainerName].list.length > 0)
							? ""
							: " centering-container__new-item-button--highlighted")
					}
					onClick={openCreateItemSidebar}
				>
					<span className="centering-container__new-item-button__text">
						{props.reduxContainerName === PROJECT_CONTAINER
							? "New Project"
							: "New Bug"}
					</span>
				</div>
			</div>
			<div className="centering-container js-list-search-bar-centering-container">
				<div
					className={
						"centering-container__search-group-container js-list-search-bar-and-button-search-group-container" +
						getProjectOrBugBorderColorClassNameLight(props.reduxContainerName)
					}
				>
					<input
						type="text"
						name="searchBarText"
						onChange={(e) => onChangeSearchBar(e)}
						onKeyDown={(e) => searchBarKeyDown(e)}
						value={searchBarText}
						className={
							"centering-container__search-group-container__search-bar js-list-search-bar" +
							getProjectOrBugBorderColorClassNameLight(props.reduxContainerName)
						}
					/>
					<div
						className={
							"centering-container__search-group-container__search-bar-button js-list-search-bar-button" +
							getProjectOrBugBackgroundColorClassNameLight(
								props.reduxContainerName
							)
						}
						onClick={updateSearchKeyWordString}
					>
						<span className="centering-container__search-group-container__search-bar-button__icon">
							<i className="fa fa-search" aria-hidden="true" />
						</span>
					</div>
				</div>
			</div>
			<div className="filter-area-container js-list-filter-area-container">
				<div
					className={
						"filter-area-container__button" +
						(showFilterDropdown
							? " filter-area-container__button--clicked"
							: "")
					}
					onClick={toggleFilterDropdown}
				>
					<span
						className={
							"filter-area-container__button__text" +
							(reduxState[props.reduxContainerName].searchFilterSort
								.priorityFilter.length > 0 ||
							reduxState[props.reduxContainerName].searchFilterSort.statusFilter
								.length > 0
								? " filter-area-container__button__text--active"
								: "")
						}
					>
						<i className="fa fa-filter" aria-hidden="true" /> Filter
					</span>
				</div>
				<div
					className={
						"filter-area-container__content-dropdown" +
						(props.reduxContainerName === BUG_CONTAINER
							? " filter-area-container__content-dropdown--shorter"
							: "") +
						(showFilterDropdown
							? " filter-area-container__content-dropdown--visible"
							: "")
					}
				>
					<div className="filter-area-container__content-dropdown__content">
						<span className="filter-area-container__content-dropdown__content__title">
							Priority
						</span>
						{reduxState[
							props.reduxContainerName
						].priorityStatusOptions.priorityList.map((obj, i) => {
							return (
								<div
									key={i}
									className="filter-area-container__content-dropdown__content__block"
								>
									<input
										type="checkbox"
										name="priorityFilter"
										value={obj.id}
										onChange={(e) => onChangeFilter(e)}
										checked={
											!reduxState[
												props.reduxContainerName
											].searchFilterSort.priorityFilter.includes(obj.id)
										}
										id={"list-priority-filter-" + obj.id}
										className="filter-area-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor={"list-priority-filter-" + obj.id}
										className={
											"filter-area-container__content-dropdown__content__block__label" +
											(reduxState[
												props.reduxContainerName
											].searchFilterSort.priorityFilter.includes(obj.id)
												? " filter-area-container__content-dropdown__content__block__label--active"
												: "")
										}
									>
										{obj.option !== "" ? obj.option : "Not Assigned"}
									</label>
								</div>
							);
						})}
					</div>
					<div className="filter-area-container__content-dropdown__content filter-area-container__content-dropdown__content--right">
						<span className="filter-area-container__content-dropdown__content__title">
							Status
						</span>
						{reduxState[
							props.reduxContainerName
						].priorityStatusOptions.statusList.map((obj, i) => {
							return (
								<div
									key={i}
									className="filter-area-container__content-dropdown__content__block"
								>
									<input
										type="checkbox"
										name="statusFilter"
										value={obj.id}
										onChange={(e) => onChangeFilter(e)}
										checked={
											!reduxState[
												props.reduxContainerName
											].searchFilterSort.statusFilter.includes(obj.id)
										}
										id={"list-status-filter-" + obj.id}
										className="filter-area-container__content-dropdown__content__block__checkbox"
									/>
									<label
										htmlFor={"list-status-filter-" + obj.id}
										className={
											"filter-area-container__content-dropdown__content__block__label" +
											(reduxState[
												props.reduxContainerName
											].searchFilterSort.statusFilter.includes(obj.id)
												? " filter-area-container__content-dropdown__content__block__label--active"
												: "")
										}
									>
										{obj.option !== "" ? obj.option : "Not Assigned"}
									</label>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			{/*If the list has no items, displays a message to create one*/}
			{(props.reduxContainerName === PROJECT_CONTAINER &&
				reduxState[props.reduxContainerName].list.length > 0) ||
			(props.reduxContainerName === BUG_CONTAINER &&
				reduxState[props.reduxContainerName].list.length > 0) ? null : (
				<div className="create-item-message-container">
					<div className="create-item-message-container__arrow-head" />
					<div className="create-item-message-container__arrow-stock" />
					<div className="create-item-message-container__bend-message-centering-container">
						<div className="create-item-message-container__bend-message-centering-container__arrow-bend" />
						<div className="create-item-message-container__bend-message-centering-container__message">
							{props.reduxContainerName === PROJECT_CONTAINER
								? "Click to create a project."
								: "Click to track a bug."}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
