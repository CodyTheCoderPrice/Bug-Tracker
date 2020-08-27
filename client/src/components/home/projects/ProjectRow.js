import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setWhichAccountComponentsDisplay, setWhichProjectComponentsDisplay } from "../../../actions";

import { formatDateMMddYYYY } from "../../../utils/dateUtils";

import "../../../SCSS/projects/projectsTableAndRows.scss";

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

	return (
		<tr className="project-table__row">
			<td className="project-table__data">
				<span className="project-table__data__info">{props.project.name}</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">
					{props.project.p_priority_option}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">
					{props.project.p_status_option}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">{formatDateMMddYYYY(props.project.start_date)}</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">{formatDateMMddYYYY(props.project.due_date)}</span>
			</td>
			<td onClick={openViewProjectDashboard} className="project-table__data">
				<span className="project-table__data__info project-table__data__info--blue-link">
					More Info
				</span>
			</td>
			{/*Used to fill the remaining space of the screen (if needed)*/}
			<td className="project-table__header"></td>
		</tr>
	);
}
