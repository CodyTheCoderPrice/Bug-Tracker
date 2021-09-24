import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
} from "../../../../../actions/constants/containerNames";

import { setWhichProjectOrBugComponentsDisplay } from "../../../../../actions";

import {
	getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getItemViewTopBarOptionsDropdownComponentRowButtonElementHoverBackgroundColorClassNameForLightOrDarkMode,
} from "../../../../../utils";

export default function ItemViewTopBar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

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

	return (
		<div
			className={
				"item-view-top-bar-options-dropdown-component" +
				getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				)
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
					"item-view-top-bar-options-dropdown-component__row-button item-view-top-bar-options-dropdown-component__row-button--first-option" +
					getItemViewTopBarOptionsDropdownComponentRowButtonElementHoverBackgroundColorClassNameForLightOrDarkMode(
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
					"item-view-top-bar-options-dropdown-component__row-button item-view-top-bar-options-dropdown-component__row-button--last-option" +
					getItemViewTopBarOptionsDropdownComponentRowButtonElementHoverBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
				alt={
					"Dropdown option to begin deleting the" +
					(props.reduxContainerName === PROJECT_CONTAINER ? "project" : "bug")
				}
				onClick={openDeleteModalForItemView}
			>
				{props.reduxContainerName === PROJECT_CONTAINER
					? "Delete Project"
					: "Delete Bug"}
			</span>
		</div>
	);
}
