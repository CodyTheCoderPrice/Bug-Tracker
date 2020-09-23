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

	const openViewProjectDashboard = () => {
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				listTable: true,
				viewItemModal: true,
				targetItem: props.project,
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
		<tr className="project-table__row project-table__row--clickable">
			<td className="project-table__data">
				<input
					type="checkbox"
					name="projects"
					value={props.project.id}
					onChange={(e) => onChangeMassDelete(e)}
					checked={reduxState[props.reduxContainerName].massDeleteList.includes(
						props.project.id
					)}
					className="project-table__data__checkbox"
				/>
			</td>
			<td className="project-table__data">
				<span
					className="project-table__data__info project-table__data__info--blue-link"
					onClick={openViewProjectDashboard}
				>
					{props.project.name}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">
					{formatDateMMddYYYY(props.project.creation_date)}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">
					{formatDateMMddYYYY(props.project.start_date)}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">
					{formatDateMMddYYYY(props.project.due_date)}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">
					{props.project.priority_option}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">
					{props.project.status_option}
				</span>
			</td>
			{/*Used to fill the remaining space of the screen (if needed)*/}
			<td className="project-table__data"></td>
		</tr>
	);
}
