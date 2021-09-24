import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
} from "../../../../../actions/constants/containerNames";

import { setWhichGeneralDropdownsDisplay } from "../../../../../actions";

import { getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode } from "../../../../../utils";

export default function ItemViewTopBarSortButton(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const toggleSortDropdown = (e) => {
		e.stopPropagation();

		dispatch(
			setWhichGeneralDropdownsDisplay({
				itemViewTopBarSortDropdownComponentShouldDisplay:
					!reduxState[GENERAL_CONTAINER].dropdownsDisplay
						.itemViewTopBarSortDropdownComponentShouldDisplay,
			})
		);
	};

	return (
		<div
			className={
				"item-view-top-bar-sort-button-component" +
				getCommonTopBarComponentButtonAndDropdownElementBorderBackgroundTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				) +
				(reduxState[GENERAL_CONTAINER].dropdownsDisplay
					.itemViewTopBarSortDropdownComponentShouldDisplay
					? " item-view-top-bar-sort-button-component--with-dropdown-displayed"
					: "")
			}
			alt={
				"Button to open sort dropdown for sorting the list of " +
				(props.reduxContainerName === PROJECT_CONTAINER ? "projects" : "bugs")
			}
			onClick={toggleSortDropdown}
		>
			<span className={"item-view-top-bar-sort-button-component__text"}>
				<i
					className="fa fa-sort"
					aria-hidden="true"
					alt="Icon representing sorting"
				/>{" "}
				Sort
			</span>
		</div>
	);
}
