import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { ACCOUNT_CONTAINER } from "../../../../actions/constants/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	deleteMultipleProjectsOrBugs,
} from "../../../../actions";

// Components
import ListViewTopBar from "./ListViewTopBar";
import ListViewCreateItemSidebar from "./ListViewCreateItemSidebar";
import ListViewTable from "./ListViewTable";
import DeleteModal from "../DeleteModal";

export default function ListView(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const deleteCheckedItems = () => {
		dispatch(
			deleteMultipleProjectsOrBugs(
				props.reduxContainerName,
				reduxState[props.reduxContainerName].massDeleteList,
				reduxState[props.reduxContainerName].componentsDisplay
			)
		);
	};

	const closeListViewDeleteModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				listViewDeleteModal: false,
			})
		);
	};

	return (
		<div className="list-view-component">
			<ListViewTopBar reduxContainerName={props.reduxContainerName} />
			{reduxState[props.reduxContainerName].componentsDisplay
				.listViewCreateItemSidbar ? (
				<ListViewCreateItemSidebar
					reduxContainerName={props.reduxContainerName}
				/>
			) : null}
			<ListViewTable reduxContainerName={props.reduxContainerName} />
			{reduxState[props.reduxContainerName].componentsDisplay
				.listViewDeleteModal ? (
				<DeleteModal
					clickToCloseBlurredBackground={false}
					deleteFunction={deleteCheckedItems}
					closeModalFunction={closeListViewDeleteModal}
				/>
			) : null}
		</div>
	);
}
