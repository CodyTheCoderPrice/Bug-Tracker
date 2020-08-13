import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/* import { setNavbarDropdownComponents } from "../../../actions"; */

import { formatDateMMddYYY } from "../../../utils/dateUtils";

import "../../../SCSS/projects/projectsTableAndRows.scss";

export default function ProjectRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [project, setProject] = useState({
		projectId: props.project.project_id,
		name: props.project.name,
		description: props.project.description,
		priorityId: props.project.p_priority_id,
		priorityOption: props.project.p_priority_option,
		statusId: props.project.p_status_id,
		statusOption: props.project.p_status_option,
		startDate: formatDateMMddYYY(props.project.start_date),
		dueDate: formatDateMMddYYY(props.project.due_date),
		completionDate: formatDateMMddYYY(props.project.completion_date),
	});

	/* const openEditInfoModals = () => {
		dispatch(
			setAccountModalComponents({
				editInfoModal: <EditInfoModal />,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	}; */

	const printProject = () => {
		console.log(project);
	};

	return (
		<tr className="project-table__row">
			<td className="project-table__data">
				<span className="project-table__data__info">{project.name}</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">
					{project.priorityOption}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">
					{project.statusOption}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">
					{project.startDate}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info">{project.dueDate}</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info project-table__data__info--blue-link">More Info</span>
			</td>
			{/*Used to fill the remaining space of the screen (if needed)*/}
			<td className="project-table__header"></td>
		</tr>
	);
}
