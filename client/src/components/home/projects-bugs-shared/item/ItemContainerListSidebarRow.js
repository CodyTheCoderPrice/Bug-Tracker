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

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerSidebarTableAndRows.scss";

export default function ItemContainerListSidebarRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	/* useEffect(() => {
		if (
			reduxState[props.reduxContainerName].componentsDisplay.targetItem !== null
		) {
			toggleClassName(
				reduxState[props.reduxContainerName].componentsDisplay.targetItem.id ===
					props.item.id,
				document.getElementsByClassName(
					"js-list-sidebar__table-row-" + props.item.id
				)[0],
				"list-sidebar__table__row--selected"
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[projectContainerName].componentsDisplay.targetItem,
		// eslint-disable-next-line
		reduxState[bugContainerName].componentsDisplay.targetItem,
	]); */

	const openItemContainer = () => {
		if (
			reduxState[props.reduxContainerName].componentsDisplay.targetItem ===
				null ||
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.id !==
				props.item.id
		) {
			dispatch(setWhichAccountComponentsDisplay({}));
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
			onClick={openItemContainer}
		>
			<td className="list-sidebar__table__data">
				<div
					className={
						"list-sidebar__table__data__overflow-container" +
						(props.item.status_id ===
						reduxState[props.reduxContainerName].priorityStatusOptions
							.statusCompletionId
							? " list-sidebar__table__data__overflow-container--completed-color"
							: props.reduxContainerName === projectContainerName
							? " list-sidebar__table__data__overflow-container--project-color"
							: " list-sidebar__table__data__overflow-container--bug-color")
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
