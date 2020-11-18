import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	generalContainerName,
	projectContainerName,
} from "../../../../reducers/containerNames";

import {
	setWhichGeneralComponentsDisplay,
	setProjectOrBugSearchFilterSort,
	setWhichProjectOrBugComponentsDisplay,
	setWhichBugComponentsDisplay,
} from "../../../../actions";

import { useSearchBarBorderEventListener } from "../../../../utils/searchBarHookUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerTopBar.scss";

export default function ItemContainerTopBar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [searchBarText, setSearchBarText] = useState(
		reduxState[props.reduxContainerName].searchFilterSort.searchKeyWordString
	);

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
		}
	};

	return (
		<div className="top-bar-component js-top-bar">
			<div
				className={
					"outer-search-container js-item-outer-search-container" +
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
					className="outer-search-container__search-bar js-item-search-bar"
				/>
				<div
					className="outer-search-container__search-bar-button"
					onClick={updateSearchKeyWordString}
				>
					<span className="outer-search-container__search-bar-button__icon">
						<i className="fa fa-search" aria-hidden="true" />
					</span>
				</div>
			</div>
			<div className="item-options-container js">
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
