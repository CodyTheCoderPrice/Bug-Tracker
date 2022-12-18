import React from "react";
import { useSelector } from "react-redux";
import {
	PROJECT_CONTAINER,
	BUG_CONTAINER,
} from "../../../../actions/constants/containerNames";

import { getProjectsText, getBugsText } from "../../../../utils";

export default function NavbarSoloTitle(props) {
	const reduxState = useSelector((state) => state);

	return (
		<div
			className={
				"navbar-solo-title-component js-navbar-solo-title" +
				(props.visible ? " " : " solo-title--invisible")
			}
		>
			{reduxState[PROJECT_CONTAINER].componentsDisplay
				.itemViewComponentShouldDisplay
				? reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
						.name
				: reduxState[BUG_CONTAINER].componentsDisplay
						.listViewComponentShouldDisplay
				? getBugsText()
				: reduxState[BUG_CONTAINER].componentsDisplay
						.itemViewComponentShouldDisplay
				? reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.name
				: getProjectsText()}
		</div>
	);
}
