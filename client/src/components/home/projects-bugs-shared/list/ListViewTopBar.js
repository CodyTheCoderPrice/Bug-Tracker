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
	getUpdatedDeepCopyFilterArray,
	getTopBarBorderAndBackgroundColorClassNameForLightOrDarkMode,
	getTopBarNewItemButtonTutorialBorderColorClassNameForLightOrDarkMode,
	getTopBarButtonBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getTopBarSearchBarBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getTextColorClassNameForThemeWithLightOrDarkMode,
	getTopBarNewItemTutorialBorderArrowTextColorClassNameForLightOrDarkMode,
} from "../../../../utils";

import { useSearchBarResizeAndBorderEventListener } from "../../../../utils/hooks";

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
	useSearchBarResizeAndBorderEventListener(
		reduxState,
		"js-list-search-bar",
		"js-list-search-button",
		"js-list-search-bar-and-button-search-group-container",
		"search-bar-and-button-thick-border",
		"js-new-item-button-centering-container",
		"js-list-filter-area-container",
		"js-list-search-bar-centering-container"
	);

	const openCreateItemSidebar = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listViewCreateItemSidbar: true,
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
				listViewSearchFilterSearchBarFilterDropdown: !reduxState[
					GENERAL_CONTAINER
				].dropdownsDisplay.listViewSearchFilterSearchBarFilterDropdown,
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

	return (
		<div
			className={
				"list-view-top-bar" +
				getTopBarBorderAndBackgroundColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				)
			}
		>
			<div className="centering-container js-new-item-button-centering-container">
				<div
					className={
						"centering-container__new-item-button" +
						getTopBarButtonBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						((props.reduxContainerName === PROJECT_CONTAINER &&
							reduxState[props.reduxContainerName].list.length > 0) ||
						(props.reduxContainerName === BUG_CONTAINER &&
							reduxState[props.reduxContainerName].list.length > 0)
							? ""
							: " centering-container__new-item-button--tutorial" +
							  getTopBarNewItemButtonTutorialBorderColorClassNameForLightOrDarkMode(
									reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							  ))
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
						getTopBarSearchBarBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					<input
						type="text"
						name="searchBarText"
						onChange={(e) => onChangeSearchBar(e)}
						onKeyDown={(e) => searchBarKeyDown(e)}
						value={searchBarText}
						className="centering-container__search-group-container__search-bar js-list-search-bar"
					/>
					<div
						className="centering-container__search-group-container__search-bar-button js-list-search-button"
						onClick={updateSearchKeyWordString}
					>
						<span className="centering-container__search-group-container__search-bar-button__icon">
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
						getTopBarButtonBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						(reduxState[GENERAL_CONTAINER].dropdownsDisplay
							.listViewSearchFilterSearchBarFilterDropdown
							? " filter-area-container__button--clicked"
							: "")
					}
					onClick={(e) => toggleFilterDropdown(e)}
				>
					<span
						className={
							"filter-area-container__button__text" +
							(reduxState[props.reduxContainerName].searchFilterSort
								.priorityFilter.length > 0 ||
							reduxState[props.reduxContainerName].searchFilterSort.statusFilter
								.length > 0
								? " filter-area-container__button__text--active" +
								  getTextColorClassNameForThemeWithLightOrDarkMode(
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
						"filter-area-container__content-dropdown" +
						getTopBarButtonBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						(props.reduxContainerName === BUG_CONTAINER
							? " filter-area-container__content-dropdown--shorter"
							: "") +
						(reduxState[GENERAL_CONTAINER].dropdownsDisplay
							.listViewSearchFilterSearchBarFilterDropdown
							? " filter-area-container__content-dropdown--visible"
							: "")
					}
					onClick={
						/*Keeps clicking dropdown from closing itself*/
						(e) => {
							e.stopPropagation();
						}
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
									<div className="filter-area-container__content-dropdown__content__block__checkbox-container">
										<CustomCheckbox
											name="priorityFilter"
											value={obj.id}
											onChangeFunction={onChangeFilter}
											checked={
												!reduxState[
													props.reduxContainerName
												].searchFilterSort.priorityFilter.includes(obj.id)
											}
											dark_mode={
												reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											}
											id={"list-priority-filter-" + obj.id}
										/>
									</div>
									<label
										htmlFor={"list-priority-filter-" + obj.id}
										className={
											"filter-area-container__content-dropdown__content__block__label" +
											(reduxState[
												props.reduxContainerName
											].searchFilterSort.priorityFilter.includes(obj.id)
												? " filter-area-container__content-dropdown__content__block__label--active" +
												  getTextColorClassNameForThemeWithLightOrDarkMode(
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
									<div className="filter-area-container__content-dropdown__content__block__checkbox-container">
										<CustomCheckbox
											name="statusFilter"
											value={obj.id}
											onChangeFunction={onChangeFilter}
											checked={
												!reduxState[
													props.reduxContainerName
												].searchFilterSort.statusFilter.includes(obj.id)
											}
											dark_mode={
												reduxState[ACCOUNT_CONTAINER].settings.dark_mode
											}
											id={"list-status-filter-" + obj.id}
										/>
									</div>
									<label
										htmlFor={"list-status-filter-" + obj.id}
										className={
											"filter-area-container__content-dropdown__content__block__label" +
											(reduxState[
												props.reduxContainerName
											].searchFilterSort.statusFilter.includes(obj.id)
												? " filter-area-container__content-dropdown__content__block__label--active" +
												  getTextColorClassNameForThemeWithLightOrDarkMode(
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
						getTopBarNewItemTutorialBorderArrowTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
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
