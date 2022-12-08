import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
} from "../../../../actions/constants/containerNames";

import { setWhichGeneralDropdownsDisplay } from "../../../../actions";

import {
	getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getCommonTextColorClassNameForThemeWithLightOrDarkMode,
} from "../../../../utils";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function ListViewTopBarFilterButton(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const toggleFilterDropdown = (e) => {
		e.stopPropagation();

		dispatch(
			setWhichGeneralDropdownsDisplay({
				listViewTopBarFilterDropdownComponentShouldDisplay:
					!reduxState[GENERAL_CONTAINER].dropdownsDisplay
						.listViewTopBarFilterDropdownComponentShouldDisplay,
			})
		);
	};

	return (
		<div
			className={
				"list-view-top-bar-filter-button-component" +
				getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				) +
				(reduxState[GENERAL_CONTAINER].dropdownsDisplay
					.listViewTopBarFilterDropdownComponentShouldDisplay
					? " list-view-top-bar-filter-button-component--with-dropdown-displayed"
					: "")
			}
			alt={
				"Button to open filter dropdown for filtering the list of " +
				(props.reduxContainerName === PROJECT_CONTAINER ? "projects" : "bugs")
			}
			onClick={toggleFilterDropdown}
		>
			<span
				className={
					"list-view-top-bar-filter-button-component__text" +
					(reduxState[props.reduxContainerName].searchFilterSort.priorityFilter
						.length > 0 ||
					reduxState[props.reduxContainerName].searchFilterSort.statusFilter
						.length > 0
						? " list-view-top-bar-filter-button-component__text--active" +
						  getCommonTextColorClassNameForThemeWithLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
						  )
						: "")
				}
			>
				<FontAwesomeIcon icon={faFilter} arria-hidden="true" /> Filter
			</span>
		</div>
	);
}
