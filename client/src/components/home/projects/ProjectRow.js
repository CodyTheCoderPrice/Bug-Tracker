import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/* import { setNavbarDropdownComponents } from "../../../actions"; */

import { shortenDescriptionForDisplay } from "../../../utils/componentUtils";

import { formatDateYYYYmmDD } from "../../../utils/dateUtils";

import "../../../SCSS/projects/projectsTableAndRows.scss";

export default function ProjectRow(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [project, setProject] = useState({
		projectId: props.project.project_id,
		name: props.project.name,
		description: shortenDescriptionForDisplay(props.project.description),
		priorityId: props.project.p_priority_id,
		priorityOption: props.project.p_priority_option,
		statusId: props.project.p_status_id,
		statusOption: props.project.p_status_option,
		startDate: formatDateYYYYmmDD(props.project.start_date),
		dueDate: formatDateYYYYmmDD(props.project.due_date),
		completionDate: formatDateYYYYmmDD(props.project.completion_date),
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
				<span className="project-table__data__name">{project.name}</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__priority">
					{project.priorityOption}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__status">
					{project.statusOption}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__start-date">
					{project.startDate}
				</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__due-date">{project.dueDate}</span>
			</td>
			<td className="project-table__data">
				<span className="project-table__data__info-link">More Info</span>
			</td>
			{/*Used to fill the remaining space of the screen (if needed)*/}
			<td className="project-table__header"></td>
		</tr>
	);
}
