import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// Components
import ListContainerSearchFilterSortBar from "./ListContainerSearchFilterSortBar";
import ListContainerCreateItemSidebar from "./ListContainerCreateItemSidebar";
import ListContainerTable from "./ListContainerTable";
import ListContainerMassDeleteItemsModal from "./ListContainerMassDeleteItemsModal";

export default function ListContainer(props) {
	const reduxState = useSelector((state) => state);

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
