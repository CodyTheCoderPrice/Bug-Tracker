import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectContainerName } from "../../../../reducers/containerNames";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectOrBugComponentsDisplay,
	setWhichBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "../../../../actions";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";
import { displayNoneIfEmpty } from "../../../../utils/elementUtils";
import { isEmpty } from "../../../../utils/basicUtils";

import "../../../../SCSS/home/projects-bugs-shared/list/listContainerTableAndRows.scss";

import sortArrowsTopFilled from "../../../../images/sort-arrows-top-filled.svg";

export default function ListContainerTableRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const onChangeMassDeleteCheckbox = (e) => {
		const value = Number(e.target.value);
		let deepCopyMassDeleteArray = [
			...reduxState[props.reduxContainerName].massDeleteList,
		];
		const index = deepCopyMassDeleteArray.indexOf(value);

		if (index === -1) {
			deepCopyMassDeleteArray.push(value);
		} else {
			deepCopyMassDeleteArray.splice(index, 1);
		}

		dispatch(
			setProjectOrBugMassDeleteList(
				props.reduxContainerName,
				deepCopyMassDeleteArray
			)
		);
	};

	// Keeps clicking checkbox from propogating parent elements onclick
	const dontPropogateParentOnclick = (e) => {
		e.stopPropagation();
	};

	const getStatusBoxColorClassName = () => {
		if (props.reduxContainerName === projectContainerName) {
			switch (props.item.status_id) {
				// Starts at 2 since 1 means status was left empty
				case 2:
					return " list-table__data__centering-container__status-box--red";
				case 3:
					return " list-table__data__centering-container__status-box--purple";
				case 4:
					return " list-table__data__centering-container__status-box--blue";
				case 5:
					return " list-table__data__centering-container__status-box--orange";
				case 6:
					return " list-table__data__centering-container__status-box--green";
				default:
					return "";
			}
		} else {
			switch (props.item.status_id) {
				case 1:
					return " list-table__data__centering-container__status-box--purple";
				case 2:
					return " list-table__data__centering-container__status-box--blue";
				case 3:
					return " list-table__data__centering-container__status-box--orange";
				case 4:
					return " list-table__data__centering-container__status-box--green";
				default:
					return "";
			}
		}
	};

	const openItemContainer = () => {
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
		if (
			props.reduxContainerName === projectContainerName &&
			reduxState[props.reduxContainerName].componentsDisplay.targetItem !==
				null &&
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.id !==
				props.item.id
		) {
			dispatch(setWhichBugComponentsDisplay({}));
		}
	};

	const getTableDataClassName = () => {
		return (
			"list-table__data list-table__data--name" +
			(props.item.status_id ===
			reduxState[props.reduxContainerName].priorityStatusOptions
				.statusCompletionId
				? " list-table__data--completed-color"
				: "")
		);
	};

	return (
		<tr
			className={
				"list-table__row" +
				(reduxState[props.reduxContainerName]?.componentsDisplay.targetItem !==
					null &&
					reduxState[props.reduxContainerName]?.componentsDisplay.targetItem
						.id === props.item.id
					? " list-table__row--selected"
					: " list-table__row--hover-highlight")
			}
			onClick={openItemContainer}
		>
			<td
				className="list-table__data"
				onClick={(e) => dontPropogateParentOnclick(e)}
			>
				<input
					type="checkbox"
					name="item"
					value={props.item.id}
					onChange={(e) => onChangeMassDeleteCheckbox(e)}
					checked={reduxState[props.reduxContainerName].massDeleteList.includes(
						props.item.id
					)}
					className="list-table__data__checkbox"
				/>
			</td>
			<td
				className={
					"list-table__data list-table__data--name" +
					(props.item.status_id ===
					reduxState[props.reduxContainerName].priorityStatusOptions
						.statusCompletionId
						? " list-table__data--completed-color"
						: props.reduxContainerName === projectContainerName
						? " list-table__data--project-color"
						: " list-table__data--bug-color")
				}
			>
				<span className="list-table__data__info">
					{props.item.status_id !==
					reduxState[props.reduxContainerName].priorityStatusOptions
						.statusCompletionId ? null : (
						<i
							className="fa fa-check list-table__data__info__completed-icon"
							aria-hidden="true"
						/>
					)}
					{props.item.name}
				</span>
			</td>
			<td className="list-table__data">
				<div className="list-table__data__centering-container">
					<div
						className={
							"list-table__data__centering-container__status-box" +
							getStatusBoxColorClassName()
						}
					>
						<span className="list-table__data__centering-container__status-box__centered-info">
							{isEmpty(props.item.status_option)
								? "None"
								: props.item.status_option}
						</span>
					</div>
				</div>
			</td>
			<td className={getTableDataClassName()}>
				<span className="list-table__data__info">
					{displayNoneIfEmpty(props.item.priority_option)}
				</span>
			</td>
			<td className={getTableDataClassName()}>
				<span className="list-table__data__info">
					{displayNoneIfEmpty(formatDateMMddYYYY(props.item.creation_date))}
				</span>
			</td>
			<td className={getTableDataClassName()}>
				<span className="list-table__data__info">
					{displayNoneIfEmpty(formatDateMMddYYYY(props.item.start_date))}
				</span>
			</td>
			<td className={getTableDataClassName()}>
				<span className="list-table__data__info">
					{displayNoneIfEmpty(formatDateMMddYYYY(props.item.due_date))}
				</span>
			</td>
			{/*Used to fill the remaining space of the screen (if needed)*/}
			<td className={getTableDataClassName()}></td>
		</tr>
	);
}
