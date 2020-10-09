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
	setProjectOrBugMassDeleteList,
} from "../../../../actions";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";

import "../../../../SCSS/home/projects-bugs-shared/list/listTableAndRows.scss";

export default function ListTableRow(props) {
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
				"list-table__row list-table__row--hover-highlight " +
				"js-list-table-row-" +
				props.item.id
			}
			onClick={openViewItemModal}
		>
			<td className="list-table__data">
				<input
					type="checkbox"
					name="item"
					value={props.item.id}
					onChange={(e) => onChangeMassDeleteCheckbox(e)}
					onClick={(e) => dontPropogateParentOnclick(e)}
					checked={reduxState[props.reduxContainerName].massDeleteList.includes(
						props.item.id
					)}
					className="list-table__data__checkbox"
				/>
			</td>
			<td className="list-table__data">
				<span
					className={
						"list-table__data__info" + (props.reduxContainerName ===
						projectContainerName
							? " list-table__data__info--blue"
							: " list-table__data__info--red")
					}
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
