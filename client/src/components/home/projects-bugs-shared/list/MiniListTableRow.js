import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
} from "../../../../reducers/containerNames";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectOrBugComponentsDisplay,
} from "../../../../actions";

import { toggleTableRowSelected } from "../../../../utils/listTableRowUtils";

import "../../../../SCSS/home/projects-bugs-shared/list/miniListTableAndRows.scss";

export default function MiniListTableRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (props.reduxContainerName === projectContainerName) {
			toggleTableRowSelected(
				reduxState[projectContainerName].componentsDisplay.targetItem,
				props.item,
				document.getElementsByClassName(
					"js-mini-list-table-row-" + props.item.id
				)[0],
				"mini-list-table__row--highlight",
				"mini-list-table__row--selected"
			);
		}
	}, [reduxState[projectContainerName].componentsDisplay.targetItem]);

	// This funcitonality is only for the projects list
	const toggleRowSelected = () => {
		if (props.reduxContainerName === projectContainerName) {
			if (
				reduxState[projectContainerName].componentsDisplay.targetItem ===
					null ||
				reduxState[projectContainerName].componentsDisplay.targetItem.id !==
					props.item.id
			) {
				dispatch(
					setWhichProjectOrBugComponentsDisplay(projectContainerName, {
						listTable: true,
						targetItem: props.item,
					})
				);
			} else {
				dispatch(
					setWhichProjectOrBugComponentsDisplay(projectContainerName, {
						listTable: true,
						targetItem: null,
					})
				);
			}
		}
	};

	const openViewItemModal = (e) => {
		e.stopPropagation();
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				listTable: true,
				viewItemModal: true,
				targetItem: props.item,
			})
		);
	};

	return (
		<tr
			className={
				"mini-list-table__row mini-list-table__row--clickable " +
				"js-mini-list-table-row-" +
				props.item.id
			}
			onClick={
				props.reduxContainerName === projectContainerName
					? (e) => toggleRowSelected(e)
					: null
			}
		>
			<td className="mini-list-table__data">
				<span
					className="mini-list-table__data__info mini-list-table__data__info--blue-link"
					onClick={(e) => openViewItemModal(e)}
				>
					{props.item.name}
				</span>
			</td>
		</tr>
	);
}
