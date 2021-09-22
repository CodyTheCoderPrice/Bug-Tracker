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
	getCommonTopBarComponentBorderAndBackgroundColorClassNameForLightOrDarkMode,
	getCommonTopBarComponentSearchContainerElementBorderBackgroundTextColorClassNameForThemeWithLightOrDarkMode,
	getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getItemViewTopBarComponentIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode,
	getItemViewTopBarComponentOptionsIconButtonElementClickedBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getItemViewTopBarComponentOptionsDropdownRowButtonElementHoverBackgroundColorClassNameForLightOrDarkMode,
} from "../../../../utils";

// Components
import ItemViewTopBarFilterButton from "./ItemViewTopBarFilterButton";
import ItemViewTopBarFilterDropdown from "./ItemViewTopBarFilterDropdown";
import ItemViewTopBarSortButton from "./ItemViewTopBarSortButton";
import ItemViewTopBarSortDropdown from "./ItemViewTopBarSortDropdown";

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

	const toggleOptionsDropdown = (e) => {
		e.stopPropagation();

		dispatch(
			setWhichGeneralDropdownsDisplay({
				itemViewTopBarOptionsDropdown:
					!reduxState[GENERAL_CONTAINER].dropdownsDisplay
						.itemViewTopBarOptionsDropdown,
			})
		);
	};

	const switchBetweenDisplayAndEditInfo = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemViewEditItemInfoComponentShouldDisplay:
					!reduxState[props.reduxContainerName].componentsDisplay
						.itemViewEditItemInfoComponentShouldDisplay,
			})
		);
	};

	const openDeleteModalForItemView = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				deleteModalComponentForItemViewShouldDisplay: true,
			})
		);
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
			<div className="item-options-container">
				<div
					className={
						"item-options-container__icon-button" +
						getItemViewTopBarComponentIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode
						) +
						(reduxState[GENERAL_CONTAINER].dropdownsDisplay
							.itemViewTopBarOptionsDropdown
							? getItemViewTopBarComponentOptionsIconButtonElementClickedBorderBackgroundTextColorClassNameForLightOrDarkMode(
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
							"item-options-container__dropdown__row-button item-options-container__dropdown__row-button--first-option" +
							getItemViewTopBarComponentOptionsDropdownRowButtonElementHoverBackgroundColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						alt={
							"Dropdown option to " +
							(reduxState[props.reduxContainerName].componentsDisplay
								.itemViewEditItemInfoComponentShouldDisplay === false
								? "begin editing "
								: "canel editing ") +
							(props.reduxContainerName === PROJECT_CONTAINER
								? "the project"
								: "the bug")
						}
						onClick={switchBetweenDisplayAndEditInfo}
					>
						{reduxState[props.reduxContainerName].componentsDisplay
							.itemViewEditItemInfoComponentShouldDisplay
							? "Cancel"
							: props.reduxContainerName === PROJECT_CONTAINER
							? "Edit Project"
							: "Edit Bug"}
					</span>
					<span
						className={
							"item-options-container__dropdown__row-button item-options-container__dropdown__row-button--last-option" +
							getItemViewTopBarComponentOptionsDropdownRowButtonElementHoverBackgroundColorClassNameForLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode
							)
						}
						alt={
							"Dropdown option to begin deleting the" +
							(props.reduxContainerName === PROJECT_CONTAINER
								? "project"
								: "bug")
						}
						onClick={openDeleteModalForItemView}
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
