import React from "react";
import { useSelector } from "react-redux";

import { ACCOUNT_CONTAINER } from "../../../../actions/constants/containerNames";
import { getListViewTextColorClassNameForLightOrDarkMode } from "../../../../utils";

// Components
import ListViewTopBar from "./ListViewTopBar";
import ListViewCreateItemSidebar from "./ListViewCreateItemSidebar";
import ListViewTable from "./ListViewTable";
import ListViewMassDeleteItemsModal from "./ListViewMassDeleteItemsModal";

export default function ListView(props) {
	const reduxState = useSelector((state) => state);

	return (
		<div
			className={
				"list-view-component" +
				getListViewTextColorClassNameForLightOrDarkMode(
					reduxState[ACCOUNT_CONTAINER].settings.dark_mode
				)
			}
		>
			<ListViewTopBar reduxContainerName={props.reduxContainerName} />
			{reduxState[props.reduxContainerName].componentsDisplay
				.listViewCreateItemSidbar ? (
				<ListViewCreateItemSidebar
					reduxContainerName={props.reduxContainerName}
				/>
			) : null}
			<ListViewTable reduxContainerName={props.reduxContainerName} />
			{reduxState[props.reduxContainerName].componentsDisplay
				.listViewMassDeleteItemsModal ? (
				<ListViewMassDeleteItemsModal
					reduxContainerName={props.reduxContainerName}
				/>
			) : null}
		</div>
	);
}
