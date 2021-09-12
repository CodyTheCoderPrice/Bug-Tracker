import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setWhichGeneralDropdownsDisplay,
	setWhichProjectOrBugComponentsDisplay,
	setWhichAccountComponentsDisplay,
	setProjectOrBugSearchFilterSort,
} from "../../../../actions";

import {
	getUpdatedFilterArray,
	getCommonTopBarComponentBorderAndBackgroundColorClassNameForLightOrDarkMode,
	getListViewTopBarComponentNewItemButtonTutorialElementBorderColorClassNameForThemeWithLightOrDarkMode,
	getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getCommonTopBarComponentSearchContainerElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
	getListViewTopBarComponentNewItemTutorialElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
} from "../../../../utils";

import { useListViewSearchBarResize } from "../../../../utils/hooks";

// Components
import CustomCheckbox from "../../../basic/CustomCheckbox";

export default function ListViewTopBar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchBarText, setSearchBarText] = useState(
		reduxState[props.reduxContainerName].searchFilterSort.searchKeyWordString
	);

	// Custom hook resizes the searchbar to take up the space
	// ...in the middle of the search-sort-filter-bar. Also adds
	// ... an event listener to highlight the searchbar
	useListViewSearchBarResize(
		reduxState,
		"js-list-search-bar-and-button-centering-container",
		"js-list-centered-search-search-container",
		"js-list-search-bar",
		"js-list-search-button",
		"js-new-item-button-centering-container",
		"js-list-filter-area-container"
	);

	const openCreateItemSidebar = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listViewCreateItemSidbarComponentShouldDisplay: true,
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

	const toggleFilterDropdown = (e) => {
		e.stopPropagation();

		dispatch(
			setWhichGeneralDropdownsDisplay({
				listViewTopBarFilterDropdown:
					!reduxState[GENERAL_CONTAINER].dropdownsDisplay
						.listViewTopBarFilterDropdown,
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

	return (
		<div
			className={
				"list-view-top-bar-component" +
				getCommonTopBarComponentBorderAndBackgroundColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				)
			}
		>
			<div className="centering-container js-new-item-button-centering-container">
				<div
					className={
						"centering-container__new-item-button" +
						getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						((props.reduxContainerName === PROJECT_CONTAINER &&
							reduxState[props.reduxContainerName].list.length > 0) ||
						(props.reduxContainerName === BUG_CONTAINER &&
							reduxState[props.reduxContainerName].list.length > 0)
							? ""
							: " centering-container__new-item-button--tutorial" +
							  getListViewTopBarComponentNewItemButtonTutorialElementBorderColorClassNameForThemeWithLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
									reduxState[ACCOUNT_CONTAINER].settings.theme_color
							  ))
					}
					alt={
						"Button to open sidebar for creating a new " +
						(props.reduxContainerName === PROJECT_CONTAINER ? "project" : "bug")
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
			<div className="centering-container js-list-search-bar-and-button-centering-container">
				<div
					className={
						"centering-container__search-container js-list-centered-search-search-container" +
						getCommonTopBarComponentSearchContainerElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					<input
						type="text"
						name="searchBarText"
						onChange={onChangeSearchBar}
						onKeyDown={searchBarKeyDown}
						value={searchBarText}
						className="centering-container__search-container__search-bar js-list-search-bar"
					/>
					<div
						className="centering-container__search-container__search-button js-list-search-button"
						alt="Button for searchbar"
						onClick={updateSearchKeyWordString}
					>
						<span className="centering-container__search-container__search-button__icon">
							<i
								className="fa fa-search"
								aria-hidden="true"
								alt="Icon of a magnifying glass"
							/>
						</span>
					</div>
				</div>
			</div>
			<div className="filter-area-container js-list-filter-area-container">
				<div
					className={
						"filter-area-container__button" +
						getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						(reduxState[GENERAL_CONTAINER].dropdownsDisplay
							.listViewTopBarFilterDropdown
							? " filter-area-container__button--clicked"
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
							"filter-area-container__button__text" +
							(reduxState[props.reduxContainerName].searchFilterSort
								.priorityFilter.length > 0 ||
							reduxState[props.reduxContainerName].searchFilterSort.statusFilter
								.length > 0
								? " filter-area-container__button__text--active" +
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
						"filter-area-container__dropdown" +
						getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						(props.reduxContainerName === BUG_CONTAINER
							? " filter-area-container__dropdown--shorter"
							: "") +
						(reduxState[GENERAL_CONTAINER].dropdownsDisplay
							.listViewTopBarFilterDropdown
							? " filter-area-container__dropdown--visible"
							: "")
					}
					onClick={
						/*Keeps clicking dropdown from closing itself*/
						(e) => {
							e.stopPropagation();
						}
					}
				>
					<div className="filter-area-container__dropdown__content">
						<span className="filter-area-container__dropdown__content__title">
							Priority
						</span>
						{reduxState[
							props.reduxContainerName
						].priorityStatusOptions.priorityList.map((obj, i) => {
							return (
								<div
									key={i}
									className="filter-area-container__dropdown__content__block"
								>
									<div className="filter-area-container__dropdown__content__block__checkbox-container">
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
											"filter-area-container__dropdown__content__block__label" +
											(reduxState[
												props.reduxContainerName
											].searchFilterSort.priorityFilter.includes(obj.id)
												? " filter-area-container__dropdown__content__block__label--active" +
												  getCommonTextColorClassNameForThemeWithLightOrDarkMode(
														reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
														reduxState[ACCOUNT_CONTAINER].settings.theme_color
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
					<div className="filter-area-container__dropdown__content filter-area-container__dropdown__content--right">
						<span className="filter-area-container__dropdown__content__title">
							Status
						</span>
						{reduxState[
							props.reduxContainerName
						].priorityStatusOptions.statusList.map((obj, i) => {
							return (
								<div
									key={i}
									className="filter-area-container__dropdown__content__block"
								>
									<div className="filter-area-container__dropdown__content__block__checkbox-container">
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
											"filter-area-container__dropdown__content__block__label" +
											(reduxState[
												props.reduxContainerName
											].searchFilterSort.statusFilter.includes(obj.id)
												? " filter-area-container__dropdown__content__block__label--active" +
												  getCommonTextColorClassNameForThemeWithLightOrDarkMode(
														reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
														reduxState[ACCOUNT_CONTAINER].settings.theme_color
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
			{/*If the list has no items, displays a message to create one*/}
			{(props.reduxContainerName === PROJECT_CONTAINER &&
				reduxState[props.reduxContainerName].list.length > 0) ||
			(props.reduxContainerName === BUG_CONTAINER &&
				reduxState[props.reduxContainerName].list.length > 0) ? null : (
				<div
					className={
						"new-item-tutorial-container" +
						getListViewTopBarComponentNewItemTutorialElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					<div className="new-item-tutorial-container__arrow-head" />
					<div className="new-item-tutorial-container__arrow-stock" />
					<div className="new-item-tutorial-container__bend-message-centering-container">
						<div className="new-item-tutorial-container__bend-message-centering-container__arrow-bend" />
						<div className="new-item-tutorial-container__bend-message-centering-container__text">
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
