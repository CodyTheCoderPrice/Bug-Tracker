import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../../actions/constants/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	setWhichGeneralComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "../../../../../actions";

import {
	getCommonTopBarComponentBorderAndBackgroundColorClassNameForLightOrDarkMode,
	getItemViewTopBarComponentIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode,
} from "../../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// Components
import ItemViewTopBarOptionsButton from "./ItemViewTopBarOptionsButton";
import ItemViewTopBarOptionsDropdown from "./ItemViewTopBarOptionsDropdown";

export default function ItemViewTopBar(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const closeItemView = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listViewComponentShouldDisplay: true,
				itemViewComponentShouldDisplay: false,
				itemViewEditItemInfoComponentShouldDisplay: false,
				itemViewCurrentItem: null,
			})
		);

		// Resets bug components display if project itemViewComponentShouldDisplay is closed
		if (props.reduxContainerName === PROJECT_CONTAINER) {
			dispatch(
				setWhichGeneralComponentsDisplay({
					...reduxState[GENERAL_CONTAINER].componentsDisplay,
					navPanelButtonListComponentShouldIncludeCompletedProjects: false,
					navPanelButtonListComponentShouldIncludeClosedBugs: false,
				})
			);
			dispatch(setWhichBugComponentsDisplay({}));
			dispatch(setProjectOrBugMassDeleteList(BUG_CONTAINER));
		} else {
			dispatch(
				setWhichGeneralComponentsDisplay({
					...reduxState[GENERAL_CONTAINER].componentsDisplay,
					navPanelButtonListComponentShouldIncludeClosedBugs: false,
				})
			);
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
				<FontAwesomeIcon icon={faXmark} aria-hidden="true" />
			</div>
		</div>
	);
}
