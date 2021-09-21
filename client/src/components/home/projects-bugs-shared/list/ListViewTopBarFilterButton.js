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
				"filter-button-component" +
				getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				) +
				(reduxState[GENERAL_CONTAINER].dropdownsDisplay
					.listViewTopBarFilterDropdownComponentShouldDisplay
					? " filter-button-component--with-dropdown"
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
					"filter-button-component__text" +
					(reduxState[props.reduxContainerName].searchFilterSort.priorityFilter
						.length > 0 ||
					reduxState[props.reduxContainerName].searchFilterSort.statusFilter
						.length > 0
						? " filter-button-component__text--active" +
						  getCommonTextColorClassNameForThemeWithLightOrDarkMode(
								reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
								reduxState[ACCOUNT_CONTAINER].settings.theme_color
						  )
						: "")
				}
			>
				<i className="fa fa-filter" aria-hidden="true" alt="Icon of a filter" />{" "}
				Filter
			</span>
		</div>
	);
}
