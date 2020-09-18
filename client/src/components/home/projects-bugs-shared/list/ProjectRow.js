import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setMassDeleteList,
} from "../../../../actions";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";

import "../../../../SCSS/projects/projectsTableAndRows.scss";

export default function ProjectRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const openViewProjectDashboard = () => {
		dispatch(setWhichAccountComponentsDisplay({}));
		dispatch(
			setWhichProjectComponentsDisplay({
				projectsTable: true,
				viewProjectModal: true,
				targetProject: props.project,
			})
		);
	};

	const onChangeMassDelete = (e) => {
		const value = Number(e.target.value);
		let deepCopyMassDeleteArray = [...reduxState.projectContainer.massDeleteList];
		const index = deepCopyMassDeleteArray.indexOf(value);

		if (index === -1) {
			deepCopyMassDeleteArray.push(value);
		} else {
			deepCopyMassDeleteArray.splice(index, 1);
		}

		dispatch(setMassDeleteList("project", deepCopyMassDeleteArray));
	};

	return (
		<tr className="project-table__row project-table__row--clickable">
			<td className="project-table__data">
				<input
					type="checkbox"
					name="projects"
					value={props.project.project_id}
					onChange={(e) => onChangeMassDelete(e)}
					checked={reduxState.projectContainer.massDeleteList.includes(
						props.project.project_id
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
