import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

/* import { setNavbarDropdownComponents } from "../../../actions"; */

// Components
import Navbar from "../Navbar";

import { shortenProjectDescription, getProjectStatusName, getProjectPriorityName } from "../../../utils/projectsUtils";

import "../../../SCSS/projectBlocks.scss";

export default function ProjectsBlock(props) {
	/* 	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch(); */

	const [project, setProject] = useState({
		name: props.project.name,
		description: shortenProjectDescription(props.project.description),
		status: getProjectStatusName(props.project.status),
		priority: getProjectPriorityName(props.project.priority),
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
		console.log(props);
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
