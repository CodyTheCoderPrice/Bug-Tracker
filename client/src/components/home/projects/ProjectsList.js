import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

/* import { setNavbarDropdownComponents } from "../../../actions"; */

// Components
import ProjectBlock from "./ProjectBlock";

import "../../../SCSS/projectsList.scss";

export default function ProjectsList() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	/* const openEditInfoModals = () => {
		dispatch(
			setAccountModalComponents({
				editInfoModal: <EditInfoModal />,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	}; */

	return (
		<div>
			<div className="projectsConstainerDiv">
				{reduxState.projects.map((project, i) => {
					return <ProjectBlock key={i} project={project} />;
				})}
			</div>
		</div>
	);
}
