import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	bugContainerName,
	projectContainerName,
} from "../../../../reducers/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichBugComponentsDisplay,
} from "../../../../actions";

import { getProjectOrBugTextColor } from "../../../../utils/elementColorUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerSidebarTableAndRows.scss";

export default function ItemContainerListSidebarRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const changeTargetItem = () => {
		if (
			reduxState[props.reduxContainerName].componentsDisplay.targetItem ===
				null ||
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.id !==
				props.item.id
		) {
			dispatch(
				setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
					listContainer: false,
					itemContainer: true,
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

	const openListContainerIfProject = () => {
		if (props.reduxContainerName === projectContainerName) {
			dispatch(
				setWhichProjectComponentsDisplay({
					targetItem: props.item,
				})
			);

			dispatch(
				setWhichBugComponentsDisplay({
					listContainer: true,
					// If the project targetItem is not changing, then keep the bug targetItem the same
					targetItem:
						props.item.id ===
						reduxState[projectContainerName].componentsDisplay.targetItem.id
							? reduxState[bugContainerName].componentsDisplay.targetItem
							: null,
				})
			);

			// Resets bug components display when a different project is opened
			// ...to prevent erros with bug targetItem not belonging to project
			if (
				props.reduxContainerName === projectContainerName &&
				reduxState[props.reduxContainerName].componentsDisplay.targetItem !==
					null &&
				reduxState[props.reduxContainerName].componentsDisplay.targetItem.id !==
					props.item.id
			) {
				dispatch(setWhichBugComponentsDisplay({}));
			}
		}
	};

	return (
		<tr
			className={
				"list-sidebar__table__row" +
				(reduxState[props.reduxContainerName]?.componentsDisplay.targetItem !==
					null &&
				reduxState[props.reduxContainerName]?.componentsDisplay.targetItem
					.id === props.item.id
					? " list-sidebar__table__row--selected"
					: " list-sidebar__table__row--hover-highlight")
			}
			onClick={changeTargetItem}
			onDoubleClick={openListContainerIfProject}
		>
			<td className="list-sidebar__table__data">
				<div
					className={
						"list-sidebar__table__data__overflow-container" +
						(props.item.status_id ===
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId
							? " list-sidebar__table__data__overflow-container--completed-color"
							: getProjectOrBugTextColor(props.reduxContainerName))
					}
				>
					<span className="list-sidebar__table__data__overflow-container__info">
						{props.item.status_id !==
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId ? null : (
							<i
								className="fa fa-check list-sidebar__table__data__overflow-container__info__completed-icon"
								aria-hidden="true"
							/>
						)}
						{props.item.name}
					</span>
				</div>
			</td>
		</tr>
	);
}
