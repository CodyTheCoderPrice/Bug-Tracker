import React from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

import { setWhichProjectComponentsDisplay } from "../../../actions";

// Components
import ProjectBlock from "./ProjectBlock";

import "../../../SCSS/projects/projectsList.scss";

export default function ProjectsList() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const openCreateProjectSidebar = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				projectsList: true,
				createProjectSidbar: true,
			})
		);
	};

	return (
		<div>
			<div className="projectFilterBarDiv">
				<div className="newProjectClickableDiv" onClick={openCreateProjectSidebar}>
					New Project
				</div>
			</div>
			<div className="projectsConstainerDiv">
				{reduxState.projects.map((project, i) => {
					return <ProjectBlock key={i} project={project} />;
				})}
			</div>
		</div>
	);
}
