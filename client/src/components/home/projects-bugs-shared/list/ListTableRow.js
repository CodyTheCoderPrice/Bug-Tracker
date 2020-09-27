import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
} from "../../../../reducers/containerNames";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectOrBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "../../../../actions";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";

import { toggleTableRowSelected } from "../../../../utils/listTableRowUtils";

import "../../../../SCSS/home/projects-bugs-shared/list/listTableAndRows.scss";

export default function ListTableRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (props.reduxContainerName === projectContainerName) {
			toggleTableRowSelected(
				reduxState[projectContainerName].componentsDisplay.targetItem,
				props.item,
				document.getElementsByClassName(
					"js-list-table-row-" + props.item.id
				)[0],
				"list-table__row--highlight",
				"list-table__row--selected"
			);
		}
	}, [reduxState[projectContainerName].componentsDisplay.targetItem]);

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

	return (
		<tr
			className={
				"list-table__row list-table__row--clickable " +
				"js-list-table-row-" +
				props.item.id
			}
			onClick={
				props.reduxContainerName === projectContainerName
					? (e) => toggleRowSelected(e)
					: null
			}
		>
			<td className="list-table__data">
				<input
					type="checkbox"
					name="item"
					value={props.item.id}
					onChange={onChangeMassDeleteCheckbox}
					checked={reduxState[props.reduxContainerName].massDeleteList.includes(
						props.item.id
					)}
					className="list-table__data__checkbox"
				/>
			</td>
			<td className="list-table__data">
				<span
					className="list-table__data__info list-table__data__info--blue-link"
					onClick={(e) => openViewItemModal(e)}
				>
					{props.item.name}
				</span>
			</td>
			<td className="list-table__data">
				<span className="list-table__data__info">
					{formatDateMMddYYYY(props.item.creation_date)}
				</span>
			</td>
			<td className="list-table__data">
				<span className="list-table__data__info">
					{formatDateMMddYYYY(props.item.start_date)}
				</span>
			</td>
			<td className="list-table__data">
				<span className="list-table__data__info">
					{formatDateMMddYYYY(props.item.due_date)}
				</span>
			</td>
			<td className="list-table__data">
				<span className="list-table__data__info">
					{props.item.priority_option}
				</span>
			</td>
			<td className="list-table__data">
				<span className="list-table__data__info">
					{props.item.status_option}
				</span>
			</td>
			{/*Used to fill the remaining space of the screen (if needed)*/}
			<td className="list-table__data"></td>
		</tr>
	);
}
