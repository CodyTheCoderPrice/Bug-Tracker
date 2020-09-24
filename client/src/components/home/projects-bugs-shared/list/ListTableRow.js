import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectOrBugComponentsDisplay,
	setProjectOrBugMassDeleteList,
} from "../../../../actions";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";

import "../../../../SCSS/home/projects-bugs-shared/list/listTableAndRows.scss";

export default function ListTableRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const openViewItemModal = () => {
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				listTable: true,
				viewItemModal: true,
				targetItem: props.item,
			})
		);
	};

	const onChangeMassDelete = (e) => {
		const value = Number(e.target.value);
		let deepCopyMassDeleteArray = [...reduxState[props.reduxContainerName].massDeleteList];
		const index = deepCopyMassDeleteArray.indexOf(value);

		if (index === -1) {
			deepCopyMassDeleteArray.push(value);
		} else {
			deepCopyMassDeleteArray.splice(index, 1);
		}

		dispatch(setProjectOrBugMassDeleteList(props.reduxContainerName, deepCopyMassDeleteArray));
	};

	return (
		<tr className="list-table__row list-table__row--clickable">
			<td className="list-table__data">
				<input
					type="checkbox"
					name="item"
					value={props.item.id}
					onChange={(e) => onChangeMassDelete(e)}
					checked={reduxState[props.reduxContainerName].massDeleteList.includes(
						props.item.id
					)}
					className="list-table__data__checkbox"
				/>
			</td>
			<td className="list-table__data">
				<span
					className="list-table__data__info list-table__data__info--blue-link"
					onClick={openViewItemModal}
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
