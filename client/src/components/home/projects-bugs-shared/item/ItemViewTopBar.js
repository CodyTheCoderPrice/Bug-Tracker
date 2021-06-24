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
	getUpdatedFilterArray,
	getCommonTopBarComponentBorderAndBackgroundColorClassNameForLightOrDarkMode,
	getCommonTopBarSearchContainerBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	getItemViewTopBarComponentIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode,
	getItemViewTopBarOptionsButtonClickedBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getItemViewTopBarOptionsDropdownRowHoverBackgroundColorClassNameForLightOrDarkMode,
} from "../../../../utils";

// Components
import CustomCheckbox from "../../../basic/CustomCheckbox";
import SortArrowsButton from "../../../basic/SortArrowsButton";

export default function ItemViewTopBar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchBarText, setSearchBarText] = useState(
		reduxState[props.reduxContainerName].searchFilterSort.searchKeyWordString
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

	const toggleFilterDropdown = (e) => {
		e.stopPropagation();

		dispatch(
			setWhichGeneralDropdownsDisplay({
				itemViewTopBarFilterDropdown: !reduxState[GENERAL_CONTAINER]
					.dropdownsDisplay.itemViewTopBarFilterDropdown,
			})
		);
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
				[e.target.name]: getUpdatedFilterArray(
					reduxState,
					props.reduxContainerName,
					e.target.name,
					e.target.value
				),
			})
		);
	};

	const fireSortArrowOnClick = (sortArrowButtonId) => {
		document.getElementById(sortArrowButtonId).click();
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
				itemViewCurrentItem: null,
			})
		);

		// Resets bug components display if project itemView is closed
		if (props.reduxContainerName === PROJECT_CONTAINER) {
			dispatch(setWhichBugComponentsDisplay({}));
			dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER));
		}
	};

	return (
		<div
			className={
				"item-vew-top-bar-component" +
				getCommonTopBarComponentBorderAndBackgroundColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				)
			}
		>
			<div
				className={
					"search-container" +
					getCommonTopBarSearchContainerBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
						reduxState[ACCOUNT_CONTAINER].settings.theme_color
					) +
					(reduxState[GENERAL_CONTAINER].componentsDisplay
						.itemViewListSidebar !== true ||
					(reduxState[SIZE_CONTAINER].variables.window !== null &&
						reduxState[SIZE_CONTAINER].variables.window.width < 400)
						? " search-container--invisible"
						: "")
				}
			>
				<input
					type="text"
					name="searchBarText"
					onChange={onChangeSearchBar}
					onKeyDown={searchBarKeyDown}
					value={searchBarText}
					className="search-container__search-bar js-item-search-bar"
				/>
				<div
					className="search-container__search-button js-item-search-button"
					alt="Button for searchbar"
					onClick={updateSearchKeyWordString}
				>
					<span className="search-container__search-button__icon">
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
					<div className="list-filter-or-sort-container">
						<div
							className={
								"list-filter-or-sort-container__button" +
								getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								) +
								(reduxState[GENERAL_CONTAINER].dropdownsDisplay
									.itemViewTopBarFilterDropdown
									? " list-filter-or-sort-container__button--clicked list-filter-or-sort-container__button--clicked-filter-width"
									: "")
							}
							alt={
								"Button to open filter dropdown for filtering the list of " +
								(props.reduxContainerName === PROJECT_CONTAINER
									? "projects"
									: "bugs")
							}
							onClick={toggleFilterDropdown}
						>
							<span
								className={
									"list-filter-or-sort-container__button__text" +
									(reduxState[props.reduxContainerName].searchFilterSort
										.priorityFilter.length > 0 ||
									reduxState[props.reduxContainerName].searchFilterSort
										.statusFilter.length > 0
										? " list-filter-or-sort-container__button__text--active" +
										  getCommonTextColorClassNameForThemeWithLightOrDarkMode(
												reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
												reduxState[ACCOUNT_CONTAINER].settings.theme_color
										  )
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
								"list-filter-or-sort-container__dropdown" +
								getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								) +
								(props.reduxContainerName === BUG_CONTAINER
									? " list-filter-or-sort-container__dropdown--shorter"
									: "") +
								(reduxState[GENERAL_CONTAINER].dropdownsDisplay
									.itemViewTopBarFilterDropdown
									? " list-filter-or-sort-container__dropdown--visible"
									: "")
							}
							onClick={
								/*Keeps clicking dropdown from closing itself*/
								(e) => {
									e.stopPropagation();
								}
							}
						>
							<div className="list-filter-or-sort-container__dropdown__filter-content">
								<span className="list-filter-or-sort-container__dropdown__filter-content__title">
									Priority
								</span>
								{reduxState[
									props.reduxContainerName
								].priorityStatusOptions.priorityList.map((obj, i) => {
									return (
										<div
											key={i}
											className="list-filter-or-sort-container__dropdown__filter-content__block"
										>
											<div className="list-filter-or-sort-container__dropdown__filter-content__block__checkbox-container">
												<CustomCheckbox
													name="priorityFilter"
													value={obj.id}
													onChangeFunction={onChangeFilter}
													isChecked={
														!reduxState[
															props.reduxContainerName
														].searchFilterSort.priorityFilter.includes(obj.id)
													}
													uniqueId={"list-priority-filter-" + obj.id}
													dark_mode={
														reduxState[ACCOUNT_CONTAINER].settings.dark_mode
													}
													theme_color={
														reduxState[ACCOUNT_CONTAINER].settings.theme_color
													}
												/>
											</div>
											<label
												htmlFor={"list-priority-filter-" + obj.id}
												className={
													"list-filter-or-sort-container__dropdown__filter-content__block__label" +
													(reduxState[
														props.reduxContainerName
													].searchFilterSort.priorityFilter.includes(obj.id)
														? " list-filter-or-sort-container__dropdown__filter-content__block__label--active" +
														  getCommonTextColorClassNameForThemeWithLightOrDarkMode(
																reduxState[ACCOUNT_CONTAINER].settings
																	.dark_mode,
																reduxState[ACCOUNT_CONTAINER].settings
																	.theme_color
														  )
														: "")
												}
											>
												{obj.option !== "" ? obj.option : "Not Assigned"}
											</label>
										</div>
									);
								})}
							</div>
							<div className="list-filter-or-sort-container__dropdown__filter-content list-filter-or-sort-container__dropdown__filter-content--right">
								<span className="list-filter-or-sort-container__dropdown__filter-content__title">
									Status
								</span>
								{reduxState[
									props.reduxContainerName
								].priorityStatusOptions.statusList.map((obj, i) => {
									return (
										<div
											key={i}
											className="list-filter-or-sort-container__dropdown__filter-content__block"
										>
											<div className="list-filter-or-sort-container__dropdown__filter-content__block__checkbox-container">
												<CustomCheckbox
													name="statusFilter"
													value={obj.id}
													onChangeFunction={onChangeFilter}
													isChecked={
														!reduxState[
															props.reduxContainerName
														].searchFilterSort.statusFilter.includes(obj.id)
													}
													uniqueId={"list-status-filter-" + obj.id}
													dark_mode={
														reduxState[ACCOUNT_CONTAINER].settings.dark_mode
													}
													theme_color={
														reduxState[ACCOUNT_CONTAINER].settings.theme_color
													}
												/>
											</div>
											<label
												htmlFor={"list-status-filter-" + obj.id}
												className={
													"list-filter-or-sort-container__dropdown__filter-content__block__label" +
													(reduxState[
														props.reduxContainerName
													].searchFilterSort.statusFilter.includes(obj.id)
														? " list-filter-or-sort-container__dropdown__filter-content__block__label--active" +
														  getCommonTextColorClassNameForThemeWithLightOrDarkMode(
																reduxState[ACCOUNT_CONTAINER].settings
																	.dark_mode,
																reduxState[ACCOUNT_CONTAINER].settings
																	.theme_color
														  )
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

					<div className="list-filter-or-sort-container list-filter-or-sort-container--sort-placement">
						<div
							className={
								"list-filter-or-sort-container__button" +
								getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								) +
								(reduxState[GENERAL_CONTAINER].dropdownsDisplay
									.itemViewTopBarSortDropdown
									? " list-filter-or-sort-container__button--clicked"
									: "")
							}
							alt={
								"Button to open sort dropdown for sorting the list of " +
								(props.reduxContainerName === PROJECT_CONTAINER
									? "projects"
									: "bugs")
							}
							onClick={toggleSortDropdown}
						>
							<span className={"list-filter-or-sort-container__button__text"}>
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
								"list-filter-or-sort-container__dropdown list-filter-or-sort-container__dropdown--sort-width" +
								getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
								) +
								(reduxState[GENERAL_CONTAINER].dropdownsDisplay
									.itemViewTopBarSortDropdown
									? " list-filter-or-sort-container__dropdown--visible"
									: "")
							}
							onClick={
								/*Keeps clicking dropdown from closing itself*/
								(e) => {
									e.stopPropagation();
								}
							}
						>
							<div className="list-filter-or-sort-container__dropdown__sort-content-block">
								<span className="list-filter-or-sort-container__dropdown__sort-content-block__sort-arrows-container">
									<SortArrowsButton
										reduxContainerName={props.reduxContainerName}
										sortId={1}
										sortFor="Name"
										uniqueId="item-view-sort-arrow-name"
										dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
									/>
								</span>
								<span
									className="list-filter-or-sort-container__dropdown__sort-content-block__title"
									onClick={() =>
										fireSortArrowOnClick("item-view-sort-arrow-name")
									}
								>
									Name
								</span>
							</div>
							<div className="list-filter-or-sort-container__dropdown__sort-content-block">
								<span className="list-filter-or-sort-container__dropdown__sort-content-block__sort-arrows-container">
									<SortArrowsButton
										reduxContainerName={props.reduxContainerName}
										sortId={2}
										sortFor="Status"
										uniqueId="item-view-sort-arrow-status"
										dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
									/>
								</span>
								<span
									className="list-filter-or-sort-container__dropdown__sort-content-block__title"
									onClick={() =>
										fireSortArrowOnClick("item-view-sort-arrow-status")
									}
								>
									Status
								</span>
							</div>
							<div className="list-filter-or-sort-container__dropdown__sort-content-block">
								<span className="list-filter-or-sort-container__dropdown__sort-content-block__sort-arrows-container">
									<SortArrowsButton
										reduxContainerName={props.reduxContainerName}
										sortId={3}
										sortFor="Priority"
										uniqueId="item-view-sort-arrow-priority"
										dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
									/>
								</span>
								<span
									className="list-filter-or-sort-container__dropdown__sort-content-block__title"
									onClick={() =>
										fireSortArrowOnClick("item-view-sort-arrow-priority")
									}
								>
									Priority
								</span>
							</div>
							<div className="list-filter-or-sort-container__dropdown__sort-content-block">
								<span className="list-filter-or-sort-container__dropdown__sort-content-block__sort-arrows-container">
									<SortArrowsButton
										reduxContainerName={props.reduxContainerName}
										sortId={4}
										sortFor="Created on"
										uniqueId="item-view-sort-arrow-created-on"
										dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
									/>
								</span>
								<span
									className="list-filter-or-sort-container__dropdown__sort-content-block__title"
									onClick={() =>
										fireSortArrowOnClick("item-view-sort-arrow-created-on")
									}
								>
									Created on
								</span>
							</div>
							<div className="list-filter-or-sort-container__dropdown__sort-content-block">
								<span className="list-filter-or-sort-container__dropdown__sort-content-block__sort-arrows-container">
									<SortArrowsButton
										reduxContainerName={props.reduxContainerName}
										sortId={5}
										sortFor="Start Date"
										uniqueId="item-view-sort-arrow-start-date"
										dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
									/>
								</span>
								<span
									className="list-filter-or-sort-container__dropdown__sort-content-block__title"
									onClick={() =>
										fireSortArrowOnClick("item-view-sort-arrow-start-date")
									}
								>
									Start Date
								</span>
							</div>
							<div className="list-filter-or-sort-container__dropdown__sort-content-block">
								<span className="list-filter-or-sort-container__dropdown__sort-content-block__sort-arrows-container">
									<SortArrowsButton
										reduxContainerName={props.reduxContainerName}
										sortId={6}
										sortFor="Due Date"
										uniqueId="item-view-sort-arrow-due-date"
										dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
									/>
								</span>
								<span
									className="list-filter-or-sort-container__dropdown__sort-content-block__title"
									onClick={() =>
										fireSortArrowOnClick("item-view-sort-arrow-due-date")
									}
								>
									Due Date
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="item-options-container">
				<div
					className={
						"item-options-container__icon-button" +
						getItemViewTopBarComponentIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						(reduxState[GENERAL_CONTAINER].dropdownsDisplay
							.itemViewTopBarOptionsDropdown
							? getItemViewTopBarOptionsButtonClickedBorderBackgroundTextColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							  )
							: "")
					}
					alt={
						"Button to open a dropdown of options for the " +
						(props.reduxContainerName === PROJECT_CONTAINER ? "project" : "bug")
					}
					onClick={toggleOptionsDropdown}
				>
					<span className="item-options-container__icon-button__text">
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
						getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
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
						className={
							"item-options-container__dropdown__option item-options-container__dropdown__option--first-option-round-top-border" +
							getItemViewTopBarOptionsDropdownRowHoverBackgroundColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						alt={
							"Dropdown option to " +
							(reduxState[props.reduxContainerName].componentsDisplay
								.itemViewEditItemInfo === false
								? "begin editing "
								: "canel editing ") +
							(props.reduxContainerName === PROJECT_CONTAINER
								? "the project"
								: "the bug")
						}
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
						className={
							"item-options-container__dropdown__option item-options-container__dropdown__option--last-option-round-bottom-border" +
							getItemViewTopBarOptionsDropdownRowHoverBackgroundColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						alt={
							"Dropdown option to begin deleting the" +
							(props.reduxContainerName === PROJECT_CONTAINER
								? "project"
								: "bug")
						}
						onClick={openDeleteItemModal}
					>
						{props.reduxContainerName === PROJECT_CONTAINER
							? "Delete Project"
							: "Delete Bug"}
					</span>
				</div>
			</div>
			<div
				className={
					"exit-icon-button" +
					getItemViewTopBarComponentIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
				alt={
					"Button to close the " +
					(props.reduxContainerName === PROJECT_CONTAINER ? "project" : "bug")
				}
				onClick={closeItemView}
			>
				<i className="fa fa-times" aria-hidden="true" alt="Icon of an X"></i>
			</div>
		</div>
	);
}
