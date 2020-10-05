import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
} from "../../../../reducers/containerNames";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectOrBugComponentsDisplay,
	setWhichBugComponentsDisplay,
} from "../../../../actions";

import { toggleClassName } from "../../../../utils/elementUtils";

import "../../../../SCSS/home/projects-bugs-shared/list/miniListTableAndRows.scss";

export default function MiniListTableRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (
			reduxState[props.reduxContainerName].componentsDisplay.targetItem !== null
		) {
			toggleClassName(
				reduxState[props.reduxContainerName].componentsDisplay.targetItem.id ===
					props.item.id,
				document.getElementsByClassName(
					"js-mini-list-table-row-" + props.item.id
				)[0],
				"mini-list-table__row--selected"
			);
		}
	}, [
		reduxState[projectContainerName].componentsDisplay.targetItem,
		reduxState[bugContainerName].componentsDisplay.targetItem,
	]);

	const openViewItemModal = () => {
		if (
			reduxState[props.reduxContainerName].componentsDisplay.targetItem ===
				null ||
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.id !==
				props.item.id
		) {
			dispatch(setWhichAccountComponentsDisplay({}));
			dispatch(
				setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
					listTable: false,
					viewItemModal: true,
					targetItem: props.item,
				})
			);

			// Resets bug components display when a different project is opened
			// ...to prevent erros with bug targetItem not belonging to project
			if (props.reduxContainerName === projectContainerName) {
				dispatch(setWhichBugComponentsDisplay({}));
			}
		}
	};

	return (
		<tr
			className={
				"mini-list-table__row mini-list-table__row--clickable " +
				"js-mini-list-table-row-" +
				props.item.id
			}
			onClick={openViewItemModal}
		>
			<td className="mini-list-table__data">
				<span className="mini-list-table__data__info mini-list-table__data__info--blue-link">
					{props.item.name}
				</span>
			</td>
		</tr>
	);
}
