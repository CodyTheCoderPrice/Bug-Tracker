import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	SIZE_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setWhichGeneralDropdownsDisplay,
	setProjectOrBugSearchFilterSort,
	setWhichProjectOrBugComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "../../../../actions";

import {
	getUpdatedDeepCopyFilterArray,
	getLightBackgroundColorClassNameForTheme,
	getLightBorderColorClassNameForTheme,
} from "../../../../utils";

import { useSearchBarBorderEventListener } from "../../../../utils/hooks";

import ListTableSortArrowsButton from "../list/ListViewTableSortArrowsButton";

export default function ItemViewTopBar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchBarText, setSearchBarText] = useState(
		reduxState[props.reduxContainerName].searchFilterSort.searchKeyWordString
	);

	useSearchBarBorderEventListener(
		"js-item-search-bar",
		"js-item-search-button",
		"search-bar-and-button-thick-border"
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

	const toggleSortDropdown = (e) => {
		e.stopPropagation();

		dispatch(
			setWhichGeneralDropdownsDisplay({
				itemViewTopBarSortDropdown: !reduxState[GENERAL_CONTAINER]
					.dropdownsDisplay.itemViewTopBarSortDropdown,
			})
		);
	};

	const toggleFilterDropdown = (e) => {
		e.stopPropagation();

		dispatch(
			setWhichGeneralDropdownsDisplay({
				itemViewTopBarFilterDropdown: !reduxState[GENERAL_CONTAINER]
					.dropdownsDisplay.itemViewTopBarFilterDropdown,
			})
		);
	};

	const toggleOptionsDropdown = (e) => {
		e.stopPropagation();

		dispatch(
			setWhichGeneralDropdownsDisplay({
				itemViewTopBarOptionsDropdown: !reduxState[GENERAL_CONTAINER]
					.dropdownsDisplay.itemViewTopBarOptionsDropdown,
			})
		);
	};

	const onChangeFilter = (e) => {
		dispatch(
			setProjectOrBugSearchFilterSort(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].searchFilterSort,
				[e.target.name]: getUpdatedDeepCopyFilterArray(
					reduxState,
					props.reduxContainerName,
					e.target.name,
					e.target.value
				),
			})
		);
	};

	const switchBetweenDisplayAndEditInfo = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemViewEditItemInfo: !reduxState[props.reduxContainerName]
					.componentsDisplay.itemViewEditItemInfo,
			})
		);
	};

	const openDeleteItemModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemViewDeleteModal: true,
			})
		);
	};

	const closeItemView = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listView: true,
				itemView: false,
				targetItem: null,
			})
		);

		// Resets bug components display if project itemView is closed
		if (props.reduxContainerName === PROJECT_CONTAINER) {
			dispatch(setWhichBugComponentsDisplay({}));
			dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER));
		}
	};

	return (
		<div className="top-bar-component js-top-bar">
			<div
				className={
					"outer-search-container" +
					getLightBorderColorClassNameForTheme(reduxState[ACCOUNT_CONTAINER].settings.theme_color) +
					(reduxState[GENERAL_CONTAINER].componentsDisplay
						.itemViewListSidebar !== true ||
					(reduxState[SIZE_CONTAINER].variables.window !== null &&
						reduxState[SIZE_CONTAINER].variables.window.width < 400)
						? " outer-search-container--invisible"
						: "")
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
						getLightBorderColorClassNameForTheme(reduxState[ACCOUNT_CONTAINER].settings.theme_color)
					}
				/>
				<div
					className={
						"outer-search-container__search-bar-button js-item-search-button" +
						getLightBackgroundColorClassNameForTheme(
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
					onClick={updateSearchKeyWordString}
				>
					<span className="outer-search-container__search-bar-button__icon">
						<i
							className="fa fa-search"
							aria-hidden="true"
							alt="Icon of a magnifying glass"
						/>
					</span>
				</div>
			</div>
			{reduxState[GENERAL_CONTAINER].componentsDisplay.itemViewListSidebar !==
				true ||
			(reduxState[SIZE_CONTAINER].variables.window !== null &&
				reduxState[SIZE_CONTAINER].variables.window.width < 602) ? null : (
				<div>
					<div className="list-sort-filter-container">
						<div
							className={
								"list-sort-filter-container__button" +
								(reduxState[GENERAL_CONTAINER].dropdownsDisplay
									.itemViewTopBarSortDropdown
									? " list-sort-filter-container__button--clicked"
									: "")
							}
							onClick={(e) => toggleSortDropdown(e)}
						>
							<span className={"list-sort-filter-container__button__text"}>
								<i
									className="fa fa-sort"
									aria-hidden="true"
									alt="Icon representing sorting"
								/>{" "}
								Sort
							</span>
						</div>
						<div
							className={
								"list-sort-filter-container__content-dropdown" +
								(reduxState[GENERAL_CONTAINER].dropdownsDisplay
									.itemViewTopBarSortDropdown
									? " list-sort-filter-container__content-dropdown--visible"
									: "")
							}
							onClick={
								/*Keeps clicking dropdown from closing itself*/
								(e) => {
									e.stopPropagation();
								}
							}
						>
							<div className="list-sort-filter-container__content-dropdown__sort-content-block list-sort-filter-container__content-dropdown__sort-content-block--larger-top-margin">
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__sort-arrows-container">
									<ListTableSortArrowsButton
										sortTypeId={1}
										sortFor="Name"
										reduxContainerName={props.reduxContainerName}
									/>
								</span>
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__title">
									Name
								</span>
							</div>
							<div className="list-sort-filter-container__content-dropdown__sort-content-block">
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__sort-arrows-container">
									<ListTableSortArrowsButton
										sortTypeId={2}
										sortFor="Status"
										reduxContainerName={props.reduxContainerName}
									/>
								</span>
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__title">
									Status
								</span>
							</div>
							<div className="list-sort-filter-container__content-dropdown__sort-content-block">
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__sort-arrows-container">
									<ListTableSortArrowsButton
										sortTypeId={3}
										sortFor="Priority"
										reduxContainerName={props.reduxContainerName}
									/>
								</span>
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__title">
									Priority
								</span>
							</div>
							<div className="list-sort-filter-container__content-dropdown__sort-content-block">
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__sort-arrows-container">
									<ListTableSortArrowsButton
										sortTypeId={4}
										sortFor="Created on"
										reduxContainerName={props.reduxContainerName}
									/>
								</span>
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__title">
									Created on
								</span>
							</div>
							<div className="list-sort-filter-container__content-dropdown__sort-content-block">
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__sort-arrows-container">
									<ListTableSortArrowsButton
										sortTypeId={5}
										sortFor="Start Date"
										reduxContainerName={props.reduxContainerName}
									/>
								</span>
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__title">
									Start Date
								</span>
							</div>
							<div className="list-sort-filter-container__content-dropdown__sort-content-block">
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__sort-arrows-container">
									<ListTableSortArrowsButton
										sortTypeId={6}
										sortFor="Due Date"
										reduxContainerName={props.reduxContainerName}
									/>
								</span>
								<span className="list-sort-filter-container__content-dropdown__sort-content-block__title">
									Due Date
								</span>
							</div>
						</div>
					</div>

					<div className="list-sort-filter-container list-sort-filter-container--filter-placement">
						<div
							className={
								"list-sort-filter-container__button list-sort-filter-container__button--filter-width" +
								(reduxState[GENERAL_CONTAINER].dropdownsDisplay
									.itemViewTopBarFilterDropdown
									? " list-sort-filter-container__button--clicked list-sort-filter-container__button--clicked-filter-width"
									: "")
							}
							onClick={(e) => toggleFilterDropdown(e)}
						>
							<span
								className={
									"list-sort-filter-container__button__text list-sort-filter-container__button__text--filter-width" +
									(reduxState[props.reduxContainerName].searchFilterSort
										.priorityFilter.length > 0 ||
									reduxState[props.reduxContainerName].searchFilterSort
										.statusFilter.length > 0
										? " list-sort-filter-container__button__text--active"
										: "")
								}
							>
								<i
									className="fa fa-filter"
									aria-hidden="true"
									alt="Icon of a filter"
								/>{" "}
								Filter
							</span>
						</div>
						<div
							className={
								"list-sort-filter-container__content-dropdown list-sort-filter-container__content-dropdown--filter-width" +
								(props.reduxContainerName === BUG_CONTAINER
									? " list-sort-filter-container__content-dropdown--shorter"
									: "") +
								(reduxState[GENERAL_CONTAINER].dropdownsDisplay
									.itemViewTopBarFilterDropdown
									? " list-sort-filter-container__content-dropdown--visible"
									: "")
							}
							onClick={
								/*Keeps clicking dropdown from closing itself*/
								(e) => {
									e.stopPropagation();
								}
							}
						>
							<div className="list-sort-filter-container__content-dropdown__filter-content">
								<span className="list-sort-filter-container__content-dropdown__filter-content__title">
									Priority
								</span>
								{reduxState[
									props.reduxContainerName
								].priorityStatusOptions.priorityList.map((obj, i) => {
									return (
										<div
											key={i}
											className="list-sort-filter-container__content-dropdown__filter-content__block"
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
												className="list-sort-filter-container__content-dropdown__filter-content__block__checkbox"
											/>
											<label
												htmlFor={"list-priority-filter-" + obj.id}
												className={
													"list-sort-filter-container__content-dropdown__filter-content__block__label" +
													(reduxState[
														props.reduxContainerName
													].searchFilterSort.priorityFilter.includes(obj.id)
														? " list-sort-filter-container__content-dropdown__filter-content__block__label--active"
														: "")
												}
											>
												{obj.option !== "" ? obj.option : "Not Assigned"}
											</label>
										</div>
									);
								})}
							</div>
							<div className="list-sort-filter-container__content-dropdown__filter-content list-sort-filter-container__content-dropdown__filter-content--right">
								<span className="list-sort-filter-container__content-dropdown__filter-content__title">
									Status
								</span>
								{reduxState[
									props.reduxContainerName
								].priorityStatusOptions.statusList.map((obj, i) => {
									return (
										<div
											key={i}
											className="list-sort-filter-container__content-dropdown__filter-content__block"
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
												className="list-sort-filter-container__content-dropdown__filter-content__block__checkbox"
											/>
											<label
												htmlFor={"list-status-filter-" + obj.id}
												className={
													"list-sort-filter-container__content-dropdown__filter-content__block__label" +
													(reduxState[
														props.reduxContainerName
													].searchFilterSort.statusFilter.includes(obj.id)
														? " list-sort-filter-container__content-dropdown__filter-content__block__label--active"
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
				</div>
			)}
			<div className="item-options-container">
				<div
					className={
						"item-options-container__button" +
						(reduxState[GENERAL_CONTAINER].dropdownsDisplay
							.itemViewTopBarOptionsDropdown
							? " item-options-container__button--clicked"
							: "")
					}
					onClick={(e) => toggleOptionsDropdown(e)}
				>
					<span className="item-options-container__button__text">
						<i
							className="fa fa-ellipsis-h"
							aria-hidden="true"
							alt="Icon of an ellipsis (three dots)"
						/>
					</span>
				</div>
				<div
					className={
						"item-options-container__dropdown" +
						(reduxState[GENERAL_CONTAINER].dropdownsDisplay
							.itemViewTopBarOptionsDropdown
							? " item-options-container__dropdown--visible"
							: "")
					}
					onClick={
						/*Keeps clicking dropdown from closing itself*/
						(e) => {
							e.stopPropagation();
						}
					}
				>
					<span
						className="item-options-container__dropdown__option js-edit-option"
						onClick={switchBetweenDisplayAndEditInfo}
					>
						{reduxState[props.reduxContainerName].componentsDisplay
							.itemViewEditItemInfo
							? "Cancel"
							: props.reduxContainerName === PROJECT_CONTAINER
							? "Edit Project"
							: "Edit Bug"}
					</span>
					<span
						className="item-options-container__dropdown__option item-options-container__dropdown__option--no-border"
						onClick={openDeleteItemModal}
					>
						{props.reduxContainerName === PROJECT_CONTAINER
							? "Delete Project"
							: "Delete Bug"}
					</span>
				</div>
			</div>
			<div className="x-button" onClick={closeItemView}>
				<i className="fa fa-times" aria-hidden="true" alt="Icon of an X"></i>
			</div>
		</div>
	);
}
