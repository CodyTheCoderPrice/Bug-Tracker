import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

/* import { setNavbarDropdownComponents } from "../../../actions"; */

import { shortenDescriptionForDisplay } from "../../../utils/componentUtils";

import "../../../SCSS/projects/projectBlocks.scss";

export default function ProjectsBlock(props) {
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
		startDate: moment(props.project.start_date).format('YYYY-MM-DD'),
		dueDate: moment(props.project.due_date).format('YYYY-MM-DD'),
		completionDate: moment(props.project.completion_date).format('YYYY-MM-DD'),
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
		<div className="projectsBlockDiv">
			<div className="projectNameDiv">
				<label className="projectNameLabel">{props.project.name}</label>
				<div className="projectOptionsClickableDiv" onClick={printProject}>
					<i className="fa fa-ellipsis-h" aria-hidden="true"></i>
				</div>
			</div>
			<div className="projectDescriptionDiv">
				<label className="projectDescriptionLabel">{project.description}</label>
			</div>
		</div>
	);
}
