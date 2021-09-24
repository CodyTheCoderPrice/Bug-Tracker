import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	SIZE_CONTAINER,
} from "../../../../../actions/constants/containerNames";

import {
	setProjectOrBugSearchFilterSort,
	setWhichProjectOrBugComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "../../../../../actions";

import {
	getCommonTopBarComponentBorderAndBackgroundColorClassNameForLightOrDarkMode,
	getCommonTopBarComponentSearchContainerElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getItemViewTopBarComponentIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode,
} from "../../../../../utils";

// Components
import ItemViewTopBarFilterButton from "./ItemViewTopBarFilterButton";
import ItemViewTopBarFilterDropdown from "./ItemViewTopBarFilterDropdown";
import ItemViewTopBarSortButton from "./ItemViewTopBarSortButton";
import ItemViewTopBarSortDropdown from "./ItemViewTopBarSortDropdown";
import ItemViewTopBarOptionsButton from "./ItemViewTopBarOptionsButton";
import ItemViewTopBarOptionsDropdown from "./ItemViewTopBarOptionsDropdown";

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

	const closeItemView = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listViewComponentShouldDisplay: true,
				itemViewComponentShouldDisplay: false,
				itemViewCurrentItem: null,
			})
		);

		// Resets bug components display if project itemViewComponentShouldDisplay is closed
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
			{reduxState[GENERAL_CONTAINER].componentsDisplay
				.itemViewListSidebarComponentContainerElementExpanded !== true ||
			// Also if the window width is too small (value chosen by eyening
			// ...it) as the searchbar won't fit on screen
			(reduxState[SIZE_CONTAINER].variables.window !== null &&
				reduxState[SIZE_CONTAINER].variables.window.width < 400) ? null : (
				<div
					className={
						"search-container" +
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
			)}
			{reduxState[GENERAL_CONTAINER].componentsDisplay
				.itemViewListSidebarComponentContainerElementExpanded !== true ||
			// Also if the window width is too small (value chosen by eyeing
			// it) since the filter and sort buttons won't fit on screen
			(reduxState[SIZE_CONTAINER].variables.window !== null &&
				reduxState[SIZE_CONTAINER].variables.window.width < 602) ? null : (
				<div>
					<div className="filter-components-container">
						<ItemViewTopBarFilterButton
							reduxContainerName={props.reduxContainerName}
						/>
						{reduxState[GENERAL_CONTAINER].dropdownsDisplay
							.itemViewTopBarFilterDropdownComponentShouldDisplay ? (
							<ItemViewTopBarFilterDropdown
								reduxContainerName={props.reduxContainerName}
							/>
						) : null}
					</div>
					<div className="sort-components-container">
						<ItemViewTopBarSortButton
							reduxContainerName={props.reduxContainerName}
						/>
						{reduxState[GENERAL_CONTAINER].dropdownsDisplay
							.itemViewTopBarSortDropdownComponentShouldDisplay ? (
							<ItemViewTopBarSortDropdown
								reduxContainerName={props.reduxContainerName}
							/>
						) : null}
					</div>
				</div>
			)}
			<div className="options-components-container">
				<ItemViewTopBarOptionsButton
					reduxContainerName={props.reduxContainerName}
				/>
				{reduxState[GENERAL_CONTAINER].dropdownsDisplay
					.itemViewTopBarOptionsDropdownComponentShouldDisplay ? (
					<ItemViewTopBarOptionsDropdown
						reduxContainerName={props.reduxContainerName}
					/>
				) : null}
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
