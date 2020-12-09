import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	generalContainerName,
	projectContainerName,
	bugContainerName,
	sizeContainerName,
} from "../../../../reducers/containerNames";

import {
	setWhichGeneralComponentsDisplay,
	setProjectOrBugSearchFilterSort,
	setWhichProjectOrBugComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "../../../../actions";

import { useSearchBarBorderEventListener } from "../../../../utils/searchBarHookUtils";

import {
	getProjectOrBugBackgroundColorClassNameLight,
	getProjectOrBugBorderColorClassNameLight,
} from "../../../../utils/elementColorUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerTopBar.scss";

export default function ItemContainerTopBar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchBarText, setSearchBarText] = useState(
		reduxState[props.reduxContainerName].searchFilterSort.searchKeyWordString
	);

	const [showFilterDropdown, setShowFilterDropdown] = useState(false);

	useSearchBarBorderEventListener(
		"js-item-outer-search-container",
		"outer-search-container--with-border",
		"js-item-search-bar"
	);

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

	const toggleOptionsDropdown = () => {
		dispatch(
			setWhichGeneralComponentsDisplay({
				...reduxState[generalContainerName].componentsDisplay,
				itemContainerTopBarOptionsDropdown: !reduxState[generalContainerName]
					.componentsDisplay.itemContainerTopBarOptionsDropdown,
			})
		);
	};

	const switchBetweenDisplayAndEditInfo = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemContainerEditItemInfo: !reduxState[props.reduxContainerName]
					.componentsDisplay.itemContainerEditItemInfo,
			})
		);
	};

	const openDeleteItemModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemContainerDeleteModal: true,
			})
		);
	};

	const closeItemContainer = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listContainer: true,
				itemContainer: false,
				targetItem: null,
			})
		);

		// Resets bug components display if project itemContainer is closed
		if (props.reduxContainerName === projectContainerName) {
			dispatch(setWhichBugComponentsDisplay({}));
			dispatch(setProjectOrBugMassDeleteList(bugContainerName));
		}
	};

	return (
		<div className="top-bar-component js-top-bar">
			<div
				className={
					"outer-search-container js-item-outer-search-container" +
					getProjectOrBugBorderColorClassNameLight(props.reduxContainerName) +
					(reduxState[generalContainerName].componentsDisplay
						.itemContainerListSidebar
						? " "
						: " outer-search-container--invisible")
				}
			>
				<input
					type="text"
					name="searchBarText"
					onChange={(e) => onChangeSearchBar(e)}
					onKeyDown={(e) => searchBarKeyDown(e)}
					value={searchBarText}
					className={
						"outer-search-container__search-bar js-item-search-bar" +
						getProjectOrBugBorderColorClassNameLight(props.reduxContainerName)
					}
				/>
				<div
					className={
						"outer-search-container__search-bar-button" +
						getProjectOrBugBackgroundColorClassNameLight(
							props.reduxContainerName
						)
					}
					onClick={updateSearchKeyWordString}
				>
					<span className="outer-search-container__search-bar-button__icon">
						<i className="fa fa-search" aria-hidden="true" />
					</span>
				</div>
			</div>
			{reduxState[generalContainerName].componentsDisplay
				.itemContainerListSidebar !== true ||
			(reduxState[sizeContainerName].variables.window !== null &&
				reduxState[sizeContainerName].variables.window.width < 500) ? null : (
				<div className="filter-container">
					<div
						className={
							"filter-container__button" +
							(showFilterDropdown ? " filter-container__button--clicked" : "")
						}
						onClick={toggleFilterDropdown}
					>
						<span
							className={
								"filter-container__button__text" +
								(reduxState[props.reduxContainerName].searchFilterSort
									.priorityFilter.length > 0 ||
								reduxState[props.reduxContainerName].searchFilterSort
									.statusFilter.length > 0
									? " filter-container__button__text--active"
									: "")
							}
						>
							<i className="fa fa-filter" aria-hidden="true" /> Filter
						</span>
					</div>
					<div
						className={
							"filter-container__content-dropdown" +
							(props.reduxContainerName === bugContainerName
								? " filter-container__content-dropdown--shorter"
								: "") +
							(showFilterDropdown
								? " filter-container__content-dropdown--visible"
								: "")
						}
					>
						<div className="filter-container__content-dropdown__content">
							<span className="filter-container__content-dropdown__content__title">
								Priority
							</span>
							{reduxState[
								props.reduxContainerName
							].priorityStatusOptions.priorityList.map((obj, i) => {
								return (
									<div
										key={i}
										className="filter-container__content-dropdown__content__block"
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
											className="filter-container__content-dropdown__content__block__checkbox"
										/>
										<label
											htmlFor={"list-priority-filter-" + obj.id}
											className={
												"filter-container__content-dropdown__content__block__label" +
												(reduxState[
													props.reduxContainerName
												].searchFilterSort.priorityFilter.includes(obj.id)
													? " filter-container__content-dropdown__content__block__label--active"
													: "")
											}
										>
											{obj.option !== "" ? obj.option : "Not Assigned"}
										</label>
									</div>
								);
							})}
						</div>
						<div className="filter-container__content-dropdown__content filter-container__content-dropdown__content--right">
							<span className="filter-container__content-dropdown__content__title">
								Status
							</span>
							{reduxState[
								props.reduxContainerName
							].priorityStatusOptions.statusList.map((obj, i) => {
								return (
									<div
										key={i}
										className="filter-container__content-dropdown__content__block"
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
											className="filter-container__content-dropdown__content__block__checkbox"
										/>
										<label
											htmlFor={"list-status-filter-" + obj.id}
											className={
												"filter-container__content-dropdown__content__block__label" +
												(reduxState[
													props.reduxContainerName
												].searchFilterSort.statusFilter.includes(obj.id)
													? " filter-container__content-dropdown__content__block__label--active"
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
			)}
			<div className="item-options-container">
				<div
					className={
						"item-options-container__button" +
						(reduxState[generalContainerName].componentsDisplay
							.itemContainerTopBarOptionsDropdown
							? " item-options-container__button--clicked"
							: "")
					}
					onClick={toggleOptionsDropdown}
				>
					<span className="item-options-container__button__text">
						<i className="fa fa-ellipsis-h" aria-hidden="true" />
					</span>
				</div>
				<div
					className={
						"item-options-container__dropdown" +
						(reduxState[generalContainerName].componentsDisplay
							.itemContainerTopBarOptionsDropdown
							? " item-options-container__dropdown--visible"
							: "")
					}
				>
					<span
						className="item-options-container__dropdown__option js-edit-option"
						onClick={switchBetweenDisplayAndEditInfo}
					>
						{reduxState[props.reduxContainerName].componentsDisplay
							.itemContainerEditItemInfo
							? "Cancel"
							: props.reduxContainerName === projectContainerName
							? "Edit Project"
							: "Edit Bug"}
					</span>
					<span
						className="item-options-container__dropdown__option item-options-container__dropdown__option--no-border"
						onClick={openDeleteItemModal}
					>
						{props.reduxContainerName === projectContainerName
							? "Delete Project"
							: "Delete Bug"}
					</span>
				</div>
			</div>
			<div className="x-button" onClick={closeItemContainer}>
				<i className="fa fa-times" aria-hidden="true"></i>
			</div>
		</div>
	);
}
