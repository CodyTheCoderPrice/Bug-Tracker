import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	setWhichAccountComponentsDisplay,
	setProjectOrBugSearchFilterSort,
} from "../../../../actions";

import {
	getCommonTopBarComponentBorderAndBackgroundColorClassNameForLightOrDarkMode,
	getListViewTopBarComponentNewItemButtonTutorialElementBorderColorClassNameForThemeWithLightOrDarkMode,
	getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getCommonTopBarComponentSearchContainerElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getListViewTopBarComponentNewItemTutorialElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
} from "../../../../utils";

import { useListViewSearchBarResize } from "../../../../utils/hooks";

// Other components used by this component
import ListViewTopBarFilterButton from "./ListViewTopBarFilterButton";
import ListViewTopBarFilterDropdown from "./ListViewTopBarFilterDropdown";

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
		"js-list-search-centering-container",
		"js-list-centered-search-container",
		"js-list-search-bar",
		"js-list-search-button",
		"js-new-item-button-centering-container",
		"js-list-filter-components-container"
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

	return (
		<div
			className={
				"list-view-top-bar-component" +
				getCommonTopBarComponentBorderAndBackgroundColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				)
			}
		>
			<div className="new-item-centering-container js-new-item-button-centering-container">
				<div
					className={
						"new-item-centering-container__button" +
						getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						((props.reduxContainerName === PROJECT_CONTAINER &&
							reduxState[props.reduxContainerName].list.length > 0) ||
						(props.reduxContainerName === BUG_CONTAINER &&
							reduxState[props.reduxContainerName].list.length > 0)
							? ""
							: " new-item-centering-container__button--tutorial" +
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
					<span className="new-item-centering-container__button__text">
						{props.reduxContainerName === PROJECT_CONTAINER
							? "New Project"
							: "New Bug"}
					</span>
				</div>
			</div>
			<div className="search-centering-container js-list-search-centering-container">
				<div
					className={
						"search-centering-container__centered-container js-list-centered-search-container" +
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
						className="search-centering-container__centered-container__search-bar js-list-search-bar"
					/>
					<div
						className="search-centering-container__centered-container__search-button js-list-search-button"
						alt="Button for searchbar"
						onClick={updateSearchKeyWordString}
					>
						<span className="search-centering-container__centered-container__search-button__icon">
							<i
								className="fa fa-search"
								aria-hidden="true"
								alt="Icon of a magnifying glass"
							/>
						</span>
					</div>
				</div>
			</div>
			<div className="filter-components-container js-list-filter-components-container">
				<ListViewTopBarFilterButton
					reduxContainerName={props.reduxContainerName}
				/>
				{reduxState[GENERAL_CONTAINER].dropdownsDisplay
					.listViewTopBarFilterDropdownComponentShouldDisplay ? (
					<ListViewTopBarFilterDropdown
						reduxContainerName={props.reduxContainerName}
					/>
				) : null}
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
