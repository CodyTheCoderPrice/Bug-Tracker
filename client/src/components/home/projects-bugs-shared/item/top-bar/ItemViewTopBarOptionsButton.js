import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
} from "../../../../../actions/constants/containerNames";

import { setWhichGeneralDropdownsDisplay } from "../../../../../actions";

import {
	getItemViewTopBarComponentIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode,
	getItemViewTopBarOptionsButtonComponentWithDropdownDisplayedBorderBackgroundTextColorClassNameForLightOrDarkMode,
} from "../../../../../utils";

export default function ItemViewTopBarOptionsButton(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const toggleOptionsDropdown = (e) => {
		e.stopPropagation();

		dispatch(
			setWhichGeneralDropdownsDisplay({
				itemViewTopBarOptionsDropdownComponentShouldDisplay:
					!reduxState[GENERAL_CONTAINER].dropdownsDisplay
						.itemViewTopBarOptionsDropdownComponentShouldDisplay,
			})
		);
	};

	return (
		<div
			className={
				"item-view-top-bar-options-button-component" +
				getItemViewTopBarComponentIconButtonElementTextColorWithHoverClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				) +
				(reduxState[GENERAL_CONTAINER].dropdownsDisplay
					.itemViewTopBarOptionsDropdownComponentShouldDisplay
					? getItemViewTopBarOptionsButtonComponentWithDropdownDisplayedBorderBackgroundTextColorClassNameForLightOrDarkMode(
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
			<i
				className="fa fa-ellipsis-h item-view-top-bar-options-button-component__centered-icon"
				aria-hidden="true"
				alt="Icon of an ellipsis (i.e. three dots)"
			/>
		</div>
	);
}
