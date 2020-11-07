import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { toggleClassName } from "../../../../utils/elementUtils";

// Components
import ListContainerSearchFilterSortBar from "./ListContainerSearchFilterSortBar";
import ListContainerCreateItemSidebar from "./ListContainerCreateItemSidebar";
import ListContainerTable from "./ListContainerTable";
import ListContainerMassDeleteItemsModal from "./ListContainerMassDeleteItemsModal";

export default function ListContainer(props) {
	const reduxState = useSelector((state) => state);

	// Disable scrolling for the body
	useEffect(() => {
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-x-y-scrolling");

		return () => {
			toggleClassName(false, body, "stop-x-y-scrolling");
		};
	}, []);

	return (
		<div className="list-container-component">
			<ListContainerSearchFilterSortBar
				reduxContainerName={props.reduxContainerName}
			/>
			{reduxState[props.reduxContainerName].componentsDisplay.listContainerCreateItemSidbar ? (
				<ListContainerCreateItemSidebar reduxContainerName={props.reduxContainerName} />
			) : null}
			<ListContainerTable reduxContainerName={props.reduxContainerName} />
			{reduxState[props.reduxContainerName].componentsDisplay.listContainerMassDeleteItemsModal ? (
				<ListContainerMassDeleteItemsModal reduxContainerName={props.reduxContainerName} />
			) : null}
		</div>
	);
}
